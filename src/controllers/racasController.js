import racas from "../data/alunos.js";

export function listarRacas(req, res) {
    res.json(racas);
}

export function obterRaca(req, res) {
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
}