export const barberSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    birthday: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    phone: {
      type: 'string'
    },
    experience: {
      type: 'string'
    },
    experience_year: {
      type: 'number'
    },
    start: {
      type: 'number'
    },
    status: {
      type: 'string'
    },
    image_url: {
      type: 'string'
    }
  },
  required: [
    'id',
    'name',
    'birthday',
    'email',
    'phone',
    'experience',
    'experience_year',
    'start',
    'status',
    'image_url'
  ]
}
