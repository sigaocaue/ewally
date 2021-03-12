import { Application } from 'express'
import * as path from 'path'
import * as glob from 'glob'
import winston from 'winston'

export interface RouteInterface {
  path: string
  register(server: Application): Promise<void>
}

export default class Router {
  public static async loadRoutes(server: Application): Promise<void> {
    const files: string[] = glob.sync(
      path.join(__dirname, '../../api/**/route/index.{js,ts}')
    )

    winston.loggers.get('default').info('Router - Start adding routes')

    for (const file of files) {
      try {
        winston.loggers
          .get('default')
          .info(`Router: Registering the file: ${file}.`)

        const route = await import(file)

        await new route.default().register(server)
      } catch (err) {
        winston.loggers
          .get('default')
          .error(`Router: Can't import file: ${err.message}`)
        throw err
      }
    }
    winston.loggers.get('default').info('Router: Finish adding routes')
  }
}
