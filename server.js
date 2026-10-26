import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import prisma from "./src/config/prisma.js";
import swaggerSpec from "./src/config/swagger.js";
import racasRoutes from "./src/routes/racasRoutes.js";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({
    mensagem: "API funcionando!",
    projeto: "Catálogo de raças de cachorro",
    informacao: "API REST para cadastro e consulta de raças de cachorro"
  });
});

app.use("/racas", racasRoutes);

app.use((erro, req, res, next) => {
  console.error(erro);
  res.status(500).json({ mensagem: "Erro interno do servidor" });
});

try {
  await prisma.$connect();
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
} catch (erro) {
  console.error("Não foi possível conectar ao banco de dados:", erro.message);
  process.exitCode = 1;
} finally {
  if (process.exitCode) {
    await prisma.$disconnect();
  }
}
