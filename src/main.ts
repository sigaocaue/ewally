import * as DotEnv from 'dotenv'
import Server from '@infrastructure/server'
import logger from '@infrastructure/logger'
;(async (): Promise<void> => {
  DotEnv.config()
  const server = await Server.start()
  server.listen(Server.serverPort())
  logger.info(`Server has been started at: ${Server.serverPort()}`)
})()
