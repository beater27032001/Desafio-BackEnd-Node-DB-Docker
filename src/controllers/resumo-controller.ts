import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import ResumoRepository from "../repositories/resumo-repository";
import UsuarioRepository from "../repositories/usuario-repository";
import MateriaRepository from "../repositories/mateira-repository";
import TResumo from "../tipos/TResumo";

const usuarioRepository = new UsuarioRepository();
const resumoRepository = new ResumoRepository();

export default class ResumoController {
  async create(req: Request, res: Response) {
    const { materiaId, titulo, topicos, descricao } = req.body;
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        mensagem: "Falha na autenticação",
      });
    }

    const token = authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.SECRET_JWT || "");
      const usuarioId = (decoded as any).id;

      const usuario = await usuarioRepository.findById(usuarioId);

      const resumo: TResumo = {
        usuarioId: usuario.id,
        materiaId,
        titulo: titulo || "Sem título",
        topicos: Array.isArray(topicos) ? topicos.join(", ") : topicos,
        descricao: descricao || "Sem descrição",
        criado: new Date().toISOString(),
      };

      const result = await resumoRepository.create(resumo);

      return res.status(201).json(result);
    } catch (error) {
      const erro = error as Error;
      return res.status(400).json({ error: erro.message });
    }
  }

  async findAll(req: Request, res: Response) {
    const result = await resumoRepository.findAll();
    return res.status(200).json(result);
  }

  async edit(req: Request, res: Response) {
    const { id } = req.params;
    const { titulo, topicos, descricao } = req.body;

    try {
      if (!id || !titulo || !topicos || !descricao) {
        return res.status(400).json({ mensagem: "Preencha todos os campos" });
      }
      const resumo = await resumoRepository.findById(Number(id));
      if (!resumo) {
        return res.status(404).json({ mensagem: "Resumo não encontrado" });
      }

      const novoResumo: TResumo = {
        id: resumo.id,
        usuarioId: resumo.usuarioId,
        materiaId: resumo.materiaId,
        titulo: titulo || resumo.titulo,
        topicos: Array.isArray(topicos)
          ? topicos.join(", ")
          : topicos || resumo.topicos,
        descricao: descricao || resumo.descricao,
        criado: resumo.criado,
      };

      const resumoEditado = await resumoRepository.edit(novoResumo);

      return res.status(200).json(resumoEditado);
    } catch (error) {
      const erro = error as Error;
      return res.status(400).json({ error: erro.message });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ mensagem: "Informe o id do resumo" });
    }

    const resumo = await resumoRepository.findById(Number(id));
    if (!resumo) {
      return res.status(404).json({ mensagem: "Resumo não encontrado" });
    }

    const resultado = await resumoRepository.delete(Number(id));
    return res.status(200).json({ mensagem: "Resumo excluído com sucesso" });
  }
}
