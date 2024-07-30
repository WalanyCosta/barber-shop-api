export const categorySchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    category: {
      type: 'string'
    }
  },
  required: [
    'id',
    'category'
  ]
}
