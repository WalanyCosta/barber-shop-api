import paths from './all-paths'
import schemas from './all-schemes'
import components from './all-components'
import { apiKeyAuthSchema } from './schemes'

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
    { name: 'Serviço' },
    { name: 'Categoria' },
    { name: 'Barbeiro' }
  ],
  paths,
  schemas,
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    ...components
  }
}
