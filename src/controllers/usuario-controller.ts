import { Request, Response } from "express";
import UsuarioRepository from "../repositories/usuario-repository";
import bcrypt from "bcrypt";
import TUsuario from "../tipos/TUsuario";

export default class UsuarioController {
  async create(req: Request, res: Response) {
    const { nome, email, senha } = req.body;
    try {
      const usuarioRepository = new UsuarioRepository();

      const usuario: TUsuario = { nome, email, senha };

      const hashPassword = await bcrypt.hash(senha, 10);
      usuario.senha = hashPassword;

      const createdUsuario = await usuarioRepository.create(usuario);

      return res.status(201).json(createdUsuario);
    } catch (error) {
      const erro = error as Error;
      return res.status(400).json({ error: erro.message });
    }
  }
}
