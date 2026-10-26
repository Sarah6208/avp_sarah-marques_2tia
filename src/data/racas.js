<<<<<<< HEAD
import prisma from "../config/prisma.js";

export function listarRacas() {
  return prisma.raca.findMany({ orderBy: { id: "asc" } });
}

export function buscarRacaPorId(id) {
  return prisma.raca.findUnique({ where: { id } });
}

export function criarRaca(dados) {
  return prisma.raca.create({ data: dados });
}

export function atualizarRaca(id, dados) {
  return prisma.raca.update({ where: { id }, data: dados });
}

export function excluirRaca(id) {
  return prisma.raca.delete({ where: { id } });
}
=======
const racas = [
    { id: 1, nome: "Humano" },
    { id: 2, nome: "Elfo" },
    { id: 3, nome: "Anão" },
    { id: 4, nome: "Orc" },
    { id: 5, nome: "Goblin" },
    { id: 6, nome: "Troll" },
    { id: 7, nome: "Dragão" },
    { id: 8, nome: "Fada" }
]
>>>>>>> 1a6cbc05290697039bc880bb57d1c4abfbabd3e5
