import { UserInput } from "./schemas/userSchema.js"
import { UserService } from "./services/UserService.js"

const userService = new UserService()
export const seed = async () => {
    const user: UserInput = {
        username: "teste",
        password: "teste",
        email: "teste@teste.com"
    }
  await userService.create(user)
}