

import {  httpsCallable } from "firebase/functions";
import { functions } from "./firebase";



const generateUploadUrl = httpsCallable(functions, "generateUploadUrl");
const getVideosFunction = httpsCallable(functions, "getVideos");

// look into improving this functionality
// It would be annoying to keep this interface in sync across multiple services
//what if the services were written in other languages
// Some viable solutions include gRPC and rest APIs
export interface Video {
  id?: string,
  uid?: string,
  filename?: string,
  status?: 'processing' | 'processed',
  title?: string,
  description?: string  
}

export async function uploadVideo(file: File) {
 const response: any =await generateUploadUrl({
    fileExtension: file.name.split(".").pop()
  });

  //Upload the file to the signed URL(use fetch)
  await fetch(response?.data?.url,
    {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    }
  );
   
return;
}


export async function getVideos(){
  const response: any = await getVideosFunction()

  return response.data as Video[];
}
