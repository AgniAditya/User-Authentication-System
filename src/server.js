import Register from './auth/register.js'
import Login from './auth/login.js'
import express from 'express'
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cors({ origin: '*' }));
app.use(express.json())
app.use('/api/auth',Register)
app.use('/api/auth',Login)

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
})

app.get('/register', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'register.html'));
});

app.get('/login', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

app.get('/db', async (_, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true }
  });
  res.json(users);
});


app.get('/db-full', async (_req, res) => {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
