import { Request } from "express";
import * as z from "zod";

export interface RequestValidator<T> extends Request {
  body: T;
}

export const errorHandler = (error: any) => {
  if (error instanceof z.ZodError) {
    return {
      message: error.issues.map((issue) => issue.message),
    };
  }

  return {
    message: [error.toString()],
  };
};
