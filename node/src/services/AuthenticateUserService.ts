import 'dotenv/config'
import axios from 'axios'
import { sign }   from 'jsonwebtoken'
import { prisma } from '../utils/prisma'

interface IAccessTokenResponse {
    access_token: string
}
interface IUserResponse {
    avatar_url: string
    login:      string
    id:         number
    name:       string
}

class AuthenticateUserService {
    async execute(code: string) {
        const url = "https://github.com/login/oauth/access_token"

        const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
            params: {
                client_id:     process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            },
            headers: {
                Accept: "application/json"
            }
        })

        try {
            var userResponse = await axios.get<IUserResponse>("https://api.github.com/user", {
                headers: { authorization: `Bearer ${accessTokenResponse.access_token}` }
            })
        } catch (err) {
            console.error(`
                Token: ${accessTokenResponse.access_token}
                Response: ${userResponse}
                Error: ${err.message}
            `)
        }

        const { avatar_url, login, id, name }: IUserResponse = userResponse.data

        let user = await prisma.user.findFirst({ where: { github_id: id } })
        if(!user){
            user = await prisma.user.create({
                data: {
                    avatar_url,
                    login,
                    github_id: id,
                    name
                }
            })
        }

        const token = sign(
        {
            user: {
                avatar_url: user.avatar_url,
                id:         user.id,
                name:       user.name
            }
        },
        process.env.JWT_SECRET,
        {
            subject: user.id,
            expiresIn: '1d'
        })

        return { token, user }
    }
}

export { AuthenticateUserService }