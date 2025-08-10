const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const {deleteEventoId, updateEvento} = require('./eventos.service');
const {deleteSugestoes_ReclamacoesId} = require('./sugestoes_reclamacoes.service');
const {deleteDocumentosId} = require('./documentos.service');

async function delSRAntigos()
{
    const dataLimite = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000); 
    const SRAntigos = await prisma.sugestoes_reclamacoes.findMany({
        where: {
            data_CSR: {
            lt: dataLimite,
            },
        },
    });

    if (SRAntigos.length === 0) return;
    
    for(const SR of SRAntigos)
    {
        await deleteSugestoes_ReclamacoesId(SR.id)
    }
}

async function delPatchEventos() {
  const dataLimiteDel = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000); 
  const dataLimitePatch = new Date(); 

  const eventosDelPatch = await prisma.eventos.findMany({
    where: {
      data_E: {
        lt: dataLimitePatch,
      },
    },
  });

  if (eventosDelPatch.length === 0) return;

    for (const evento of eventosDelPatch) {

      if (evento.data_E < dataLimiteDel) {
        await deleteEventoId(evento.id); 
        continue;
      } 
      if (evento.estado === 'ativo') {
        await updateEvento({ estado: 'inativo' }, evento.id); 
      }

    }

}

async function delDocumentos()
{
    const umMes = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); 
    const seisMeses = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000); 

    const documentosAntigos = await prisma.documentos.findMany({
        where: {
            OR: [
                {
                    AND: [
                        { tipo_D: { in: ['atas', 'plano_de_atividades', 'avisos', 'editais'] } },
                        { data_CD: { lt: umMes } }
                    ]
                },
                {
                    AND: [
                        { tipo_D: { in: ['regulamentos', 'relatorios_de_contas','outro'] } },
                        { data_CD: { lt: seisMeses } }
                    ]
                }
            ]
        }
    });

    if (documentosAntigos.length === 0) return;

    for(const documento of documentosAntigos)
    {
        await deleteDocumentosId(documento.id)
    }
  
}


module.exports = {delSRAntigos,delPatchEventos,delDocumentos};



   
