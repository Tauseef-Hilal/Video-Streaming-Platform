"use server";

import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
import { compare, hash } from "bcrypt-ts";
import { JWT_SECRET } from "../constants";

export const hashPassword = async (password: string) => {
  return await hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await compare(password, hashedPassword);
};

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" });
};

export const verifyTokenAndGetPayload = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export type SendOtpResponse = {
  success: boolean;
  otp?: string;
};

export async function sendOtp(email: string): Promise<SendOtpResponse> {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  const otp = Math.floor(Math.random() * 1000000) + "";
  const msg = {
    from: process.env.SENDGRID_FROM_EMAIL,
    to: email,
    subject: "One Time Password (OTP)",
    text: `Your One Time Password (OTP) for resetting your password is: ${otp}`,
  };

  try {
    //@ts-ignore
    await sgMail.send(msg);
    return { success: true, otp };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
