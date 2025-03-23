import express from 'express';

import * as VideoStorageHandler from './handle_vid_storage';    

//Create local directories for raw and processed videos
VideoStorageHandler.setupDirectories();
const app = express();

app.use(express.json());


app.post("/process-video", async (req,res):Promise<any> => {
    // Error fix :Using  :Promise<any> fixed the No Match overload error
    //Get the bucket name and filename from Cloud Pub/Sub message
    let data;
    try{
        //get message from cloud pub/sub and parse it
        const message = Buffer.from(req.body.message.data, 'base64').toString('utf-8');
        data = JSON.parse(message);
        if(!data.name){
            throw new Error("Invalid message payload received")
        }
    }catch(err){
        console.error(`Error parsing message: ${err}`);
        return res.status(400).send(`Bad Request: missing file name`);
    }

    //get the filename from the message
    const inputfilename = data.name;
    const outputfilename = `processed-${inputfilename}`;
    
    //Download video from GCS
    await VideoStorageHandler.downloadRawVid(inputfilename)

    //Convert video to 360p
    try{

        await VideoStorageHandler.convertVideo(inputfilename,outputfilename);
    } catch (err){
        VideoStorageHandler.cleanup(inputfilename,outputfilename);
        console.error(`Error processing video: ${err}`);
        return res.status(500).send(`Internal Server Error: Video processing failed`);
    }

    //Upload processed video to GSC
    await VideoStorageHandler.uploadProcessedVid(outputfilename);
    VideoStorageHandler.cleanup(inputfilename,outputfilename);
    console.log(`Video processing complete!`);
    return res.status(200).send(`Video processing complete!`);

});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Video processing service listening at http://localhost:${port}`);
});