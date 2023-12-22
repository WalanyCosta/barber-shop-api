import express from 'express'
import { cors } from '../middlewares/cors'
import { bodyParser } from '../middlewares/body-parser'

const app = express()

app.use(cors)
app.use(bodyParser)

export default app
