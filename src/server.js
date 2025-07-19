import Register from './auth/register.js'
import Login from './auth/login.js'
import express from 'express'
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express()
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

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
