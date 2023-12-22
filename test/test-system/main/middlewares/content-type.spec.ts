import app from '../../../../src/main/config/app'
import request from 'supertest'

describe('Cors Middleware', () => {
  test('should return default content type as json', async () => {
    app.get('/test-content-type', (req, res) => {
      res.send('')
    })
    await request(app)
      .get('/test-content-type')
      .expect('content-type', /json/)
  })
})
