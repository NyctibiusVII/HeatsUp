import { Request, Response }       from 'express'
import { AuthenticateUserService } from '../services/AuthenticateUserService'

const SCOPE = 'read:user'
const GITHUB_CLIENT = process.env.GITHUB_CLIENT_ID_NW

class AuthenticateUserController {
    async handle(req: Request, res: Response) {
        const { code, app } = req.body

        const service = new AuthenticateUserService()

        try {
            const result = await service.execute(code, app)

            return res.json(result)
        } catch (err) { return res.json({ Error: err }) }
    }
    async redirectToAuthorize(req: Request, res: Response) {
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT}&scope=${SCOPE}`)
    }
    async signToGithub(req: Request, res: Response) {
        const { code } = req.query

        return res.json(code)
    }
}

export { AuthenticateUserController }