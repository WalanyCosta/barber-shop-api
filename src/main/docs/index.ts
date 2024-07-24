import { loginPath } from './paths/login-path'
import { accountSchema, errorSchema, loginParamsSchema } from './schemes'
import { unauthorized, serverError, badRequest, notFound } from './components'

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
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound
  }
}
