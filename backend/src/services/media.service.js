const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function createMedia(files, dadosID) {
  const { id, tipo } = dadosID;

  
  if (!files || files.length === 0) {
    return [];
  }

  const tasks = files.map((file) => {
    const data = {
      file: file.filename,
      [tipo + 'Id']: id,
    };
    return prisma.media.create({ data });
  });

  return await Promise.all(tasks);
}


async function createSingleMedia(file, dadosID) {
  const { id, tipo } = dadosID;

  if (!file) {
    return null;
  }

  const data = {
    file: file.filename,
    [tipo + 'Id']: id,
  };

  return await prisma.media.create({ data });
}



module.exports = { createMedia, createSingleMedia};
