const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function createMedia(files, dadosID) {

  const { id, tipo } = dadosID;

  async function createSingle(files)
  {
       const tasks = files.map((file) => {
        const data = {
          file: file.filename,
          [tipo + 'Id']: id,
        };
        return prisma.media.create({ data });
      });
  }

 if(Array.isArray(files))
 {
  const file = files
  await createSingle(files)
 }
 else{
     // const ficheiros = [];//usa-se no assunto
    await createSingle(files) 
  }

  await Promise.all(tasks);
}


module.exports = { createMedia};
