import 'dotenv/config'
import { router } from './routes'
import { Server } from 'socket.io'
import express from 'express'
import http    from 'http'
import path    from 'path'
import cors    from 'cors'

const app = express()
app.use(cors())

const reqPath = path.join(__dirname, '../')

const serverHttp = http.createServer(app)
const io = new Server(serverHttp, {
    cors: { origin: '*' } // - Coringa para todas as origens
})
io.on('connection', socket => console.log(`Usuario conectado ${socket.id}`))

app.use(express.json())
app.use(router)

app.get('/', (req, res) => { res.sendFile(path.join(reqPath + '/public/index.html')) })

export { serverHttp, io }