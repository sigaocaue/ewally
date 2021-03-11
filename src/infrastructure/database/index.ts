import lowdb, { LowdbSync } from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

export interface Boleto {
  digits: string
  barCode: string
  amount: number
  expirationDate: string
}

type Schema = {
  boletos: Boleto[]
}

const adapter = new FileSync<Schema>('db.json')
const db = lowdb(adapter) as LowdbSync<Schema>
db.defaults({ boletos: [] }).write()

export default db
