import app from '@/main/config/app'
import request from 'supertest'

describe('Cors Middleware', () => {
  test('should enable cors', async () => {
    app.get('/test-cors', (req, res) => {
      res.send()
    })
    await request(app).get('/test-cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
