import { type Router } from 'express'
import { auth } from '../config/auth'
import adapterRoute from '@/main/adapter/express/express-route-adapter'
import { makeLoadServicesController } from '@/main/factories'
import { makeLoadServiceByIdController } from '../factories/services/load-service-by-id-factory'
import { makeSearchServicesFactory } from '../factories/services/search-services-factory'

export default (router: Router): void => {
  router.get('/services', auth, adapterRoute(makeLoadServicesController()))
  router.get('/services/:id', auth, adapterRoute(makeLoadServiceByIdController()))
  router.get('/services/search', auth, adapterRoute(makeSearchServicesFactory()))
}
