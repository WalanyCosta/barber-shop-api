import { loginPath, serviceByIdPath, servicesPath, signupPath } from './paths'
import { accountSchema, apiKeyAuthSchema, signupParamsSchema, errorSchema, loginParamsSchema, serviceSchema } from './schemes'
import { unauthorized, serverError, badRequest, notFound, forbidden } from './components'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Barber Shop (API)',
    description: 'API que fornece os serviços de agendar e fazer pagamentos aos clientes de uma determinada instituição.',
    version: '1.0.0'
  },
  license: {
    name: 'MIT',
    url: 'https://opensource.org/license/mit'
  },
  servers: [
    { url: 'http://localhost:5555/api', description: 'DEV' }
  ],
  tags: [
    { name: 'Login' },
    { name: 'Serviço' }
  ],
  paths: {
    '/login': loginPath,
    '/services': servicesPath,
    '/signup': signupPath,
    '/service/{id}': serviceByIdPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema,
    service: serviceSchema,
    signupParams: signupParamsSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden
  }
}
