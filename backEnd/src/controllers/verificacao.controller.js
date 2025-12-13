import e from "express";
import { db } from "../config/db.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function criarCodigoRecuperacao(req, res) {
  try {
    const { email, tipo } = req.body;
    if (!email)
      return res.status(400).json({ erro: "Campo email é obrigatório" });

    const [rows] = await db.execute(
      "SELECT * FROM tabela_usuario WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    const codigo = Math.floor(100000 + Math.random() * 900000).toString();

    const htmlTemplate = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Redefinição de Senha</title>
</head>
<body style="margin:0; padding:0; background-color:#F3F4F6; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F3F4F6; padding: 30px 0;">
    <tr>
      <td align="center">
        
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 540px; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:#1E3A8A; padding:20px 30px; text-align:center;">
              <img src="../../../frontEnd/img/logo.png" alt="Bibliotec" style="max-width:120px; margin-bottom:10px;" />
              <h1 style="color:#ffffff; margin:0; font-size:24px; font-weight:600;">
                Redefinição de Senha
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding: 30px;">

              <p style="font-size:16px; color:#333333; margin:0 0 15px;">
                Olá! Recebemos uma solicitação para redefinir sua senha no sistema <strong>Bibliotec</strong>.
              </p>

              <p style="font-size:16px; color:#333333; margin:0 0 20px;">
                Use o código abaixo para continuar:
              </p>

              <div style="text-align:center; margin: 30px 0;">
                <div style="display:inline-block; padding: 12px 25px; font-size:22px; font-weight:bold; color:#1E3A8A; border:2px solid #1E3A8A; border-radius:8px; letter-spacing:4px;">
                  ${codigo}
                </div>
              </div>

              <p style="font-size:14px; color:#666666; margin:0 0 25px; line-height:1.5;">
                Este código é válido por <strong>10 minutos</strong>.<br />
                Se você não solicitou essa alteração, basta ignorar este e-mail.
              </p>

              <p style="font-size:14px; color:#999999; text-align:center; margin:0;">
                © 2025 — Bibliotec. Todos os direitos reservados.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`;


    try {
      await transporter.sendMail({
        from: '"Bibliotec" <bibliotecsenai@gmail.com>',
        to: email,
        subject: "Código de Verificação - Bibliotec",
        text: `Seu código é: ${codigo}`,
        html: htmlTemplate,
      });
    } catch (err) {
      console.error("❌ Erro ao enviar email:", err);
      return res.status(500).json({ erro: "Erro ao enviar e-mail" });
    }

    const agora = new Date();
    const expiracao = new Date(agora.getTime() + 10 * 60000);

    const agoraFormatada = agora
      .toLocaleString("sv-SE", { hour12: false })
      .replace(",", "");

    const expiracaoFormatada = expiracao
      .toLocaleString("sv-SE", { hour12: false })
      .replace(",", "");

    await db.execute(
      "INSERT INTO tabela_verificacao (email, codigo, criado_em, expiracao, tipo) VALUES (?, ?, ?, ?, ?)",
      [email, codigo, agoraFormatada, expiracaoFormatada, 'recuperacao']
    );

    res.status(201).json({ mensagem: "Código criado com sucesso!", codigo });
  } catch (err) {
    console.error("❌ ERRO AO CRIAR CÓDIGO:", err);
    res.status(500).json({ erro: err.message });
  }
}

export async function verificarCodigoRecuperacao(req, res) {
  try {
    const { email, codigo, tipo  } = req.body;
    if (!email || !codigo)
      return res.status(400).json({ erro: "Campos obrigatórios" });

    const [rows] = await db.execute(
      "SELECT * FROM tabela_verificacao WHERE email = ? AND codigo = ? AND tipo = ? ORDER BY criado_em DESC LIMIT 1",
      [email, codigo, 'recuperacao']
    );

    if (rows.length === 0) {
      return res.status(404).json({ erro: "Código inválido" });
    }

    const agora = new Date();
    const expiracao = new Date(rows[0].expiracao);

    if (agora > expiracao) {
      return res.status(400).json({ erro: "Código expirado" });
    }

    const [aluno] = await db.execute(
      "SELECT id FROM tabela_usuario WHERE email = ? LIMIT 1",
      [email]
    );

    if (aluno.length === 0) {
      return res.status(404).json({ erro: "Aluno não encontrado" });
    }

    res.json({
      mensagem: "Código verificado com sucesso!",
      aluno_id: aluno[0].id,
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function criarCodigoCadastro(req, res) {
  try {
    const { email } = req.body;

    
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();

    const htmlTemplate = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verificação de E-mail</title>
</head>
<body style="margin:0; padding:0; background-color:#F3F4F6; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F3F4F6; padding: 30px 0;">
    <tr>
      <td align="center">
        
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 540px; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:#1E3A8A; padding:20px 30px; text-align:center;">
              <img src="../../../frontEnd/img/logo.png" alt="Bibliotec" style="max-width:120px; margin-bottom:10px;" />
              <h1 style="color:#ffffff; margin:0; font-size:24px; font-weight:600;">
                Verificação de E-mail
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding: 30px;">

              <p style="font-size:16px; color:#333333; margin:0 0 15px;">
                Olá! Para concluir seu cadastro no sistema <strong>Bibliotec</strong>, insira o código de verificação abaixo:
              </p>

              <div style="text-align:center; margin: 30px 0;">
                <div style="display:inline-block; padding: 15px 30px; font-size:24px; font-weight:bold; color:#1E3A8A; border:2px solid #1E3A8A; border-radius:8px; letter-spacing:6px;">
                  ${codigo}
                </div>
              </div>

              <p style="font-size:14px; color:#666666; margin:0 0 25px; line-height:1.5;">
                Este código é válido por <strong>10 minutos</strong>.<br />
                Se você não solicitou este cadastro, basta ignorar este e-mail.
              </p>

              <p style="font-size:14px; color:#999999; text-align:center; margin:0;">
                © 2025 — Bibliotec. Todos os direitos reservados.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`;


    try {
      await transporter.sendMail({
        from: '"Bibliotec" <bibliotecsenai@gmail.com>',
        to: email,
        subject: "Código de Verificação - Bibliotec",
        text: `Seu código é: ${codigo}`,
        html: htmlTemplate,
      });
    } catch (err) {
      console.error("❌ Erro ao enviar email:", err);
      return res.status(500).json({ erro: "Erro ao enviar e-mail" });
    }

    const agora = new Date();
    const expiracao = new Date(agora.getTime() + 10 * 60000);

    const agoraFormatada = agora
      .toLocaleString("sv-SE", { hour12: false })
      .replace(",", "");

    const expiracaoFormatada = expiracao
      .toLocaleString("sv-SE", { hour12: false })
      .replace(",", "");

    await db.execute(
      "INSERT INTO tabela_verificacao (email, codigo, criado_em, expiracao, tipo) VALUES (?, ?, ?, ?, ?)",
      [email, codigo, agoraFormatada, expiracaoFormatada, 'cadastro']
    );

    res.status(201).json({ mensagem: "Código criado com sucesso!", codigo });
  } catch (err) {
    console.error("❌ ERRO AO CRIAR CÓDIGO:", err);
    res.status(500).json({ erro: err.message });
  }
}

