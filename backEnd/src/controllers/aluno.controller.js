
import { db } from "../config/db.js"
import bcrypt from "bcrypt"
// ============================
//  Rotas CRUD
// ============================

function validarEmail(email) {
  return email.includes('@') && email.endsWith('@aluno.senai.br');
}

export async function criarAluno(req, res) {
  try {
    const { nome, cpf, email, curso_id, senha} = req.body;

    // Verifica se todos os campos obrigatórios foram enviados
    if (!nome || !cpf || !email || !curso_id || !senha)
      return res.status(400).json({ erro: "Campos obrigatórios" });

    console.log("📦 Dados recebidos:", { nome, cpf, email, curso_id });

    // Verificar se o email já existe
    const [emailExistente] = await db.execute(
      "SELECT id FROM tabela_usuario WHERE email = ?",
      [email]
    );
    if (emailExistente.length > 0) {
      return res.status(409).json({ erro: "Email já cadastrado" });
    }

    if (!validarEmail(email)) {
      return res.status(400).json({ erro: "Email inválido! Deve ser @aluno.senai.br" });
    }

    // Inserir usuário
    const [resultado] = await db.execute(
      "INSERT INTO tabela_usuario (nome, cpf, email, curso_id) VALUES (?, ?, ?, ?)",
      [nome, cpf, email, curso_id]
    );

    const aluno_id = resultado.insertId;
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Inserir na tabela login
    await db.execute(
      "INSERT INTO tabela_login (aluno_id, senha) VALUES (?, ?)",
      [aluno_id, hashedPassword]
    );

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
    const { nome, email, CPF, curso_id } = req.body;
    await db.execute(
      "UPDATE tabela_usuario SET nome = ?, email = ?, CPF = ?, curso_id = ? WHERE id = ?",
      [nome, email, CPF, curso_id, req.params.id]
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

export async function adicionarFotoPerfil(req, res) {
  try {
    const { aluno_id, foto_base64 } = req.body;
    await db.execute(
      "UPDATE tabela_usuario SET foto_perfil = ? WHERE id = ?",
      [foto_base64, aluno_id]
    );
    res.json({ mensagem: "Foto de perfil atualizada com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export async function obterFotoPerfil(req, res) {
  try {
    const {id } = req.params;  
    const [rows] = await db.execute(
      "SELECT foto_perfil FROM tabela_usuario WHERE id = ?",
      [id]
    );
    if (rows.length === 0)
      return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json({ foto_perfil: rows[0].foto_perfil });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};