

import { getFunctions, httpsCallable } from "firebase/functions";
import { get } from "http";

const functions = getFunctions();

const generateUploadUrl = httpsCallable(functions, "generateUploadUrl");

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