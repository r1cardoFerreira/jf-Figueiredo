const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cron = require('node-cron');

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

    if (SRAntigos.length === 0) {
    return;
    }
    
    for(SR of SRAntigos)
    {
        await deleteSugestoes_ReclamacoesId(SR.id)
    }
}

async function delPatchEventos()
{
    const dataLimiteDel = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000); 
    const dataLimitePatch =new Date(Date.now())

    const EventosOcorridos = await prisma.eventos.findMany({
        where: {
            data_E: {
            lt: dataLimitePatch,
            },
        },
    });

    const EventosAntigos = await prisma.eventos.findMany({
        where: {
            data_E: {
                lt:dataLimiteDel,
            },
        },
    });
    
    if (EventosAntigos && EventosAntigos.length > 0) {

        for(evento of EventosAntigos)
        {
            await /* falta fazer o del */ (evento.id)
        }

    }

    if (EventosOcorridos && EventosOcorridos.length > 0) {

        for(evento of EventosAntigos)
        {
            await updateEvento({ estado: 'INATIVO' }, evento.id );
        }

    }
}
    
   
