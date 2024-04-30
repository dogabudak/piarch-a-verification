import {verify} from './lib/verification-factory'
import * as cors from 'cors'
import * as express from 'express'

import {StatusCodes, getReasonPhrase} from 'http-status-codes'

import 'dotenv/config'

const app = express()

app.use(cors())
app.options('*', cors())
app.set('port', process.env.SERVER_PORT || 7001)

app.get('/verify/:tokenString', async (req, res) => {
    try {
        const {tokenString} = req.params
        const [type, token] = tokenString.split(' ')
        if (type && token) {
            const answer = await verify(type, token)
            const auth = JSON.parse(answer);
            const result = auth.authenticated === true ? "true" : "false";
            return res.status(StatusCodes.OK).send(result)
        }
        return res.status(StatusCodes.NOT_FOUND).send(false)
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        })
    }
})

app.get('/health', (req, res) => {
    res.status(200).send('Ok')
})

export default app
