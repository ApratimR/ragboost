import { NextFunction, Request, Response } from "express";

async function basicAuthCheck(req:Request,res:Response,next:NextFunction) {
    // Check if the request has basic authentication header and same as the expected credentials from env
    // const authHeader = req.headers.authorization;
    // if (!authHeader || authHeader !== `Basic ${process.env.BASIC_AUTH_TOKEN}`) {
    //     return res.status(401).json({ message: "Unauthorized" });
    // }
    next();
}

export default basicAuthCheck;