import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
<<<<<<< HEAD:server.js
import prisma from "./src/config/prisma.js";
import swaggerSpec from "./src/config/swagger.js";
import racasRoutes from "./src/routes/racasRoutes.js";
=======
import swaggerJSDoc from "swagger-jsdoc";
import racas from "./src/racas/express";
>>>>>>> 1a6cbc05290697039bc880bb57d1c4abfbabd3e5:src/data/server.js

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

<<<<<<< HEAD:server.js
app.get("/", (req, res) => {
=======
const racas = [
  { id: 1, nome: "Golden Retriever", origem: "Reino Unido", porte: "Grande", temperamento: "Amigável" },
  { id: 2, nome: "Labrador Retriever", origem: "Canadá", porte: "Grande", temperamento: "Dócil" },
  { id: 3, nome: "Pastor Alemão", origem: "Alemanha", porte: "Grande", temperamento: "Leal" },
  { id: 4, nome: "Beagle", origem: "Reino Unido", porte: "Médio", temperamento: "Brincalhão" },
  { id: 5, nome: "Poodle", origem: "França", porte: "Médio", temperamento: "Inteligente" },
  { id: 6, nome: "Bulldog Francês", origem: "França", porte: "Pequeno", temperamento: "Companheiro" }
];

let proximoId = 7;

const camposObrigatorios = ["nome", "origem", "porte", "temperamento"];

function dadosSaoValidos(dados) {
  return camposObrigatorios.every(
    (campo) => typeof dados[campo] === "string" && dados[campo].trim() !== ""
  );
}

function dadosParciaisSaoValidos(dados) {
  const camposRecebidos = Object.keys(dados);

  return camposRecebidos.length > 0 && camposRecebidos.every(
    (campo) => camposObrigatorios.includes(campo)
      && typeof dados[campo] === "string"
      && dados[campo].trim() !== ""
  );
}

function obterId(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({
      mensagem: "O ID deve ser um número inteiro positivo"
    });
    return null;
  }

  return id;
}

app.get("/", verificarToken, (req, res) => {
>>>>>>> 1a6cbc05290697039bc880bb57d1c4abfbabd3e5:src/data/server.js
  res.json({
    mensagem: "API funcionando!",
    projeto: "Catálogo de raças de cachorro",
    informacao: "API REST para cadastro e consulta de raças de cachorro"
  });
});

<<<<<<< HEAD:server.js
app.use("/racas", racasRoutes);

app.use((erro, req, res, next) => {
  console.error(erro);
  res.status(500).json({ mensagem: "Erro interno do servidor" });
});

try {
  await prisma.$connect();
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
=======
app.get("/racas", verificarToken, (req, res) => {
  res.json(racas);
});

/**
 * @swagger
 * /racas:
 *   get:
 *     summary: Lista todas as raças
 *     description: Retorna todas as raças de cachorro cadastradas.
 *     tags:
 *       - Raça
 *     responses:
 *       200:
 *         description: Lista de raças retornada com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 nome: Golden Retriever
 *                 origem: Reino Unido
 *                 porte: Grande
 *                 temperamento: Amigável
 */

/**
 * @swagger
 * /racas/{id}:
 *   get:
 *     summary: Busca uma raça pelo ID
 *     description: Retorna uma raça de cachorro específica pelo seu ID.
 *     tags:
 *       - Raça
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da raça de cachorro.
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Raça encontrada com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               nome: Golden Retriever
 *               origem: Reino Unido
 *               porte: Grande
 *               temperamento: Amigável
 *       400:
 *         description: O ID informado é inválido.
 *       404:
 *         description: Raça não encontrada.
 */

app.get("/racas/:id", verificarToken, (req, res) => {
  const id = obterId(req, res);

  if (id === null) {
    return;
  }

  const raca = racas.find((raca) => raca.id === id);

  if (!racas) {
    return res.status(404).json({
      mensagem: "Raça não encontrada"
    });
  }

  res.json(raca);
});

app.post("/racas", verificarToken, (req, res) => {
  if (!dadosSaoValidos(req.body)) {
    return res.status(400).json({
      mensagem: "Os campos nome, origem, porte e temperamento são obrigatórios"
    });
  }

  const novaRaca = {
    id: proximoId,
    nome: req.body.nome,
    origem: req.body.origem,
    porte: req.body.porte,
    temperamento: req.body.temperamento
  };

  proximoId++;
  racas.push(novaRaca);

  res.status(201).json({
    mensagem: "Raça cadastrada com sucesso",
    raca: novaRaca
>>>>>>> 1a6cbc05290697039bc880bb57d1c4abfbabd3e5:src/data/server.js
  });
} catch (erro) {
  console.error("Não foi possível conectar ao banco de dados:", erro.message);
  process.exitCode = 1;
} finally {
  if (process.exitCode) {
    await prisma.$disconnect();
  }
<<<<<<< HEAD:server.js
}
=======

  const indice = racas.findIndex((raca) => raca.id === id);

  if (indice === -1) {
    return res.status(404).json({
      mensagem: "Raça não encontrada"
    });
  }

  if (!dadosParciaisSaoValidos(req.body)) {
    return res.status(400).json({
      mensagem: "Informe pelo menos um campo válido para atualização"
    });
  }

  racas[indice] = {
    ...racas[indice],
    ...req.body,
    id
  };

  res.json({
    mensagem: "Raça atualizada com sucesso",
    raca: racas[indice]
  });
});

/**
 * @swagger
 * /racas/{id}:
 *   delete:
 *     summary: Exclui uma raça
 *     description: Exclui uma raça de cachorro pelo ID. É necessário enviar um Bearer Token.
 *     tags:
 *       - Raça
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da raça de cachorro.
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Raça excluída com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Raça excluída com sucesso
 *       400:
 *         description: O ID informado é inválido.
 *       401:
 *         description: Token ausente ou inválido.
 *       404:
 *         description: Raça não encontrada.
 */
app.delete("/racas/:id", verificarToken, (req, res) => {
  const id = obterId(req, res);

  if (id === null) {
    return;
  }

  const indice = racas.findIndex((raca) => raca.id === id);

  if (indice === -1) {
    return res.status(404).json({
      mensagem: "Raça não encontrada"
    });
  }

  racas.splice(indice, 1);

  res.json({
    mensagem: "Raça excluída com sucesso"
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
>>>>>>> 1a6cbc05290697039bc880bb57d1c4abfbabd3e5:src/data/server.js
