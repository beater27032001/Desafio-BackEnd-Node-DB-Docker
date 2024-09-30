import { Request, Response } from "express";
import MateriaRepository from "../repositories/mateira-repository";

export default class MateriaController {
  async findAll(req: Request, res: Response) {
    try {
      const result = await new MateriaRepository().findAll();
      return res.status(200).json(result);
    } catch (error) {
      const erro = error as Error;
      return res.status(400).json({ error: erro.message });
    }
  }
}
