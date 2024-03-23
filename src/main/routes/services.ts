import { type Router } from 'express'
import { auth } from '../config/auth'
import adapterRoute from '@/main/adapter/express/express-route-adapter'
import { makeLoadServicesController } from '@/main/factories'

export default (router: Router): void => {
  router.get('/services', auth, adapterRoute(makeLoadServicesController()))
}
