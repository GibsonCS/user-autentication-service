import bcrypt from 'bcrypt'

export const comparePassword = async (sendedPassword, passwordFromDB) => {
    return await bcrypt.compare(sendedPassword, passwordFromDB)
}