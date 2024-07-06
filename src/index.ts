import * as dotenv from 'dotenv'
dotenv.config() 
import { Express,Request,Response } from "express";
import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import { addRefree } from './modules/addRefree';
const port = process.env.PORT

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(port,()=>{
  console.log("The app is running on port 8080");
})

app.get('/',(req:Request, res:Response)=>{
  res.send("The backend is running live")
});

app.post('/api/refer', addRefree)



