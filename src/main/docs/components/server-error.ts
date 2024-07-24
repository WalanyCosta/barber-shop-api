export const serverError = {
  description: 'Problema no servidor',
  content: {
    'application/json': {
      scheme: {
        $ref: '#/schemas/error'
      }
    }
  }
}
