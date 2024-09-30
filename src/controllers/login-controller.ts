import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
import UsuarioRepository from "../repositories/usuario-repository";

export default class LoginController {
  async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    try {
      const userRepository = new UsuarioRepository();
      const user = await userRepository.findByEmail(email);

      const token = jwt.sign({ id: user.id }, process.env.SECRET_JWT || "", {
        expiresIn: "1h",
      });

      return res.status(200).json({ token });
    } catch (error) {
      const erro = error as Error;
      return res.status(400).json({ error: erro.message });
    }
  }
}
