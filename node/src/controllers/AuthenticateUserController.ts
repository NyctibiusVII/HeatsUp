import { Request, Response }       from 'express'
import { AuthenticateUserService } from '../services/AuthenticateUserService'

class AuthenticateUserController {
    async handle(req: Request, res: Response) {
        const { code } = req.body
        if(!code) return res.status(401)

        const service = new AuthenticateUserService()
        const result = await service.execute(code)

        return res.status(200).json(result)
    }
}

export { AuthenticateUserController }