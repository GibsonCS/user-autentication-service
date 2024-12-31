import jwt from 'jsonwebtoken'
export const jwtDecoded = (token) => {
    return jwt.decode(token)
}