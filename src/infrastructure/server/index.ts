import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import Http from 'http'
import winston from 'winston'

import router from '@infrastructure/router'

export default class Server {
  private static _instance: Http.Server
  private static appEnv = process.env.NODE_ENV || 'dev'

  public static async start(): Promise<Http.Server> {
    try {
      const app = express()
      app.use(cors())

      app.use(morgan(this.appEnv !== 'production' ? 'dev' : 'combined'))
      app.use(bodyParser.urlencoded({ extended: true }))
      app.use(bodyParser.json())

      await router.loadRoutes(app)
      app.listen(this.serverPort())

      this._instance = Http.createServer(express)

      return this._instance
    } catch (error) {
      winston.loggers.get('default').error(error.message, error)
      process.exit()
    }
  }

  public static serverPort(): number {
    return Number.isNaN(Number(process.env.NODE_PORT))
      ? 3500
      : Number(process.env.NODE_PORT)
  }
}
