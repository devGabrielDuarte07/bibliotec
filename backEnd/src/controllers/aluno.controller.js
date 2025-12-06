
import { db } from "../config/db.js"
import bcrypt from "bcrypt"
// ============================
//  Rotas CRUD
// ============================


export async function criarAluno(req, res) {
  try {
    const { nome, cpf, email, curso_id, turma_id, senha } = req.body;
    if (!nome || !cpf || !email || !curso_id || !turma_id || !senha)
      return res.status(400).json({ erro: "Campos obrigatórios" });

    console.log("📦 Dados recebidos:", {  nome, cpf, email, curso_id, turma_id, senha });

      const [resultado] = await db.execute(
      "INSERT INTO tabela_usuario (nome, cpf, email, curso_id, turma_id) VALUES (?, ?, ?, ?, ?)",
      [nome, cpf, email, curso_id, turma_id],
    );

    const aluno_id = resultado.insertId;
    const hashedPassword = await bcrypt.hash(senha, 10)

    
      //adiciona na tabela Login tambem
      await db.execute(
        "INSERT INTO tabela_login (aluno_id, senha) VALUES (?, ?)",
        [aluno_id, hashedPassword]
      )
    res.status(201).json({ mensagem: "Usuário criado com sucesso!" });
  } catch (err) {
    console.error("❌ ERRO AO CRIAR ALUNO:", err);
    res.status(500).json({ erro: err.message });
  }
}

export async function listarAlunos(req, res) {
  try {
    const [rows] = await db.execute("SELECT * FROM tabela_usuario");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


export async function obterAlunos(req, res) {
  try {
    const [rows] = await db.execute("SELECT * FROM tabela_usuario WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export async function atualizarAlunos(req, res) {
  try {
    const { nome, email, senha } = req.body;
    await db.execute(
      "UPDATE tabela_usuario SET nome = ?, email = ?, senha = ? WHERE id = ?",
      [nome, email, senha, req.params.id]
    );
    res.json({ mensagem: "Usuário atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


export async function deletarAluno(req, res) {
  try {
    await db.execute("DELETE FROM tabela_usuario WHERE id = ?", [req.params.id]);
    res.json({ mensagem: "Usuário deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};