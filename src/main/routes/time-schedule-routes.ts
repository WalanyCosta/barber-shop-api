import { type Router } from 'express'
import { makeLoadTimeScheduleFactory } from '@/main/factories'
import { auth } from '../config/auth'
import adapterRoute from '@/main/adapter/express/express-route-adapter'

export default (router: Router): void => {
  router.get(
    '/timeschedules/:barberId/times',
    auth,
    adapterRoute(makeLoadTimeScheduleFactory()),
  )
}
