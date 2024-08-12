export const unauthorized = {
  description: 'Credenciais inválida',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error',
      },
    },
  },
}
