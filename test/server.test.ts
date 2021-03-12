import request from 'supertest'
import Server from '@infrastructure/server'

test('Deve responder na raiz', async (done) => {
  const server = await Server.start()
  const response = await request(server).get('/')
  expect(response.status).toBe(200)

  done()
})
