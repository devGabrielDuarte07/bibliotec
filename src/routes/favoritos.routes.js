import express from "express";
import { adicionarFavorito, removerFavorito, obterLivrosFavs } from "../controllers/favorito.controller.js";

const router = express.Router();
router.get("/:id", obterLivrosFavs)
router.post("/favoritar", adicionarFavorito);
router.delete("/desfavoritar", removerFavorito);

export default router;
