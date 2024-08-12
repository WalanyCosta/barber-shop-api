export const timeSchema = {
  type: 'object',
  properties: {
    time: {
      type: 'string',
    },
    disabled: {
      type: 'boolean',
    },
  },
  required: ['time', 'disabled'],
}
