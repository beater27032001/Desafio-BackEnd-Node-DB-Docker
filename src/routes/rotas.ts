import { Router } from "express";
import UsuarioController from "../controllers/usuario-controller";
import UsuarioMiddleware from "../middlewares/usuario-middleware";
import LoginController from "../controllers/login-controller";
import LoginMiddleware from "../middlewares/login-middleware";
import authMiddleware from "../middlewares/auth-middleware";
import MateriaController from "../controllers/mateira-controller";
import ResumoController from "../controllers/resumo-controller";
import ResumoMiddleware from "../middlewares/resumo-middleware";

const rotas = Router();

const usuarioController = new UsuarioController();
const usuarioMiddleware = new UsuarioMiddleware();
const loginController = new LoginController();
const loginMiddleware = new LoginMiddleware();
const materiaController = new MateriaController();
const resumoController = new ResumoController();
const resumoMiddleware = new ResumoMiddleware();

rotas.post(
  "/usuarios",
  usuarioMiddleware.validateCreate,
  usuarioController.create
);
rotas.post("/login", loginMiddleware.validateLogin, loginController.login);

rotas.use(authMiddleware);

rotas.get("/materias", materiaController.findAll);
rotas.post(
  "/resumos",
  resumoMiddleware.validateResumo,
  resumoController.create
);
rotas.get("/resumos", resumoController.findAll);
rotas.put("/resumos/:id", resumoController.edit);
rotas.delete("/resumos/:id", resumoController.delete);

export default rotas;
