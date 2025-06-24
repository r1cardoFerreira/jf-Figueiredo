const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const uploads = require('./media.service');

async function createDocumento(dados, files) {
    const documento = await prisma.documentos.create({ 
        data: {
            data_CE: dados.data_CE,
            tipo_D: dados.tipo_D
        } 
    });
    const dadosID = { id: documento.id, tipo: 'documento' }
    await uploads.createMedia(files, dadosID); 
    return documento;
}

async function getAllDocumento() {
    return prisma.documentos.findMany({
        include: {media: true}
    });
}

async function getDocumentoTipo(tipo){
     return prisma.documentos.findMany({
        where:{tipo_D: tipo},
        include: {media: true}
    });
}

async function deleteDocumentosId(id) {
    const resposta = await prisma.documentos.delete({
        where: { id: id },
    });

    await prisma.media.deleteMany({
        where: {documentoId: id}
    })

    return resposta;
}

module.exports = { getDocumentoTipo, getAllDocumento, createDocumento, deleteDocumentosId};
