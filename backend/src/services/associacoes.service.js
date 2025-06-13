const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function createAssociacao(data) {
    return await prisma.associacoes.create({ data });
}


async function getAllAssociacao() {
    return prisma.associacoes.findMany();
}


module.exports = {createAssociacao, getAllAssociacao};