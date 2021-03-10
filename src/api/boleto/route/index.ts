import { Application } from 'express'
import winston from 'winston'

import Controller from '@api/boleto/controller'
import { justNumbers, boleto } from '@api/boleto/validator'
import { RouteInterface } from '@infrastructure/router'

export default class Router implements RouteInterface {
  path = '/boleto'
  controller: Controller
  constructor() {
    this.controller = new Controller()
  }

  public async register(server: Application): Promise<void> {
    try {
      server.get(
        `${this.path}/:barCode`,
        justNumbers,
        boleto,
        this.controller.get
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
