const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const uploads = require('./media.service');


async function createEvento(dados, files) {
   const evento = await prisma.eventos.create({
    data: {
      titulo_E: dados.titulo_E,
      texto_E: dados.texto_E,
      tipo_E: dados.tipo_E,
      data_E: dados.data_E
    }
  });
  const dadosID = { id: evento.id, tipo: 'evento' }
  await uploads.createMedia(files, dadosID); 
  return evento;
}


async function getAllEvento() {
    return prisma.eventos.findMany({
        where:{estado: 'ativo'},
        include: { media: true }
    });
    
}

async function getEventoTipo(tipo){
     return prisma.eventos.findMany({
        where:{tipo_E: tipo},
        include: { media: true }
    });
}

async function getEventoId(id) {
  return prisma.eventos.findUnique({
    where: { id: id },
    include: {media: true }
  });
}

async function updateEvento(dadosAtualizados, id, files) {
    
    const eventoAtualizado = await prisma.eventos.update({
        where: { id },
        data: dadosAtualizados
    });
    
    if (files && files.length > 0) {
    const dadosID = { id: id, tipo: 'evento' };
    await uploads.createMedia(files, dadosID); 
    }
    
    return eventoAtualizado;
}

async function deleteEventoId(id) {
  const resposta = await prisma.eventos.delete({
      where: { id: id },
  });

  await prisma.media.deleteMany({
      where: {eventoId: id}
  })

  return resposta;
}

async function getMaxSeisEventos() {
  const eventos = await prisma.eventos.findMany({
    where: { estado: 'ativo' },
    include: { media: true },
    orderBy: { data_E: 'desc' }, 
    take: 6                       
  });

  return eventos;
}





module.exports = { createEvento, getAllEvento, getEventoTipo, updateEvento, getEventoId, deleteEventoId, getMaxSeisEventos};
