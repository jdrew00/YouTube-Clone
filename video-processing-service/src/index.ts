import express from 'express';
import Ffmpeg from 'fluent-ffmpeg'; // Importing fluent-ffmpeg for video processing

const app = express();
app.use(express.json());

app.post('/process-video', (req, res) => {
  //get the video path from the request body
  const inputFilePath = req.body.inputFilePath; // Assuming the video path is sent in the request body}
  const outputFilePath = req.body.outputFilePath;

  // check if the video paths are provided
  if (!inputFilePath || !outputFilePath) {
   res.status(400).json({ error: 'Input and output file paths are required' });
  }

  // converts video to 360p
  Ffmpeg(inputFilePath)
    .outputOptions("-vf", "scale=-1:360").on ("end", ()=> {
      res.status(200).send("video processing finished successfully.") //these are all async 
    }).on("error", (error) => {
      console.log(`An error occured when trying to convert the video: ${error.message}`);
      res.status(500).send(`Internal server error: ${error.message}`)
    }).save(outputFilePath);  
    
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
