import express from 'express'
import {
    deleteUserById,
    getAllUsers,
    getUserById,
    updateUserById
} from "../controllers/userController.js";
import {verifyAdmin, verifyToken, verifyUser} from "../utils/verifyToken.js";


const router = express.Router()

router.get('/checkAuthentication', verifyToken, (req,res,next)=>{
    res.send('hello logged in!')
})

router.get('/checkUser/:id', verifyUser, (req,res,next)=>{
    res.send('logged in and you can delete your account!')
})

router.get('/checkAdmin/:id', verifyAdmin, (req,res,next)=>{
    res.send('you can do anything you want')
})


/* QUERY - get all hotels */
// 只有admin才能获取所有用户信息
router.get('/', verifyAdmin, getAllUsers)

/* QUERY - get user by id */
// 只有登录的用户和路由上的id匹配的用户或者admin才可以访问该路由
router.get('/:id', verifyUser, getUserById)

/* UPDATE */
// 只有登录的用户和路由上的id匹配的用户或者admin才可以访问该路由
router.patch('/:id', verifyUser, updateUserById)

/* DELETE */
// 只有登录的用户和路由上的id匹配的用户或者admin才可以访问该路由
router.delete('/:id', verifyUser, deleteUserById)



export default router
