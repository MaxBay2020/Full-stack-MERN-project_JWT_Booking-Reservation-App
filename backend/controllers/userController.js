import User from "../mongoDB/models/User.js";
import router from "../routers/users.js";




export const updateUserById = async (req,res, next) => {
    try {
        // 如果不加第三个参数{ new: true }的话，则返回更新前的对象，加了之后就会返回更新后的对象了！
        const updatedNewUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            {new: true})
        res.status(200).json(updatedNewUser)
    }catch (e) {
        router.patch('/:id', updateUserById)
        next(e)
    }
}

export const deleteUserById = async (req,res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted!')
    }catch (e) {
        next(e)
    }
}

export const getAllUsers = async (req,res, next) => {

    try {
        const users = await User.find()
        res.status(200).json(users)
    }catch (e) {
        next(e)
    }
}

export const getUserById = async (req,res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }catch (e) {
        next(e)
    }
}
