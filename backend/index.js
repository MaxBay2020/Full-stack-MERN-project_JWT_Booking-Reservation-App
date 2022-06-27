import express from 'express'
import indexRouter from './routers/index.js'
import usersRouter from './routers/users.js'
import hotelsRouter from './routers/hotels.js'
import roomsRouter from './routers/rooms.js'
import authRouter from './routers/auth.js'
import cors from 'cors'
import connect from './mongoDB/connection.js'
import cookieParser from 'cookie-parser'

const app = express()


app.use(cors())

// cookie
app.use(cookieParser())

// middlewares
// 如果不配置这个中间键，则不能向后端发送json对象，所以，必须配置！
app.use(express.json())

app.use('/api/', indexRouter)
app.use('/api/users', usersRouter)
app.use('/api/hotels', hotelsRouter)
app.use('/api/rooms', roomsRouter)
app.use('/api/auth', authRouter)

// 中间键：当前面的中间键发生错误时，就直接跳到这个中间键来处理！
app.use((err, req,res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || 'Something is wrong!'
    res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})


app.listen(5000, () => {
    connect()
    console.log('Server is running!')
})
