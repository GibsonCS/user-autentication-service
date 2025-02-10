import bcrypt from 'bcrypt'

export const encryptPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10)
}
