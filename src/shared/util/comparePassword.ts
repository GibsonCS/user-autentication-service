import bcrypt from 'bcrypt'

export const comparePassword = async (
  sendedPassword: string,
  passwordFromDB: string
): Promise<boolean> => {
  return await bcrypt.compare(sendedPassword, passwordFromDB)
}
