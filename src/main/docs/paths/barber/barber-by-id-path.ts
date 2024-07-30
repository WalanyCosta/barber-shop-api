export const barberByIdPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Barbeiro'],
    summary: 'Rota para buscar barbeiro por id',
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
              $ref: '#/schemas/barber'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
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
