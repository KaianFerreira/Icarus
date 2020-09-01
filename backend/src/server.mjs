import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'

// Routes

import auth from './routes/config/auth/routes.mjs'

dotenv.config()
console.log(`[${new Date().toLocaleString('pt-br')} Starting Icarus]`)
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())


const router = express.Router()

//routes
router.use('/auth', auth)

app.use('/', router)
app.listen(3000, () => console.log(`Server listening on port ${3000}`))