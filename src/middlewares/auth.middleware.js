const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/apiError');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new ApiError(401, 'Token não fornecido');
    }

    console.log('Token recebido:', token);
    
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Token decodificado:', decoded); 

    if (!decoded?.id) {
      throw new ApiError(401, 'Estrutura do token inválida');
    }

    const user = await prisma.user.findUnique({ 
      where: { id: decoded.id },
      select: { id: true } 
    });

    if (!user) {
      throw new ApiError(401, 'Usuário não encontrado');
    }

    req.user = { id: user.id };
    next();
  } catch (error) {
    console.error('Erro no middleware:', error.message); 
    next(new ApiError(401, 'Não autorizado: ' + error.message));
  }
};