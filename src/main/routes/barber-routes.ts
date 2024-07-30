import { type Router } from 'express'
import { auth } from '../config/auth'
import adapterRoute from '@/main/adapter/express/express-route-adapter'
import { makeLoadBarberByIdFactory } from '../factories/barber/load-barber-by-id.-factory'

export default (router: Router): void => {
  router.get('/barbers/:id', auth, adapterRoute(makeLoadBarberByIdFactory()))
}
