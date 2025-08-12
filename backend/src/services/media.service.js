const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createMedia(files, dadosID) {
  const { id, tipo } = dadosID;

  if (!files || files.length === 0) {
    return [];
  }

  const whereField = `${tipo}Id`;

  const tasks = files.map(async (file) => {
    
    
    const existente = await prisma.media.findFirst({
      where: { [whereField]: id }
    });

    if (existente) {
      
      return prisma.media.update({
        where: { id: existente.id },
        data: { file: file.filename }
      });
    } else {
      
      return prisma.media.create({
        data: {
          file: file.filename,
          [whereField]: id
        }
      });
    }
  });

  return await Promise.all(tasks);
}


async function createSingleMedia(file, dadosID) {
  const { id, tipo } = dadosID;

  if (!file) return null;

  // Procura media existente pelo campo dinâmico, ex: eventoId = 69
  const existente = await prisma.media.findFirst({
    where: {
      [tipo + "Id"]: id,
    },
  });

  if (existente) {
  
    return await prisma.media.update({
      where: { id: existente.id },  
      data: { file: file.filename },
    });
  } else {
    
    return await prisma.media.create({
      data: {
        file: file.filename,
        [tipo + "Id"]: id,
      },
    });
  }
}

  module.exports = { createMedia, createSingleMedia }
