import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB successfully!')
    }catch (e){
        throw e
    }
}

// 监听，当mongoDB内部出现错误，断开连接所触发的方法
mongoose.connection.on('disconnected', () => {
    console.log('mongoDB disconnected!')
})

// 监听，当mongoDB重新链接成功所触发的方法
mongoose.connection.on('connected', () => {
    console.log('mongoDB connected!')
})

export default connect
