import express from "express";
import {
  criarLivro,
  listarLivros,
  obterLivros,
  atualizarLivros,
  deletarLivro,
  listarLivrosPorCategoria
} from "../controllers/livro.controller.js";

const router = express.Router();

// ROTAS ESPECÍFICAS PRIMEIRO
router.get("/categoria/:genero", listarLivrosPorCategoria);

// ROTAS GENÉRICAS DEPOIS
router.get("/", listarLivros);
router.get("/:id", obterLivros);

// CRUD
router.post("/", criarLivro);
router.put("/:id", atualizarLivros);
router.delete("/:id", deletarLivro);


export default router;
