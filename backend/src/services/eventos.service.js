const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function createEvento(data) {
    return await prisma.eventos.create({ data });
}


async function getAllEvento() {
    return prisma.eventos.findMany({
        where:{estado: 'ativo'}
    });
}

async function getEventoTipo(tipo){
     return prisma.eventos.findMany({
        where:{tipo_E: tipo}
    });
}

async function updateEvento(dadosAtualizados, id){
    const evento = await prisma.eventos.findUnique({
        where:{id:id}
    })

    return prisma.eventos.update({
        where:{id:id},
        data: { 
            data_CE: evento.data_CE,
            ...evento,
            ...dadosAtualizados,
        }
    })
}

module.exports = { createEvento, getAllEvento, getEventoTipo, updateEvento};
