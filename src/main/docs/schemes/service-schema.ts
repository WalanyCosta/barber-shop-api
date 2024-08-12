export const serviceSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    service: {
      type: 'string',
    },
    price: {
      type: 'number',
    },
    start: {
      type: 'number',
    },
    status: {
      type: 'number',
    },
    category: {
      type: 'string',
    },
    discount: {
      type: 'number',
    },
    duraction: {
      type: 'number',
    },
  },
  required: [
    'service',
    'price',
    'start',
    'status',
    'category',
    'discount',
    'duraction',
  ],
}
