import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

async function catchError(err:Error,req:Request,res:Response,next:NextFunction) {
    if (err instanceof ZodError){
        console.log('Zod Error:', err.errors);
    }

    console.error(err.stack)
    res.status(500).send('Some Error Occured!')
}

export default catchError;