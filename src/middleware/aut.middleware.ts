import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authtoken: string = req.cookies.authToken;
    if (!authtoken || authtoken == undefined) return res.status(400).json("access token is missing, user should login before accessing the resources");
    else {
        try {
            const jwtVerificationResponse = jwt.verify(authtoken, process.env.JWT_ACCESSTOKEN_SECRET as string);
            (req as any).user = jwtVerificationResponse
        } catch (err) {
            console.log(err)
            return res.status(401).json({ msg: "Token has been expired/invalid", err: err });
        }

    }
    next();
}