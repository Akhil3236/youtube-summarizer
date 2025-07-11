import express, { json } from "express";
import cors from "cors";
import { summarizeText } from "./summarizer.js";

const app = express();

app.use(cors());
app.use(json());


const port=2000;


app.post('/summerize' , async(req , res)=>{
   
    const {transcript}=req.body;
    

   try {
    const result = summarizeText(transcript);
    res.json({ summary: result });
  } catch (err) {
    console.error('Summarization error:', err);
    res.status(500).json({ error: 'Failed to summarize' });
  }
    


})


app.listen(port,()=>{

    console.log("The server is listening at port :",port)
})




