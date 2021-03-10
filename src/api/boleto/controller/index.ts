import { Request, Response } from 'express'

export default class Controller {
  public get = async (
    request: Request,
    response: Response
  ): Promise<Response | void> => {
    response.status(200).json({ name: 'prado' })
  }
}
