import { type Express, Router } from 'express'
import signupRoute from '../routes/signup/signup-routes'
import loginRoutes from '../routes/login/login-routes'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  loginRoutes(router)
  signupRoute(router)
}
