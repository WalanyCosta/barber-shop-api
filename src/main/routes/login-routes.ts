import { type Router } from 'express'
import { makeSignUpController, makeLoginController } from '@/main/factories'
import adapterRoute from '@/main/adapter/express/express-route-adapter'

export default (router: Router): void => {
  router.post('/login', adapterRoute(makeLoginController()))
  router.post('/signup', adapterRoute(makeSignUpController()))
}
