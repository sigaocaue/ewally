import * as winston from 'winston'
import * as DotEnv from 'dotenv'
import moment from 'moment'

DotEnv.config()
const consoleLevel = process.env.LOG_LEVEL || 'debug'

const optionsDefault = {
  level: consoleLevel,
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint(),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf(
          (info) =>
            `${moment(info.timestamp)
              .utcOffset('America/Sao_Paulo')
              .format('DD/MM/YYYY HH:mm:ss')} [${info.level}]: ${info.message}`
        )
      ),
    }),
  ],
} as winston.LoggerOptions

winston.loggers.add('default', optionsDefault)

export default winston.loggers.get('default')
