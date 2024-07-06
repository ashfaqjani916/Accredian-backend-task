const nodemailer = require('nodemailer');


interface MailingDetails {
  friendEmail: string,
  referralCode:string,
}

export  const sendReferralEmail = async({  friendEmail, referralCode }:MailingDetails)=>{

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


