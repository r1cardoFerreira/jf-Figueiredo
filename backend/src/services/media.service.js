const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function createMedia(files, dadosID) {
  const { id, tipo } = dadosID;
  const tasks = files.map((file) => {
    const data = {
      file: file.filename,
      [tipo + 'Id']: id,
    };
    return prisma.media.create({ data });
  });

  await Promise.all(tasks);
}


module.exports = { createMedia};
