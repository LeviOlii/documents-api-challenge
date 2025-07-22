const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const ApiError = require('../utils/apiError');
const { parseCSV } = require('../utils/csvParser');
const { extractTextFromPDF } = require('../utils/pdfParser');

const prisma = new PrismaClient();

class DatasetService {
    async createDataset(userId, name, file) {
        let recordsData = [];

        try {
            if (file.mimetype === 'text/csv') {
                recordsData = await parseCSV(file.path);
            } else if (file.mimetype === 'application/pdf') {
                const text = await extractTextFromPDF(file.path);
                recordsData = [{ data: text, text: text.text }];
                console.log('Dados do PDF extraídos:', recordsData);
                console.log('Resultados da busca:', await prisma.record.findMany());
            } else {
                throw new ApiError(400, 'Invalid file type');
            }
        } catch (error) {
            fs.unlinkSync(file.path); // Cleanup file
            throw error
        }

        const dataset = await prisma.dataset.create({
            data: {
                name,
                userId,
                records: {
                    createMany: {
                        data: recordsData.map((record) => ({
                            data: record.data,
                            text: record.text,
                        })),
                    },
                }

            },
            include: {
                records: true,
            },
        });

        try {
            fs.unlinkSync(file.path);
        } catch (e) {
            console.warn('Error deleting file temporarily:', e.message);
        }


        return dataset;
    }

    async getUserDatasets(userId) {
        return await prisma.dataset.findMany({
            where: { userId },
            include: {
                _count: {
                    select: { records: true },
                },
            },
        });
    }

    async getDatasetRecords(datasetId, userId) {
        const dataset = await prisma.dataset.findFirst({
            where: { id: datasetId, userId },
        });

        if (!dataset) {
            throw new ApiError(404, 'Dataset not found');
        }

        return await prisma.record.findMany({
            where: { datasetId },
        });
    }

    async searchRecords(userId, query) {
        return await prisma.record.findMany({
            where: {
                dataset: { userId },
                text: {
                    contains: query,
                    mode: 'insensitive'
                }
            }
        });
    }


}

process.on('beforeExit', async () => {
    await prisma.$disconnect();
});

module.exports = new DatasetService();