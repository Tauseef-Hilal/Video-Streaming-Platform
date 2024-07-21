"use server"

import jwt from "jsonwebtoken";
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

