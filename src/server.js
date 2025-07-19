import Register from './auth/register.js'
import Login from './auth/login.js'
import express from 'express'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/api/auth',Register)
app.use('/api/auth',Login)

app.get('/', (_, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
