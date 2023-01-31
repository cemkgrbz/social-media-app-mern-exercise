import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import db from './config/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()
const app = express()

db()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use('/users', userRoutes)
app.use('/posts', postRoutes)

// 404 handler
app.use((req, res, next) => {

    const error = new Error('Error 404: Route not found')

    next(error)
})

// Error Handler
app.use((err, req, res, next) => {
    console.log("🚀 ~ err", err)

    res.status(err.statusCode)
    res.send(err.message)
})

const port = process.env.PORT || 4001
app.listen(port, () => console.log('Server is up and running at port', port))