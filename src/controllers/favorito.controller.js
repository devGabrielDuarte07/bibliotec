  import { db } from "../config/db.js"

  export async function obterLivros(req, res) {
  try {
    console.log("ID recebido:", req.params.id);

    const [rows] = await db.execute(`
      SELECT livro.id, livro.titulo, livro.autor, livro.capa_url
        FROM alunos_favoritos af
        JOIN livros livro ON livro.id = af.livro_id
        WHERE af.aluno_id = ?`, [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.json([]);
    }
    return res.json(rows);

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

  export async function adicionarFavorito(req, res) {
    const { aluno_id, livro_id } = req.body;

    try {
      await db.execute(
        "INSERT INTO alunos_favoritos (aluno_id, livro_id) VALUES (?, ?)",
        [aluno_id, livro_id]
      );

      return res.json({ mensagem: "Livro favoritado com sucesso!" });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }

  export async function removerFavorito(req, res) {
    const { aluno_id, livro_id } = req.body;

    try {
      await db.execute(
        "DELETE FROM alunos_favoritos WHERE aluno_id = ? AND livro_id = ?",
        [aluno_id, livro_id]
      );

      return res.json({ mensagem: "Livro removido dos favoritos!" });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }
