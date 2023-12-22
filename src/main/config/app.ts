import express from 'express'
import { cors } from '../middlewares/cors'

const app = express()

app.use(cors)

export default app
