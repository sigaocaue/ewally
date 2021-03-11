import db from '@infrastructure/database'
import { boletoGenerate } from './utils'
import logger from '@infrastructure/logger'
;(async (): Promise<void> => {
  const { npm_config_quantity: quantityArg = '1' } = process.env as {
    npm_config_quantity?: string
  }

  const quantity = Number.isNaN(Number(quantityArg)) ? 1 : Number(quantityArg)

  logger.info(
    `[MOCK] - Cadastro de ${quantity} boleto${quantity > 1 ? 's' : ''}.`
  )
  for (let i = 0; i < quantity; i++) {
    logger.info(`Cadastrando o boleto número ${i + 1}.`)
    const boleto = boletoGenerate()
    db.get('boletos')
      .push({ ...boleto })
      .write()
  }
})()
