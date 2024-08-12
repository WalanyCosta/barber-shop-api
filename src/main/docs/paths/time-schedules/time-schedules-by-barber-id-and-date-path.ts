export const timeschedulesByBarberIdAndDatePath = {
  get: {
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    tags: ['Horas livres'],
    summary: 'Rota para buscar Todos os barbeiros',
    parameters: [
      {
        in: 'path',
        name: 'barberId',
        required: true,
        schema: {
          type: 'string',
        },
        description: 'Esse é requisitado para buscar horas livres',
      },
      {
        in: 'query',
        name: 'dateSchedule',
        required: true,
        schema: {
          type: 'string',
        },
        description:
          'Esse ID requisitado é do dateSchedule e deve ser de formato iso',
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
                $ref: '#/schemas/time',
              },
            },
          },
        },
      },
      400: {
        $ref: '#/components/badRequest',
      },
      403: {
        $ref: '#/components/forbidden',
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
