import "dotenv/config";
import prisma from "../src/config/prisma.js";

const racasIniciais = [
  { nome: "Golden Retriever", origem: "Reino Unido", porte: "Grande", temperamento: "Amigável" },
  { nome: "Labrador Retriever", origem: "Canadá", porte: "Grande", temperamento: "Dócil" },
  { nome: "Pastor Alemão", origem: "Alemanha", porte: "Grande", temperamento: "Leal" },
  { nome: "Beagle", origem: "Reino Unido", porte: "Médio", temperamento: "Brincalhão" },
  { nome: "Poodle", origem: "França", porte: "Médio", temperamento: "Inteligente" },
  { nome: "Bulldog Francês", origem: "França", porte: "Pequeno", temperamento: "Companheiro" }
];

try {
  const totalRacas = await prisma.raca.count();
  if (totalRacas === 0) {
    await prisma.raca.createMany({ data: racasIniciais });
  }
  console.log("Raças iniciais inseridas com sucesso.");
} finally {
  await prisma.$disconnect();
}
