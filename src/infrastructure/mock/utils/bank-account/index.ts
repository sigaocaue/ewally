import faker from 'faker'

export interface BankAccount {
  bankCode: string
  agency: string
  currentAccount: string
}

export const getRandom = (): BankAccount => {
  const banksAccounts = [
    {
      bankCode: '655',
      agency: '0655',
      currentAccount: '626937',
    },
    {
      bankCode: '260',
      agency: '0001',
      currentAccount: '69255622',
    },
    {
      bankCode: '237',
      agency: '0132',
      currentAccount: '10085780',
    },
    {
      bankCode: '077',
      agency: '0001',
      currentAccount: '12635081',
    },
    {
      bankCode: '077',
      agency: '0001',
      currentAccount: '40859193',
    },
    {
      bankCode: '077',
      agency: '0001',
      currentAccount: '17925673',
    },
  ] as BankAccount[]

  return faker.random.arrayElement(banksAccounts)
}
