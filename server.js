import express from "express";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();
const port = 3000;

app.use(express.json());

function verificarToken(req, res, next) {
  const token = req.headers.authorization;

  if (token !== `Bearer ${process.env.API_TOKEN}`) {
    return res.status(401).json({
      mensagem: "Token ausente ou inválido"
    });
  }

  next();
}


const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Raças de Cachorro",
      version: "1.0.0",
      description: "API com raças de cachorro para consultar."
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "API com raças de cachorro para consultar."
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          description: "Informe o token no formato: Bearer SEU_TOKEN"
        }
      }
    }
  },
  apis: ["./server.js"]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

app.get("/", (req, res) => {
  res.json({
    mensagem: "API funcionando!",
    projeto: "Catálogo de raças de cachorro",
    informacao: "API REST para cadastro e consulta de raças de cachorro"
  });
});

app.get("/racas", (req, res) => {
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

app.get("/racas/:id", (req, res) => {
  const id = obterId(req, res);

  if (id === null) {
    return;
  }

  const raca = racas.find((raca) => raca.id === id);

  if (!raca) {
    return res.status(404).json({
      mensagem: "Raça não encontrada"
    });
  }

  res.json(raca);
});

app.post("/racas", (req, res) => {
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
  });
});

/**
 * @swagger
 * /racas:
 *   post:
 *     summary: Cadastra uma nova raça
 *     description: Cadastra uma raça de cachorro. É necessário enviar um Bearer Token.
 *     tags:
 *       - Raça
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             nome: Golden Retriever
 *             origem: Reino Unido
 *             porte: Grande
 *             temperamento: Amigável
 *     responses:
 *       201:
 *         description: Raça cadastrada com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Raça cadastrada com sucesso
 *               raca:
 *                 id: 7
 *                 nome: Golden Retriever
 *                 origem: Reino Unido
 *                 porte: Grande
 *                 temperamento: Amigável
 *       400:
 *         description: Um ou mais campos obrigatórios não foram informados.
 *       401:
 *         description: Token ausente ou inválido.
 */

/**
 * @swagger
 * /racas/{id}:
 *   patch:
 *     summary: Atualiza parcialmente uma raça
 *     description: Atualiza um ou mais dados de uma raça de cachorro. É necessário enviar um Bearer Token.
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             temperamento: Muito amigável
 *     responses:
 *       200:
 *         description: Raça atualizada com sucesso.
 *       400:
 *         description: O ID ou os dados informados são inválidos.
 *       401:
 *         description: Token ausente ou inválido.
 *       404:
 *         description: Raça não encontrada.
 */
app.patch("/racas/:id", (req, res) => {
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
app.delete("/racas/:id", (req, res) => {
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
