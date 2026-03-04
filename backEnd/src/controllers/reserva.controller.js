import { db } from "../config/db.js"



export async function obterLivrosrReservados(req, res) {
  try {
    console.log("ID recebido:", req.params.id);

    const [rows] = await db.execute(`
      SELECT 
        livro.id AS livro_id,
        livro.titulo,
        livro.autor,
        livro.descricao,
        livro.capa_url
      FROM tabela_livros_reservados af
      JOIN tabela_livros livro ON livro.id = af.livro_id
      WHERE af.aluno_id = ?
    `, [req.params.id]);

    return res.json(rows);

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function adicionarReserva(req, res) {
  const { aluno_id, livro_id } = req.body;

  try {
    await db.execute(
      "INSERT INTO tabela_livros_reservados (aluno_id, livro_id) VALUES (?, ?)",
      [aluno_id, livro_id]
    );

    return res.json({ mensagem: "Livro reservado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
}

export async function removerReserva(req, res) {
  const { aluno_id, livro_id } = req.body;

  try {
    await db.execute(
      "DELETE FROM tabela_livros_reservados WHERE aluno_id = ? AND livro_id = ?",
      [aluno_id, livro_id]
    );

    return res.json({ mensagem: "Livro removido dos reservados!" });
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
}
