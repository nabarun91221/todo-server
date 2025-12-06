import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { RequestHandler } from "express";

export const dtoValidation = (dto: any): RequestHandler => {
    return async (req, res, next) => {
        const dataObj = plainToInstance(dto, req.body);
        const validationRes = await validate(dataObj);
        console.log({ msg: "validationRes output", validationRes: validationRes });
        if (validationRes.length > 0) return res.status(400).json({ msg: "validation failed", validation_response: validationRes });
        else next();
    }
}