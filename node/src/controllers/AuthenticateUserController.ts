import { Request, Response }       from 'express'
import { AuthenticateUserService } from '../services/AuthenticateUserService'

const SCOPE = 'read:user'

class AuthenticateUserController {
    async handle(req: Request, res: Response) {
        const { code, app } = req.body

        const service = new AuthenticateUserService()

        try {
            const result = await service.execute(code, app)

            return res.json(result)
        } catch (err) { return res.json({ Error: err }) }
    }
    async redirectToAuthorize(request: Request, response: Response) {
        response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=${SCOPE}`)
    }
    async signToGithub(request: Request, response: Response) {
        const { code } = request.query

        return response.json(code)
    }
}

export { AuthenticateUserController }