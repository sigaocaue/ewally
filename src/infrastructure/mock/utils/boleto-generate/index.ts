import moment from 'moment'
import faker from 'faker'
import { randomNumbers } from '../random-numbers'
import { getRandom as getBankAccount } from '../bank-account'
import { modulo10, modulo11Bancario } from '@api/boleto/validator'
import { Boleto } from '@infrastructure/database'

export const generate = (): Boleto => {
  const { agency, currentAccount, bankCode } = getBankAccount()

  const addDays = Math.ceil(
    faker.random.number({ min: 1, max: 30, precision: 1 })
  )

  const expirationDate = moment().add(addDays, 'days')
  const dataBase = moment('1997-10-07', 'YYYY-MM-DD')
  const duration = expirationDate.diff(dataBase, 'days')
  const fatorVencimento = String(duration).padStart(4, '0')

  const amount = Number(faker.finance.amount(1, 999, 2))

  const identificacaoBanco = bankCode.padStart(3, '0')
  const codigoMoeda = '9'
  const primeiroCampoLivre = `${agency}`.padStart(5, '0')
  const DVPrimeiroCampo = modulo10(primeiroCampoLivre)

  const segundoCampoLivre = `${randomNumbers(10)}`.padStart(10, '0')
  const DVSegundoCampo = modulo10(segundoCampoLivre)

  const terceiroCampoLivre = `${currentAccount}`.padStart(10, '0')
  const DVTerceiroCampo = modulo10(terceiroCampoLivre)

  const valorNominal = `${String(amount).replace(/[^\d]/, '')}`.padStart(
    10,
    '0'
  )
  const DVGeral = modulo11Bancario(
    `${identificacaoBanco}${codigoMoeda}${primeiroCampoLivre}${DVPrimeiroCampo}${segundoCampoLivre}${DVSegundoCampo}${terceiroCampoLivre}${DVTerceiroCampo}${fatorVencimento}${valorNominal}`
  )

  const digits = `${identificacaoBanco}${codigoMoeda}${primeiroCampoLivre}${DVPrimeiroCampo}${segundoCampoLivre}${DVSegundoCampo}${terceiroCampoLivre}${DVTerceiroCampo}${DVGeral}${fatorVencimento}${valorNominal}`
  const barCode = `${identificacaoBanco}${codigoMoeda}${DVGeral}${fatorVencimento}${valorNominal}${primeiroCampoLivre}${segundoCampoLivre}${terceiroCampoLivre}`

  return {
    digits: digits.substring(0, 47),
    barCode: barCode.substring(0, 44),
    amount,
    expirationDate: expirationDate.format('YYYY-MM-DD'),
  }
}
