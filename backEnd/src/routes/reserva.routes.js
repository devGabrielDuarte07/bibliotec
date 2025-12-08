import express from "express";
import { adicionarReserva, removerReserva, obterLivrosrReservados } from "../controllers/reserva.controller.js";

const router = express.Router();
router.get("/:id", obterLivrosrReservados)
router.post("/reservar", adicionarReserva);
router.delete("/desreservar", removerReserva);

export default router;
