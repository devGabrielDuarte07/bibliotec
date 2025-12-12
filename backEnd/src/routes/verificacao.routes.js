import express from "express";
import { criarCodigoRecuperacao, criarCodigoCadastro, verificarCodigoRecuperacao, verificarCodigoCadastro,atualizarSenha } from "../controllers/verificacao.controller.js"
const router = express.Router();

router.post("/recuperacao", criarCodigoRecuperacao);
router.post("/cadastro", criarCodigoCadastro);
router.post("/recuperacao/verificar", verificarCodigoRecuperacao);
router.post("/cadastro/verificar", verificarCodigoCadastro);

router.put("/senha/:aluno_id", atualizarSenha);


export default router;