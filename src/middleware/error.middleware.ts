import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { BaseError } from "../errors/base.error";

async function catchError(err:Error,req:Request,res:Response,next:NextFunction) {
    
    // type based error logging part
    if (err instanceof ZodError){
        console.log('Zod Error:', err.errors);
    }
    else{
        console.error("Error Stack : ",err?.stack)
    }
    

    // type based error return
    if (err instanceof BaseError){
        return res.status(err.baseErrorStatus).json({
            message:err.baseErrorMessage
        })
    }
    
    return res.status(500).send('Some Error Occured!')
}

export default catchError;