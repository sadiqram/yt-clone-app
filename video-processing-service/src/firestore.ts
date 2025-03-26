import { credential } from "firebase-admin";
import {initializeApp} from "firebase-admin/app";
import {Firestore} from "firebase-admin/firestore";


initializeApp({credential: credential.applicationDefault()});

//no need to specify firestore instance because only one is allowed per gcp project
const firestore = new Firestore();


const vidCollectionId = "videos";

export interface Video {
    id?: string,
    uid?: string,
    filename?: string,
    status?: 'processing' | 'processed',
    title?: string,
    description?: string
  }


 async function getVideo(videoId: string) {
    const videoRef = firestore.collection(vidCollectionId).doc(videoId);
    const snapshot = await videoRef.get();
  
    return (snapshot.data() as Video) ?? {};

  }

  export function setVideo(videoId:string, video: Video) {
    return firestore.collection(vidCollectionId).doc(videoId).set(video, {merge: true});
  }


  export  async function isVideoNew(videoId: string) {
    const video = await getVideo(videoId);
    return video?.status === undefined;
  }