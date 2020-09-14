import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

// Routes

import auth from './routes/config/auth/routes.mjs'
import note from './routes/note/routes.mjs'
import user from './routes/user/routes.mjs'

console.log(`[${new Date().toLocaleString('pt-br')} Starting Icarus]`)
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())


const router = express.Router()

//routes
router.use('/auth', auth)
router.use('/note', note)
router.use('/user', user)
app.use('/', router)

app.use('/data', express.static(process.env.FOLDER_DATA))
app.listen(process.env.PORT || 3000, () => console.log(`Server listening on port ${process.env.PORT || 3000}`))