import 'dotenv/config'
import { serverHttp } from './app'

serverHttp.listen(process.env.PORT)