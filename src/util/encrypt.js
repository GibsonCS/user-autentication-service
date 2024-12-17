import bcrypt from 'bcrypt'

export const encryptPassword = (password) => {
    return bcrypt.hash(password, 10)
}
