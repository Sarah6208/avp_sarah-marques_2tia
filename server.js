import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

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

app.get("/racas/:id", (req, res) => {
  const id = Number(req.params.id);

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

app.put("/racas/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = racas.findIndex((raca) => raca.id === id);

  if (indice === -1) {
    return res.status(404).json({
      mensagem: "Raça não encontrada"
    });
  }

  if (!dadosSaoValidos(req.body)) {
    return res.status(400).json({
      mensagem: "Os campos nome, origem, porte e temperamento são obrigatórios"
    });
  }

  racas[indice] = {
    id,
    nome: req.body.nome,
    origem: req.body.origem,
    porte: req.body.porte,
    temperamento: req.body.temperamento
  };

  res.json({
    mensagem: "Raça atualizada com sucesso",
    raca: racas[indice]
  });
});

app.delete("/racas/:id", (req, res) => {
  const id = Number(req.params.id);
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
