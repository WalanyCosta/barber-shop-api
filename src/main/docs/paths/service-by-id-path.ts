export const serviceByIdPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Serviço'],
    summary: 'Rota para listar todas as serviços',
    parameters: [{
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'string'
      },
      description: 'Esse ID requisitado é do serviço'
    }],
    responses: {
      200: {
        description: 'sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/service'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
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
