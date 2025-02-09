import bcrypt from 'bcrypt'

export const comparePassword = async (sendedPassword: string, passwordFromDB: string) => {
  return await bcrypt.compare(sendedPassword, passwordFromDB)
}
