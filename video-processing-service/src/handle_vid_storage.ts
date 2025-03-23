// this file wil handle all google cloud storage operations as well as local file operations

import { Storage } from "@google-cloud/storage";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";


const storage =  new Storage(); //creates a new instance of the GCS storage class 

const rawVidBucket = ""; //creates a new bucket instance for raw videos
const processedVidBucket = ""; //creates a new bucket instance for processed videos

const localRawVidDir = "./raw-vids"; //creates a local directory for raw videos
const localProcessedVidDir = "./processed-vids"; //creates a local directory for processed videos

//creates local directories for raw and procesed videos
export function setupDirectories(){
    if(!fs.existsSync('input')){
        fs.mkdirSync('input');
    }
    if(!fs.existsSync('output')){
        fs.mkdirSync('output');
    }
}

/*

* @param rawVidName: string - the name of the file to convert from {@link localRawVidDir}
* @param processedVidName: string - the name of the file to convert from {@link localprocessedVidDir}
* @returns Promise<string> returns a promise that resolves when the video has been converted succesffully

*/
export function convertVideo(rawVidName:string,processedVidName:string){
    return new Promise((resolve,reject) => {
        ffmpeg(`${localRawVidDir}/${rawVidName}`)
        .outputOptions("-vf","scale=-1:360") //code for 360p video
        .on("end",() => {
            console.log("Video processing finished successfully!")
            resolve("Video processing finished successfully!")
        })
        .on("error", (err) => {
            reject(`Internal Server Error: ${err.message}`)
        })
        .save(`${localProcessedVidDir}/${processedVidName}`);
    })
}

/*
@param filename: string - the name of the file to download
{@link rawVidBucketName} bucket into the {@link localRawVidDir} directory/folder
@return Promise<string> - returns a promise that resolves when the file has been downloaded successfully

*/

//Use async function to ensure video is downloaded before processing
export async function downloadRawVid(filename: string){
   await  storage.bucket(rawVidBucket).file(filename).download({destination: `${localRawVidDir}/${filename}`})

   console.log(`gs://${rawVidBucket}/${filename} downloaded to ${localRawVidDir}/${filename}`)


}


/*

@param filename: string - the name of the file to upload
{@link localProcessedVidDir} directory/folder into the {@link processedVidBucketName} bucket
@return Promise<string> - returns a promise that resolves when the file has been uploaded successfully

*/

export async function uploadProcessedVid(filename: string){
    const bucket = storage.bucket(processedVidBucket);

    await bucket.upload(`${localProcessedVidDir}/${filename}`,{
        destination: filename
    })
    console.log(`${localProcessedVidDir}/${filename} uploaded to gs://${processedVidBucket}/${filename}`)
    await bucket.file(filename).makePublic();
}


function deleteFile(filePath: string){
    return new Promise((resolve,reject) => {
        if (fs.existsSync(filePath)){
            fs.unlink(filePath,(err) => {
                if(err){
                    console.log(`Failed to delete file at ${filePath}`)
                    reject(`Error deleting file: ${err.message}`)
                }
                else {
                    console.log(`Deleted file at ${filePath}`)
                    resolve(`Deleted file at ${filePath}`)
                }
            }
            )
        }
        else {
            console.log(`File not found at ${filePath}, skipping delete`)
            resolve(`File not found at ${filePath}, skipping delete`)
        }

    })
}


export function deleteRawVid(filename: string){
    return deleteFile(`${localRawVidDir}/${filename}`)
}

export function deleteProcessedVid(filename: string){
    return deleteFile(`${localProcessedVidDir}/${filename}`)
}
 
export function cleanup(inputfilename: string, outputfilename: string){
    return Promise.all([
        deleteRawVid(inputfilename),
        deleteProcessedVid(outputfilename)
    ])
}

// function ensureDirExists(dirPath: string){
//     if(!fs.existsSync(dirPath)){
//         fs.mkdirSync(dirPath);
//         console.log(`Created directory at ${dirPath}`)
//     }
// }