export async function verificarCodigoCadastro(req, res) {
  try {
    const { email, codigo, tipo } = req.body;

    if (!codigo) {
      return res.status(400).json({ erro: "Campos obrigatórios" });
    }

    // Busca o código mais recente do tipo correto
    const [rows] = await db.execute(
      "SELECT * FROM tabela_verificacao WHERE email = ? AND codigo = ? AND tipo = ? ORDER BY criado_em DESC LIMIT 1",
      [email, codigo, "cadastro"]
    );

    if (rows.length === 0) {
      return res.status(404).json({ erro: "Código inválido" });
    }

    const agora = new Date();
    const expiracao = new Date(rows[0].expiracao);

    if (agora > expiracao) {
      return res.status(400).json({ erro: "Código expirado" });
    }

    // Aqui não buscamos aluno_id porque o usuário ainda não existe
    return res.json({
      mensagem: "Código verificado com sucesso!"
    });

  } catch (err) {
    console.error("❌ ERRO AO VERIFICAR CÓDIGO:", err);
    return res.status(500).json({ erro: err.message });
  }
}


export async function limparCodigosAntigos() {
  try {
    const agora = new Date();
    const agoraFormatada = agora
      .toLocaleString("sv-SE", { hour12: false })
      .replace(",", "");

    await db.execute("DELETE FROM tabela_verificacao WHERE expiracao < ?", [
      agoraFormatada,
    ]);

    console.log("🧹 Códigos antigos limpos com sucesso!");
  } catch (err) {
    console.error("❌ ERRO AO LIMPAR CÓDIGOS ANTIGOS:", err);
  }
}

setInterval(limparCodigosAntigos, 60 * 60 * 1000);

export async function atualizarSenha(req, res) {
  try {
    const { aluno_id } = req.params;
    const { nova_senha } = req.body;

    // CORREÇÃO: validar o campo corretamente
    if (!nova_senha) {
      return res.status(400).json({ erro: "Campo nova_senha é obrigatório" });
    }

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(nova_senha, 10);

    // Atualizar no banco
    await db.execute(
      "UPDATE tabela_login SET senha = ? WHERE aluno_id = ?",
      [hashedPassword, aluno_id]
    );

    res.json({ mensagem: "Senha atualizada com sucesso!" });

  } catch (err) {
    console.error("❌ ERRO AO ATUALIZAR SENHA:", err);
    res.status(500).json({ erro: err.message });
  }
}
