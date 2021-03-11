import { Request, Response, NextFunction } from 'express'
import boom from '@hapi/boom'

export const justNumbers = async (
  request: Request<{ barCode: string }>,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const regex = /^[0-9]{44}$/
  if (regex.test(String(request.params.barCode)) === false) {
    response
      .status(boom.badRequest().output.statusCode)
      .json(
        boom.badRequest(
          'O código de barras deve conter apenas números e 44 dígitos.'
        )
      )
  }

  return next()
}

export const boleto = async (
  request: Request<{ barCode: string }>,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { barCode } = request.params
  let barCodeValidation: boolean

  if (Number(barCode[0]) === 8) {
    barCodeValidation = boletoArrecadacao(barCode)
  } else {
    barCodeValidation = boletoBancario(barCode)
  }

  if (barCodeValidation === false) {
    response
      .status(boom.badRequest().output.statusCode)
      .json(boom.badRequest('O código de barras informado é inválido.'))
  }

  return next()
}

const boletoArrecadacao = (cod: string): boolean => {
  const coinCode = Number(cod[2])
  const DV = Number(cod[3])
  const bloco = cod.substring(0, 3) + cod.substring(4)

  let modulo

  if (coinCode === 6 || coinCode === 7) modulo = modulo10
  else if (coinCode === 8 || coinCode === 9) modulo = modulo11Arrecadacao
  else return false

  return modulo(bloco) === DV
}

const boletoBancario = (cod: string): boolean => {
  const DV = cod[4]
  const bloco = cod.substring(0, 4) + cod.substring(5)
  return modulo11Bancario(bloco) === Number(DV)
}

export const modulo10 = (bloco: string): number => {
  const digits = bloco.split('').reverse()
  const summation = digits.reduce((acc, current, index) => {
    let sum = Number(current) * (((index + 1) % 2) + 1)
    sum = sum > 9 ? Math.trunc(sum / 10) + (sum % 10) : sum
    return acc + sum
  }, 0)
  return Math.ceil(summation / 10) * 10 - summation
}

const modulo11Arrecadacao = (bloco: string): number => {
  const digits = bloco.split('').reverse()
  let multiplier = 2

  const summation = digits.reduce((acc: number, current: string) => {
    const sum = Number(current) * multiplier
    multiplier = multiplier === 9 ? 2 : multiplier + 1
    return acc + sum
  }, 0)

  const modulus = summation % 11

  if (modulus === 0 || modulus === 1) {
    return 0
  }

  if (modulus === 10) {
    return 1
  }

  return 11 - modulus
}

export const modulo11Bancario = (bloco: string): number => {
  const digits = bloco.split('').reverse()
  let multiplier = 2

  const summation = digits.reduce((acc: number, current: string) => {
    const sum = Number(current) * multiplier
    multiplier = multiplier === 9 ? 2 : multiplier + 1
    return acc + sum
  }, 0)

  const modulus = summation % 11
  const DV = 11 - modulus

  if (DV === 0 || DV === 10 || DV === 11) {
    return 1
  }

  return DV
}
