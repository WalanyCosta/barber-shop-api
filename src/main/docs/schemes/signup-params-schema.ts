export const signupParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    phone: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  required: ['name', 'email', 'password', 'phone']
}
