const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/apiError');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET; 

class AuthService {
  async register(name, email, password) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ApiError(400, 'Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }

  async login(email, password) {
    const user = await prisma.user.findUnique({ 
      where: { email },
      select: {
        id: true,
        password: true 
      }
    });
    
    if (!user) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ApiError(401, 'Invalid credentials');
    }

    return jwt.sign(
      { 
        id: user.id,
      }, 
      JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );
  }

  async getMe(userId) {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }
}

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

module.exports = AuthService;