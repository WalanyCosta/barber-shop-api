import { type Router } from 'express'
import { makeLoginController } from '../../factories/login/login-controller-factory'
import adapterRoute from '../../adapter/express/express-route-adapter'
import { makeSignUpController } from '../../factories/signup/signup-controller-factory'

export default (router: Router): void => {
  router.post('/login', adapterRoute(makeLoginController()))
  router.post('/signup', adapterRoute(makeSignUpController()))
}
