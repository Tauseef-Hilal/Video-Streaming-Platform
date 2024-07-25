"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
import { compare, hash } from "bcrypt-ts";
import { JWT_SECRET } from "../constants";
import { promisify } from "util";

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

const verifyAsync = (token: string, secret: string) =>
  new Promise<JwtPayload>((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as JwtPayload);
      }
    });
  });

export const verifyTokenAndGetPayload = async (token: string) => {
  try {
    return await verifyAsync(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
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
