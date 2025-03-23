import express from 'express';
import ffmpeg from "fluent-ffmpeg"
const app = express();

app.use(express.json());


app.post("/process-video", (req,res) => {
  // Get path of the input video from req body
  const inputFilePath = req.body.inputFilePath
  const outputFilePath = req.body.outputFilePath

  //check if either of the input or output files for the video is defined
  if(!inputFilePath || !outputFilePath){
    const missingPath = []
    if(!inputFilePath)missingPath.push('inputFilePath');
    if(!outputFilePath)missingPath.push("outputFilePath")
    
        res.status(400).json({
            error: 'Bad Request: Missing required field(s)',
            missing: missingPath
          });
  }

  ffmpeg(inputFilePath)
    .outputOptions("-vf","scale=-1:360") //code for 360p video
    .on("end",() => {

        res.status(200).send("Video processing finished successfully!")
    })
    .on("error", (err) => {
        console.log(`An error occured ${err.message}`)
        res.status(500).send(`Internal Server Error: ${err.message}`)
    })
    .save(outputFilePath);


   

});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Video processing service listening at http://localhost:${port}`);
});