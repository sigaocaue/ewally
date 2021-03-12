import { Request, Response } from 'express'
import db from '@infrastructure/database'

export default class Controller {
  public find = async (
    request: Request,
    response: Response
  ): Promise<Response | void> => {
    const body = db.get('boletos').value()
    response.status(200).json(body)
  }

  public get = async (
    request: Request,
    response: Response
  ): Promise<Response | void> => {
    const { barCode } = request.params as { barCode: string }

    const body = db
      .get('boletos')
      .find({
        barCode,
      })
      .value()

    response.status(200).json(body)
  }

  public create = async (
    request: Request,
    response: Response
  ): Promise<Response | void> => {
    const boleto = request.body

    const exists = db
      .get('boletos')
      .find({
        barCode: boleto.barCode,
      })
      .value()

    if (exists) {
      return response.status(402).json('Boleto já cadastrado')
    }

    db.get('boletos').push(boleto).write()
    response.status(201).json(boleto)
  }

  public update = async (
    request: Request,
    response: Response
  ): Promise<Response | void> => {
    const { barCode } = request.params as { barCode: string }
    const boleto = request.body

    const body = db
      .get('boletos')
      .find({
        barCode,
      })
      .assign(boleto)
      .write()

    response.status(200).json(body)
  }

  public remove = async (
    request: Request,
    response: Response
  ): Promise<Response | void> => {
    const { barCode } = request.params as { barCode: string }

    const body = db.get('boletos').remove({ barCode }).write()

    response.status(202).json(body)
  }
}
