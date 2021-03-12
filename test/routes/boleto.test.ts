import request from 'supertest'
import Server from '@infrastructure/server'
import db from '@infrastructure/database'
import { Boleto } from '@infrastructure/database'

describe('Rota de Boletos', () => {
  const barCode = '00193373700000001000500940144816060680935031'
  db.get('boletos').remove({ barCode }).write()

  test('Deve cadastrar um boleto', async (done) => {
    const server = await Server.start()
    const data: Boleto = {
      digits: '00190500954014481606906809350314337370000000100',
      barCode,
      amount: 1,
      expirationDate: '2007-12-31',
    }

    const response = await request(server).post('/boleto').send(data)

    expect(response.status).toBe(201)
    expect((response.body as Boleto).amount).toBe(1)
    expect((response.body as Boleto).barCode.length).toBe(44)

    done()
  })

  test('Deve listar todos os boletos', async (done) => {
    const server = await Server.start()
    const response = await request(server).get('/boleto')

    expect(response.status).toBe(200)

    done()
  })

  test('Deve obter o boleto', async (done) => {
    const server = await Server.start()
    const { status, body } = await request(server).get(`/boleto/${barCode}`)

    expect(status).toBe(200)
    expect(body).toHaveProperty('barCode')
    done()
  })

  test('Deve atualizar o boleto', async (done) => {
    const server = await Server.start()
    const { status, body } = await request(server)
      .put(`/boleto/${barCode}`)
      .send({
        amount: 10.9,
      })

    expect(status).toBe(200)
    expect(body).toHaveProperty('amount')
    expect((body as Boleto).amount).toBe(10.9)
    done()
  })

  test('Deve remover o boleto', async (done) => {
    const server = await Server.start()
    const { status } = await request(server).delete(`/boleto/${barCode}`)

    expect(status).toBe(202)
    done()
  })
})
