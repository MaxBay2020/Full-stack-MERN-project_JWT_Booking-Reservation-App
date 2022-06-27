import jwt from 'jsonwebtoken'
import { createError} from "./error.js";

// 这个中间键用来判断access token是否存在且正确
export const verifyToken = (req, res, next) => {
    // cookie放在了req对象上，先获取req.cookies身上的access token
    const token = req.cookies.access_token

    // 如果req.cookie.access_token的值是undefined，则说明，用户没有登录，之后跳到处理error的中间键
    if(!token)
        return next(createError(401, 'You are not authenticated! 😵‍💫'))

    // 如果有access token，则验证这个access token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // 如果根据密钥解析token失败，说明token是错误的
        if(err)
            return next(createError(403, 'Token invalid! 😵‍💫'))

        // 如果access token验证成功了，则将登录的用户信息放到req.user中
        // 这样一来，下一个中间键就可以通过req.user获取到这个user了
        req.user = user
        next()
    })
}

// 这个中间键是用来判断登录的用户是否有权利访问update和delete路由的
// 原理就是：用户登录之后，会将access token存在cookie中，我们解析access token之后会获得登录用户的id和isAdmin属性值
// 之后如果我们要访问user路由中的router.patch('/:id')或router.delete('/:id')时
// 我们就可以判断access token解析后的id是否和路由中的id一样，如果是一样的或者是admin，则用户可以更新或删除账号
// 如果不一样或不是admin，则不能更新或删除
export const verifyUser = (req,res,next) => {
    // 要想判断登录的用户是否有权利更新或删除指定的用户，需要先判断该用户是否登录了
    verifyToken(req, res, next, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            // 如果用户id匹配或者登录的用户是admin，则可以进行下一步操作，如更新或删除
            next()
        }else{
            // 如果用户id不匹配或者用户不是admin，则跳到处理error的中间键
            return next(createError(403, 'You are not authorized! 🤔'))
        }
    })
}

// 这个中间键用来判断登录的用户是否是admin
// 有一些路由是只有admin才能访问的，如添加hotel或room的路由，在进入这些路由前，需要使用这个中间键来判断登录的用户是否是admin
export const verifyAdmin = (req,res,next) => {
    verifyToken(req,res, () => {
        // 如果用户登录成功，则会将用户的id和isAdmin放在req.user中
        if(req.user.isAdmin)
            // 如果是admin，则跳到下一个中间键
            next()
        else
            // 如果不是admin，则跳到处理error的中间键
            return next(createError(403, 'You are not authorized! 🤔'))
    })
}

