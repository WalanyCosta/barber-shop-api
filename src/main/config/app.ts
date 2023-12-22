import express from 'express'
import { cors } from '../middlewares/cors'
import { bodyParser } from '../middlewares/body-parser'
import { contentType } from '../middlewares/content-type'

const app = express()

app.use(cors)
app.use(bodyParser)
app.use(contentType)

export default app
