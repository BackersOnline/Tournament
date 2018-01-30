import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

app.use(express.static(__dirname + '/../client/static/'))

app.listen(process.env.PORT)