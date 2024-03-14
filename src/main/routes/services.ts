import { type Router } from 'express'
import adapterRoute from '../adapter/express/express-route-adapter'
import { makeLoadServicesController } from '../factories/services/load-services-controller-factory'
import { auth } from '../config/auth'

export default (router: Router): void => {
  router.get('/services', auth, adapterRoute(makeLoadServicesController()))
}
