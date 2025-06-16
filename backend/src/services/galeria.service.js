const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


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



module.exports = {getAllGaleria, createGaleria};