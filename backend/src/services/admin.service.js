const { PrismaClient} = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

async function login(password) {
    const admin = await prisma.admin.findFirst();
    if (!admin) throw new Error('Administrador não encontrado');

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new Error('Credenciais inválidas');

    const token = jwt.sign(
        { id: admin.id },
        JWT_SECRET,
        { expiresIn: '2h' }
    );

    return {
        token,
        admin: {
            id: admin.id,
            email: admin.email,
        },
    };
}

module.exports = { login };