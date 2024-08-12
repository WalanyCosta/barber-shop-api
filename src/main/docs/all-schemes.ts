import {
  accountSchema,
  errorSchema,
  loginParamsSchema,
  serviceSchema,
  signupParamsSchema,
  categorySchema,
  barberSchema,
  timeSchema,
} from './schemes'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  error: errorSchema,
  service: serviceSchema,
  signupParams: signupParamsSchema,
  category: categorySchema,
  barber: barberSchema,
  time: timeSchema,
}
