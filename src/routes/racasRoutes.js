import { Router } from "express";
import autenticar from "../middleware/autenticar.js";
import {
  atualizar,
  buscarPorId,
  criar,
  excluir,
  listar
} from "../controllers/racasController.js";

const router = Router();

/**
 * @swagger
 * /racas:
 *   get:
 *     summary: Lista todas as raças
 *     tags: [Raça]
 *     responses:
 *       200:
 *         description: Lista de raças retornada com sucesso.
 */
router.get("/", listar);

/**
 * @swagger
 * /racas/{id}:
 *   get:
 *     summary: Busca uma raça pelo ID
 *     tags: [Raça]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Raça encontrada com sucesso.
 *       400:
 *         description: O ID informado é inválido.
 *       404:
 *         description: Raça não encontrada.
 */
router.get("/:id", buscarPorId);

/**
 * @swagger
 * /racas:
 *   post:
 *     summary: Cadastra uma nova raça
 *     description: É necessário enviar um Bearer Token.
 *     tags: [Raça]
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
 *       400:
 *         description: Dados inválidos.
 *       401:
 *         description: Token ausente ou inválido.
 */
router.post("/", autenticar, criar);

/**
 * @swagger
 * /racas/{id}:
 *   patch:
 *     summary: Atualiza parcialmente uma raça
 *     description: É necessário enviar um Bearer Token.
 *     tags: [Raça]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
router.patch("/:id", autenticar, atualizar);

/**
 * @swagger
 * /racas/{id}:
 *   delete:
 *     summary: Exclui uma raça
 *     description: É necessário enviar um Bearer Token.
 *     tags: [Raça]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Raça excluída com sucesso.
 *       400:
 *         description: O ID informado é inválido.
 *       401:
 *         description: Token ausente ou inválido.
 *       404:
 *         description: Raça não encontrada.
 */
router.delete("/:id", autenticar, excluir);

export default router;
