import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import UsuarioRepository from "../repositories/usuario-repository";
import MateriaRepository from "../repositories/mateira-repository";

export default class ResumoMiddleware {
  async validateResumo(req: Request, res: Response, next: NextFunction) {
    const { materiaId, topicos, descricao } = req.body;
    const { authorization } = req.headers;

    if (typeof materiaId !== "number" || !materiaId || !topicos ) {
      return res
        .status(400)
        .json({ mensagem: "Todos os campos são obrigatórios" });
    }

    if (!authorization) {
      return res.status(401).json({
        mensagem: "Falha na autenticação",
      });
    }

    const token = authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.SECRET_JWT || "");
      const usuarioId = (decoded as any).id;

      const usuarioRepository = new UsuarioRepository();
      const usuario = await usuarioRepository.findById(usuarioId);
      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      const materiaRepository = new MateriaRepository();
      const materia = await materiaRepository.findById(materiaId);
      if (!materia) {
        return res.status(404).json({ mensagem: "Matéria não encontrada" });
      }

      next();
    } catch (error) {
      const erro = error as Error;
      return res.status(400).json({ error: erro.message });
    }
  }
}
