import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { TokenExpiredError } from "jsonwebtoken";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      "mensagem": "Falha na autenticação"
    });
  }
  const token = authorization.split(" ")[1];

  try {
    jwt.verify(token, process.env.SECRET_JWT || "");
    next();
  } catch (error) {
    return res.status(401).json({
      "mensagem": "Falha na autenticação"
    });
  }
}
