import 'dotenv/config'
import prisma from '../infra/db/prisma/helpers/client'

const port = process.env.PORT
prisma.$connect().then(async () => {
  const app = (await import('./config/app')).default
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
  })
}).catch((error) => { console.log(error) })
