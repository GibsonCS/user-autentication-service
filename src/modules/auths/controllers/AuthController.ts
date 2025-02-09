// import { FastifyRequest, FastifyReply } from 'fastify'
// import { LoginInput, loginSchema } from '../../auths/schemas/authSchema.js'
// import { jwtDecoded } from '../../../shared/util/jwtDecode.js'
// import { AuthService } from '../services/AuthService.js'

// const authService = new AuthService()
// class AuthController {
//   async checkAuth(request: FastifyRequest, repply: FastifyReply) {
//     try {
//       const token = request.cookies?.authToken
//       if (!token) {
//         return repply.status(401).send({ message: 'Unauthorized' })
//       }

//       const decodedToken: any = jwtDecoded(token)

//       if (!decodedToken) {
//         return repply.status(401).send({ message: 'Unauthorized: invalid token' })
//       }

//       repply.send({
//         username: decodedToken.username,
//         roles: decodedToken.roles,
//       })
//     } catch (error) {
//       console.error(error)
//       throw new Error('Unauthorized')
//     }
//   }

// export default AuthController
