import express from "express";
import cors from "cors";


const app=express();

app.use(cors());
app.use(express.json());

const port=2000;



app.listen(port,()=>{

    console.log("The server is listening at port :",port)
})




