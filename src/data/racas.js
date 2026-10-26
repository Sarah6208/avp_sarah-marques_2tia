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
