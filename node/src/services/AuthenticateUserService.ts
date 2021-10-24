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
    async execute(code: string, app: string) {
        const url = "https://github.com/login/oauth/access_token"

        let accessToken: string

        // const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
            // params: {
                // client_id:     process.env.GITHUB_CLIENT_ID,
                // client_secret: process.env.GITHUB_CLIENT_SECRET,
                // code
            // },
            // headers: {
                // Accept: "application/json"
            // }
        // })

        console.log('Requisição vindo de: ', app)

        if (app === 'web') {
            const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
                params: {
                    client_id:     process.env.GITHUB_CLIENT_ID_WEB,
                    client_secret: process.env.GITHUB_CLIENT_SECRET_WEB,
                    code
                },
                headers: { "Accept": "application/json" }
            })

            accessToken = accessTokenResponse.access_token

        } else if (app === 'mobile') {
            const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
                params: {
                    client_id:     process.env.GITHUB_CLIENT_ID_MOBILE,
                    client_secret: process.env.GITHUB_CLIENT_SECRET_MOBILE,
                    code
                },
                headers: { "Accept": "application/json" }
            })

            accessToken = accessTokenResponse.access_token
        } else if (app === 'node') {
            const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
                params: {
                    client_id:     process.env.GITHUB_CLIENT_ID_NODE,
                    client_secret: process.env.GITHUB_CLIENT_SECRET_NODE,
                    code
                },
                headers: { "Accept": "application/json" }
            })

            accessToken = accessTokenResponse.access_token
        }

        try {
            var userResponse = await axios.get<IUserResponse>("https://api.github.com/user", {
                headers: { authorization: `Bearer ${accessToken}` }
            })
        } catch (err) {
            console.error(`
                Token: ${accessToken}
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