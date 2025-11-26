import { db } from "../config/db.js"
import bcrypt from "bcrypt"


// ============================
//  Rotas CRUD
// ============================


export async function login(req, res) {
  try {
    const { email, senha} = req.body;

    const [alunoRows] = await db.execute(
      "SELECT id, nome, email FROM tabela_usuario WHERE email = ?",
      [email]
    );

    if (alunoRows.length === 0) {
      return res.status(400).json({ erro: "Usuário não encontrado" });
    }

    const aluno = alunoRows[0];

    const [loginRows] = await db.execute(
      "SELECT senha, perfil FROM tabela_login WHERE aluno_id = ?",
      [aluno.id]
    )

    if (loginRows.length === 0) {
      return res.status(400).json({ erro: "Login não configurado para este usuário" });
    }

    const dadosLogin = loginRows[0];

    const senhaCorreta = await bcrypt.compare(senha, dadosLogin.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: "Senha incorreta" });
    }


    console.log("Login recebido:", req.body);
    console.log("Resultado do SELECT aluno:", alunoRows);
    return res.json({
      mensagem: "Login bem-sucedido",
      aluno: {
        id: aluno.id,
        nome: aluno.nome,
        email: aluno.email,
        perfil: dadosLogin.perfil
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro interno no servidor" });
  }
}