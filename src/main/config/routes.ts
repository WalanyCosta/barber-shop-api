import { type Express, Router } from 'express'
import loginRoutes from '../routes/login/login-routes'
import serviceRoutes from '../routes/services/services'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  loginRoutes(router)
  serviceRoutes(router)
}
