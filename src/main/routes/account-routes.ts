import { type Router } from 'express'
import adapterRoute from '@/main/adapter/express/express-route-adapter'
import { makeLoadAccountByIdFactory } from '../factories/account/load-account-by-id-factory'
import { auth } from '../config/auth'

export default (router: Router): void => {
  router.get('/account', auth, adapterRoute(makeLoadAccountByIdFactory()))
}
