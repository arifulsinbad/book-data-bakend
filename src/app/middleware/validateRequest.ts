import { NextFunction, Request, Response } from "express";

import { AnyZodObject, ZodEffects } from "zod";

const requestValidate =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      return next();
    } catch (error) {
      // res.status(400).json({ error: err })
      next(error);
      // next()
    }
  };

export const validateRequest = requestValidate;
