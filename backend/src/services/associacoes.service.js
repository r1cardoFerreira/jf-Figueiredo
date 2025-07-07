const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const uploads = require('./media.service');

async function createAssociacao(dados, file) {
    const associacao = await prisma.associacoes.create({ 
        data:{ 
            nome_A: dados.nome_A,
            texto_A: dados.texto_A,
        }
      });
    const dadosID = { id: associacao.id, tipo: 'associacao' }
    await uploads.createSingleMedia(file, dadosID);
    return associacao;
}


async function getAssociacaoId(id) {
    return prisma.associacoes.findMany({
        where: { id: id },
        include:{media: true}
    });
}

async function getAllAssociacao() {
    return prisma.associacoes.findMany({
        include:{media: true}
    });
}

async function deleteAssociacaoId(id) {
    const resposta = await prisma.associacoes.delete({
        where: { id: id },
    });

    await prisma.media.deleteMany({
        where: {associacaoId: id}
    })

    return resposta;
}



module.exports = {createAssociacao, getAllAssociacao, getAssociacaoId, deleteAssociacaoId};