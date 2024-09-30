import { NextFunction, Request, Response } from "express";
import UsuarioRepository from "../repositories/usuario-repository";

export default class UsuarioMiddleware {
  async validateCreate(req: Request, res: Response, next: NextFunction) {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ "mensagem": "Todos os campos são obrigatórios" });
    }

    const usuarioRepository = new UsuarioRepository();
    const emailExists = await usuarioRepository.findByEmail(email);

    if (emailExists) {
      return res.status(400).json({ "mensagem": "E-mail já cadastrado" });
    }

    next();
  }
}
