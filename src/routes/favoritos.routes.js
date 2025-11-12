import express from "express";
import { adicionarFavorito, removerFavorito, obterLivros } from "../controllers/favorito.controller.js";

const router = express.Router();
router.get("/:id", obterLivros)
router.post("/favoritar", adicionarFavorito);
router.delete("/desfavoritar", removerFavorito);

export default router;
