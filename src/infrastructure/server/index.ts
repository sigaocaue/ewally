import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import logger from '@infrastructure/logger'
import router from '@infrastructure/router'

export default class Server {
  private static appEnv = process.env.NODE_ENV || 'dev'

  public static async start(): Promise<express.Express> {
    try {
      const app = express()
      app.use(cors())

      app.use(morgan(this.appEnv !== 'production' ? 'dev' : 'combined'))
      app.use(bodyParser.urlencoded({ extended: true }))
      app.use(bodyParser.json())

      await router.loadRoutes(app)
      app.get('/', (req, res) => res.status(200).send())

      return app
    } catch (error) {
      logger.error(error.message, error)
      process.exit()
    }
  }

  public static serverPort(): number {
    return Number.isNaN(Number(process.env.NODE_PORT))
      ? 3500
      : Number(process.env.NODE_PORT)
  }
}
