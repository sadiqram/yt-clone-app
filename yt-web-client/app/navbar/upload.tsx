/*
.uploadInput {
  display: none; /* Hide the default input 
}

.uploadButton {
  display: flex; /* Use Flexbox to center the text 
  justify-content: center; /* Center text horizontally 
  align-items: center; /* Center text vertically 
  width: 25px;
  height: 25px;
  border-radius: 50%; /* Make it circular 
  color: black; /* Color of the text 
  border: none;
  cursor: pointer;
  font-size: 10px;
  padding: 0.4em;
}

.uploadButton:hover {
  background-color: rgb(230, 230, 230);
}

convert to tailwind css
*/
'use client';

import { uploadVideo } from "../firebase/functions";
import { Fragment } from "react";




export default function Upload(){
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.item(0);
        if (file) {
          await handleupload(file);
        }
    }
    const handleupload = async (file: File) => {
        try {
          await uploadVideo(file);
          alert("Video uploaded successfully!");
        } catch (error) {
            alert(`Failed to upload video: ${error}`);
         
        }
      };

    return(
        <Fragment>
        <input id="upload" className="hidden" type="file" accept="video/*"
          onChange={handleFileChange}/>
        <label htmlFor="upload" className="flex justify-center items-center w-[25px] h-[25px] text-[black] cursor-pointer text-[10px] p-[0.4em] rounded-[50%] border-[none] hover:bg-[rgb(230,230,230)]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </label>
      </Fragment>
    )
}