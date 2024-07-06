import * as dotenv from 'dotenv'
dotenv.config() 

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

import { Express } from "express";
import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import { OAuth2Client } from 'google-auth-library';
const nodemailer = require('nodemailer');
const {google} = require('googleapis')



const port = process.env.PORT

const app: Express = express();

app.use(bodyParser.json())
app.use(cors())


app.use(cors());

app.listen(port,()=>{
  console.log("The app is running on port 8080");
})

app.get('/',(req, res)=>{
  res.send("The backend is running live")
});

interface MailingDetails {
  friendEmail: string,
  referralCode:string,
}

const sendReferralEmail = async({  friendEmail, referralCode }:MailingDetails)=>{

  // console.log("send email function is being called brooo")

  // const oauth2Client = new google.auth.OAuth2(
  //   process.env.CLIENT_ID,
  //   process.env.CLIENT_SECRET,
  //   process.env.REDIRECT_URI,
  // );




  // const refreshToken = process.env.REFRESH_TOKEN;
  // if (refreshToken) {
  //   oauth2Client.setCredentials({ refresh_token: refreshToken });
  //   await oauth2Client.refreshAccessToken();
  // }

  // const accessToken = await oauth2Client.getAccessToken();

  // console.log("we are getting an access token",accessToken);

  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     type: 'OAuth2',
  //     user: process.env.sender, // Your Gmail address
  //     clientId: process.env.CLIENT_ID,
  //     clientSecret: process.env.CLIENT_SECRET,
  //     refreshToken: process.env.REFRESH_TOKEN,
  //     accessToken: accessToken,
  //   },
  // });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
      user:process.env.sender,
      pass: process.env.passcode
    }
  })

  
let details = {
  from: process.env.sender,
  to:friendEmail,
  subject:"Refer and Earn ",
  text:`
 Hey there,
 Your referral code for accredian is ${referralCode}. Earn rewards when your friends sign up!`
}

transporter.sendMail(details,(err:any)=>{
  if(err){
    console.error(err)
  }
  else{
    console.log("email has been sent successfully");
  }
})
}





app.post('/api/refer', async (req, res)=>{
  try {
    const { friendEmail } = req.body;

    // Data validation (implement your validation logic here)

    if ( !friendEmail) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const referrerEmail : string  = process.env.sender as string;
    const referralCode : string = "ACCREDIAN100"

    // Save referral data to database using Prisma
    const newReferral = await prisma.referral.create({
      data: {
        referrerEmail,
        friendEmail,
        referralCode,
      },
    });



    // Send email notification (implement email sending logic below)
    await sendReferralEmail({friendEmail,referralCode});

    res.json({ message: 'Referral submitted successfully!' , newReferral });


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
)



