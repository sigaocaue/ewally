import { Application } from 'express'
import { body, param } from 'express-validator'
import winston from 'winston'

import Controller from '@api/boleto/controller'
import { justNumbersValidator, boletoValidator } from '@api/boleto/validator'
import { RouteInterface } from '@infrastructure/router'

export default class Router implements RouteInterface {
  path = '/boleto'
  controller: Controller

  constructor() {
    this.controller = new Controller()
  }

  public async register(server: Application): Promise<void> {
    try {
      server.get(`${this.path}`, this.controller.find)

      server.get(
        `${this.path}/:barCode`,
        param('barCode')
          .custom(justNumbersValidator)
          .withMessage('A linha digitável deve conter apenas números')
          .custom(boletoValidator)
          .withMessage('O código de barras informado é inválido.'),
        this.controller.get
      )

      server.post(
        `${this.path}`,
        body('digits')
          .custom(justNumbersValidator)
          .withMessage('A linha digitável deve conter apenas números')
          .isLength({ min: 44, max: 48 })
          .optional(true),

        body('barCode')
          .custom(justNumbersValidator)
          .withMessage('A linha digitável deve conter apenas números')
          .custom(boletoValidator)
          .withMessage('O código de barras informado é inválido.'),

        body('amount').isNumeric(),

        body('expirationDate').isDate({
          format: 'YYYY-MM-DD',
          strictMode: true,
        }),
        this.controller.create
      )

      server.put(
        `${this.path}/:barCode`,

        body('digits')
          .custom(justNumbersValidator)
          .withMessage('A linha digitável deve conter apenas números')
          .isLength({ min: 44, max: 48 })
          .optional(true),

        body('barCode')
          .custom(justNumbersValidator)
          .withMessage('A linha digitável deve conter apenas números')
          .custom(boletoValidator)
          .optional(true),

        body('amount').isNumeric().optional(true),

        body('expirationDate')
          .isDate({
            format: 'YYYY-MM-DD',
            strictMode: true,
          })
          .optional(true),

        this.controller.update
      )

      server.delete(
        `${this.path}/:barCode`,
        param('barCode')
          .custom(justNumbersValidator)
          .withMessage('A linha digitável deve conter apenas números')
          .custom(boletoValidator)
          .withMessage('O código de barras informado é inválido.'),
        this.controller.remove
      )
    } catch (e) {
      winston.loggers.get('default').error(e.message, {
        method: 'Router',
        filePath: __dirname,
        endpoint: this.path,
        ...e,
      })
    }
  }
}
