import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
export const jwtDecoded = (token: any) => {
  return jwt.verify(token, `${process.env.JWT_SECRET_KEY || 'hello_world'}`)
}
