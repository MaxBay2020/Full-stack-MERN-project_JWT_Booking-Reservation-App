import User from "../mongoDB/models/User.js";
import bcrypt from 'bcryptjs'
import {createError} from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const register = async (req,res,next) => {

    try {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash,
        })

        await newUser.save()
        res.status(200).json('User has been created! 🤩')
    }catch (e) {
        next(e)
    }
}

export const login = async (req,res, next) => {
    try {
        console.log(req.body.username)
        const user = await User.findOne({username: req.body.username})
        if(!user)   return next(createError(404, 'User not found! 🧐'))

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)
        if(!isPasswordCorrect)
            return next(createError(400, 'Username or password not correct! 😵‍💫'))

        // 根据密钥，生成access token，里面包含了用户的id和isAdmin属性值
        const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET)

        const {password, isAdmin, ...rest} = user._doc

        // 将access token存到cookie的access_token键中
        // { httpOnly: true }的作用是禁止前端的一些密钥破解程序获得这个cookie，让我们的程序更安全
        res.cookie('access_token', accessToken, {
            httpOnly: true
        }).status(200).json({details: {...rest}, isAdmin})

    }catch (e) {
        next(e)
    }
}
