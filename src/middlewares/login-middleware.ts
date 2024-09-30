import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import UsuarioRepository from "../repositories/usuario-repository";

export default class LoginMiddleware {
  async validateLogin(req: Request, res: Response, next: NextFunction) {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res
        .status(400)
        .json({ mensagem: "Todos os campos são obrigatórios" });
    }

    try {
      const user = await new UsuarioRepository().findByEmail(email);
      if (!user) {
        return res.status(400).send({ mensagem: "E-mail ou senha inválidos" });
      }

      const validateSenha = await bcrypt.compare(senha, user.senha);
      if (!validateSenha) {
        return res.status(400).send({ mensagem: "E-mail ou senha inválidos" });
      }
    } catch (error) {
      const erro = error as Error;
      return res.status(400).json({ error: erro.message });
    }
    next();
  }
}
