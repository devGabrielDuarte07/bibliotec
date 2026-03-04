
import { db } from "../config/db.js"
// ============================
//  Rotas CRUD
// ============================


export async function listarCursos(req, res) {
  try {
    const [rows] = await db.execute("SELECT * FROM tabela_curso");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export async function obterCursos(req, res) {
  try {
    const [rows] = await db.execute("SELECT * FROM tabela_curso WHERE id = ?",[
      req.params.id,
    ]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};