export const serviceSearchPath = {
  get: {
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    tags: ['Serviço'],
    summary: 'Rota para listar todas as serviços',
    parameters: [
      {
        in: 'query',
        name: 'typeQuery',
        required: true,
        schema: {
          type: 'string',
          enum: ['service', 'category'],
        },
        description:
          'Esse typeQuery é propriedade para escolher o tipo de filtro',
      },
      {
        in: 'query',
        name: 'query',
        required: true,
        schema: {
          type: 'string',
        },
        description:
          'Esse query é valor do filtro ou que se pretende pesquisar',
      },
    ],
    responses: {
      200: {
        description: 'sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/schemas/service',
              },
            },
          },
        },
      },
      400: {
        $ref: '#/components/badRequest',
      },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
}
