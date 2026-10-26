import {
  atualizarRaca,
  buscarRacaPorId,
  criarRaca,
  excluirRaca,
  listarRacas
} from "../data/racas.js";

const camposObrigatorios = ["nome", "origem", "porte", "temperamento"];

function dadosSaoValidos(dados) {
  return dados !== null && typeof dados === "object" && !Array.isArray(dados)
    && camposObrigatorios.every(
      (campo) => typeof dados[campo] === "string" && dados[campo].trim() !== ""
    );
}

function dadosParciaisSaoValidos(dados) {
  if (dados === null || typeof dados !== "object" || Array.isArray(dados)) {
    return false;
  }

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
    res.status(400).json({ mensagem: "O ID deve ser um número inteiro positivo" });
    return null;
  }

  return id;
}

function tratarErro(next, erro) {
  next(erro);
}

export async function listar(req, res, next) {
  try {
    res.json(await listarRacas());
  } catch (erro) {
    tratarErro(next, erro);
  }
}

export async function buscarPorId(req, res, next) {
  const id = obterId(req, res);
  if (id === null) return;

  try {
    const raca = await buscarRacaPorId(id);
    if (!raca) return res.status(404).json({ mensagem: "Raça não encontrada" });
    res.json(raca);
  } catch (erro) {
    tratarErro(next, erro);
  }
}

export async function criar(req, res, next) {
  if (!dadosSaoValidos(req.body)) {
    return res.status(400).json({
      mensagem: "Os campos nome, origem, porte e temperamento são obrigatórios"
    });
  }

  try {
    const raca = await criarRaca(Object.fromEntries(
      camposObrigatorios.map((campo) => [campo, req.body[campo].trim()])
    ));
    res.status(201).json({ mensagem: "Raça cadastrada com sucesso", raca });
  } catch (erro) {
    tratarErro(next, erro);
  }
}

export async function atualizar(req, res, next) {
  const id = obterId(req, res);
  if (id === null) return;

  if (!dadosParciaisSaoValidos(req.body)) {
    return res.status(400).json({
      mensagem: "Informe pelo menos um campo válido para atualização"
    });
  }

  try {
    const existente = await buscarRacaPorId(id);
    if (!existente) return res.status(404).json({ mensagem: "Raça não encontrada" });

    const dados = Object.fromEntries(
      Object.entries(req.body).map(([campo, valor]) => [campo, valor.trim()])
    );
    const raca = await atualizarRaca(id, dados);
    res.json({ mensagem: "Raça atualizada com sucesso", raca });
  } catch (erro) {
    tratarErro(next, erro);
  }
}

export async function excluir(req, res, next) {
  const id = obterId(req, res);
  if (id === null) return;

  try {
    const existente = await buscarRacaPorId(id);
    if (!existente) return res.status(404).json({ mensagem: "Raça não encontrada" });

    await excluirRaca(id);
    res.json({ mensagem: "Raça excluída com sucesso" });
  } catch (erro) {
    tratarErro(next, erro);
  }
}
