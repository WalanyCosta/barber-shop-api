import {
  accountSchema,
  errorSchema,
  loginParamsSchema,
  serviceSchema,
  signupParamsSchema,
  categorySchema,
  barberSchema
} from './schemes'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  error: errorSchema,
  service: serviceSchema,
  signupParams: signupParamsSchema,
  category: categorySchema,
  barber: barberSchema
}
