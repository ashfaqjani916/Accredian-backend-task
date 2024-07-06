import { Express,Request,Response } from "express";
import { sendReferralEmail } from '../utils/mailer';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export const addRefree =  async (req:Request, res:Response)=>{
  try {
    const { friendEmail } = req.body;

    // Data validation 
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
    await sendReferralEmail({friendEmail,referralCode});
    res.json({ message: 'Referral submitted successfully!' , newReferral });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
