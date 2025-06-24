const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const uploads = require('./media.service');

async function createGaleria(dados, files) {
    const galeria = await prisma.galeria.create({ 
        data:{ 
            label_G: dados.label_G,
        }
      });
    const dadosID = { id: galeria.id, tipo: 'galeria' }
    await uploads.createMedia(files, dadosID);
    return galeria;
}

async function getAllGaleria() {
    return prisma.galeria.findMany({
        include:{media: true}
    });
}

async function deleteGaleriaId(id) {
    const resposta = await prisma.galeria.delete({
        where: { id: id },
    });

    await prisma.media.deleteMany({
        where: {galeriaId: id}
    })

    return resposta;
}


module.exports = {getAllGaleria, createGaleria, deleteGaleriaId};