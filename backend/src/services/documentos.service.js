const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function createDocumento(data) {
    return await prisma.eventos.create({ data });
}


async function getAllDocumento() {
    return prisma.eventos.findMany();
}

async function getDocumentoTipo(tipo){
     return prisma.eventos.findMany({
        where:{tipo_D: tipo}
    });
}


module.exports = { getDocumentoTipo, getAllDocumento, createDocumento};
