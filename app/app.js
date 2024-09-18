import express from 'express'
import dotenv from 'dotenv'

import { createConnection } from './mongo.js'

import { createAppRouter } from './routes/app.js'

dotenv.config({ path: './env/.env' })

const PORT = process.env.PORT ?? 3000

const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

await createConnection()

app.use('/', createAppRouter())

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`))