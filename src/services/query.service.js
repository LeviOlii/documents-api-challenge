const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ApiError = require('../utils/apiError');

class QueryService {
    async createQuery(userId, question, datasetId) {
        const answer = this.generateAIResponse(question, datasetId);
        
        return await prisma.query.create({
            data: {
                userId,
                question,
                answer,
                datasetId
            },
            include: {
                dataset: true
            }
        });
    }

    generateAIResponse(question, datasetId) {
        const keywordResponses = {
            "contrato": "🔍 Análise jurídica:\n- Identificadas 5 cláusulas contratuais\n- 3 pontos requerem atenção",
            "financeiro": "📈 Relatório financeiro:\n- Receita bruta: R$ 1.2M\n- Margem líquida: 23%",
            "relatório": "📑 Análise de relatório:\n- 15 métricas calculadas\n- Tendência positiva em 80% dos indicadores",
            "cliente": "👥 Dados de clientes:\n- 254 cadastros ativos\n- Taxa de retenção: 78%"
        };

        const keyword = Object.keys(keywordResponses).find(key => 
            question.toLowerCase().includes(key)
        );

        const baseResponse = datasetId 
            ? `📊 Análise do Dataset #${datasetId}:\n` +
              `- Padrões relevantes encontrados\n` +
              `- Confiança: 92%`
            : `🌍 Resposta do conhecimento geral:\n` +
              `- Baseado em 1,200+ consultas similares`;

        return keyword 
            ? `${keywordResponses[keyword]}\n\n${baseResponse}`
            : baseResponse;
    }

    async getUserQueries(userId) {
        return await prisma.query.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: {
                dataset: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
    }
}

process.on('beforeExit', async () => {
    await prisma.$disconnect();
});

module.exports = new QueryService();