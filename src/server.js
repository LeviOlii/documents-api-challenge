const app = require('./app');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  server.close(async () => {
    await prisma.$disconnect();
    console.log('Server closed');
  });
});