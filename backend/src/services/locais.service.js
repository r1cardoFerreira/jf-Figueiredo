const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const uploads = require('./media.service');

async function createLocal(dados, files) {
    const local = await prisma.locais.create({ 
        data:{ 
            nome_L: dados.nome_L,
            latitude: dados.latitude,
            longitude: dados.longitude,
            texto_L: dados.texto_L,
            tipo_L: dados.tipo_L,
        }
      });
    const dadosID = { id: local.id, tipo: 'local' }
    await uploads.createMedia(files, dadosID);
    return local;
}
/*
async function getLocaisTipo(tipo){
     return prisma.locais.findMany({
        where:{tipo_L: tipo},
        include: { media: true }
    });
} */

async function getLocais({ tipo }) {
  return prisma.locais.findMany({
    where: {
      estado: 'ativo',
      ...(tipo && { tipo_L: tipo }) 
    },
    include: { media: true },
  });
}

async function getAllLocais() {
    return prisma.locais.findMany({
        where:{estado: 'ativo'},
        include:{media: true}
    });
}

async function deleteLocalId(id) {
    const resposta = await prisma.locais.delete({
        where: { id: id },
    });

    await prisma.media.deleteMany({
        where: {localId: id}
    })

    return resposta;
}

async function updateLocal(dadosAtualizados, id, files) {

    const localAtualizado = await prisma.locais.update({
        where: { id },
        data: dadosAtualizados
    });
    
    const dadosID = { id: id, tipo: 'local' }
    await uploads.createMedia(files, dadosID); 
    
    return localAtualizado
}


module.exports = {getAllLocais, createLocal, deleteLocalId, /*getLocaisTipo,*/ updateLocal, getLocais};