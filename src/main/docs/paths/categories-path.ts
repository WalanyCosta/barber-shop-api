export const categoriesPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Categoria'],
    summary: 'Rota para listar todos os serviços',
    responses: {
      200: {
        description: 'sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/schemas/category'
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
