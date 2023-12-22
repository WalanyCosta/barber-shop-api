import { type Express, Router } from 'express'
import signupRoute from '../routes/signup/signup-routes'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  signupRoute(router)
}
