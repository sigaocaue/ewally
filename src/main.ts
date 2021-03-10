import * as DotEnv from 'dotenv'
import Server from '@infrastructure/server'
import logger from '@infrastructure/logger'
;(async (): Promise<void> => {
  DotEnv.config()
  await Server.start()

  logger.info(`Server has been started at: ${Server.serverPort()}`)
})()
