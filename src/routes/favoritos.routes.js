import express from "express";
import { adicionarFavorito, removerFavorito } from "../controllers/favorito.controller.js";

const router = express.Router();
router.post("/favoritar", adicionarFavorito);
router.delete("/desfavoritar", removerFavorito);

export default router;
