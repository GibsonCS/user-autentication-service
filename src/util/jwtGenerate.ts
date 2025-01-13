import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const KEY = process.env.JWT_SECRET_KEY
export const generateJWT = (payload: Object) => {
  const options = {
    expiresIn: '1h'
  }
  return jwt.sign(payload, KEY, options)
}
