export const extractToken = (token: string) => {
  return token?.split(';')[0].replace('authToken=', '')
}
