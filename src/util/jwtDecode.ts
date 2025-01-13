import jwt from 'jsonwebtoken'
export const jwtDecoded = (token: any) => {
  return jwt.decode(token)
}
