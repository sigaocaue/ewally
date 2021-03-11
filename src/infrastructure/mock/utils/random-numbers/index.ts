import faker from 'faker'

export const randomNumbers = (
  length: number,
  options?: { min?: number; max?: number }
): string => {
  if (length > 0 && length < 20) {
    const { min = 0, max = 9 } = options || {}
    let result: string

    for (let i = 0; i < length; i++) {
      const random = faker.random.number({ min, max })
      result = `${result || ''}${random}`
    }
    return result
  }

  return ''
}
