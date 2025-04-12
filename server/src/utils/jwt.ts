import jwt from 'jsonwebtoken';

import { JwtPayload } from '../models/auth.models';


const JWT_SECRET = 'default_secret'; 
const EXPIRES_IN = '7d';


export const generateToken = (payload: JwtPayload): string | null => {
  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
  } catch (err: any) {
    console.error('Invalid token: ', err.message);
    return null;
  }
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET!) as JwtPayload;
  } catch (err: any) {
    console.error('Invalid token: ', err.message);
    return null;
  }
};