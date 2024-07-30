import { accountSchema, errorSchema, loginParamsSchema, serviceSchema, signupParamsSchema } from './schemes'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  error: errorSchema,
  service: serviceSchema,
  signupParams: signupParamsSchema
}
