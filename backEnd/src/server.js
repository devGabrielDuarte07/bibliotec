  // ============================
  //  Dependências
  // ============================
  import express from "express";
  import bodyParser from "body-parser";
  import cors from "cors";
  import usuarioRoutes from "./routes/aluno.routes.js"
  import livroRoutes from "./routes/livro.routes.js"
  import favoritosRoutes from "./routes/favoritos.routes.js"
  import loginRoutes from "./routes/login.routes.js"


  // ============================
  //  Configuração do servidor
  // ============================
  const app = express()
  app.use(cors());
  app.use(bodyParser.json());

  app.get("/",(req,res)=>{
    res.send("API rodando com sucesso")
  })

  app.use("/usuario", usuarioRoutes)
  app.use("/livros", livroRoutes)
  app.use("/favoritos", favoritosRoutes)
  app.use("/login", loginRoutes)

  // ============================
  //  Inicia o servidor
  // ============================
  const PORT = 3000;
  app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));

