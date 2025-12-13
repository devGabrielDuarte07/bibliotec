import express from "express";
import {
  criarAluno,
  listarAlunos,
  obterAlunos,
  atualizarAlunos,
  deletarAluno,
  adicionarFotoPerfil,
  obterFotoPerfil,
} from "../controllers/aluno.controller.js";

const router = express.Router();

// ROTAS CRUD
router.post("/", criarAluno);
router.get("/", listarAlunos);
router.get("/:id", obterAlunos);
router.put("/:id", atualizarAlunos);
router.delete("/:id", deletarAluno);
router.post("/foto-perfil", adicionarFotoPerfil);
router.get("/foto-perfil/:id", obterFotoPerfil);

export default router;
