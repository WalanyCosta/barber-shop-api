export const servicesPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Serviço'],
    summary: 'Rota para listar todas as serviços',
    responses: {
      200: {
        description: 'sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/schemas/service'
              }
            }
          }
        }
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
