import Room from '../mongoDB/models/Room.js'
import Hotel from '../mongoDB/models/Hotel.js'
import { createError } from '../utils/error.js'

export const createRoom = async (req,res,next) => {
    const hotelId = req.params.hotelId
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()

        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id }})
        }catch (e){
            next(e)
        }

        res.status(200).json(savedRoom)
    }catch (e){
        next(e)
    }
}

export const updateRoomById = async (req,res, next) => {
    try {
        // 如果不加第三个参数{ new: true }的话，则返回更新前的对象，加了之后就会返回更新后的对象了！
        const updatedNewRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            {new: true})
        res.status(200).json(updatedNewRoom)
    }catch (e) {
        next(e)
    }
}

export const deleteRoomById = async (req,res, next) => {
    const hotelId = req.params.hotelId

    try {
        await Room.findByIdAndDelete(req.params.id)
        try{
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id}})
        }catch(e){
            next(e)
        }
        res.status(200).json('Room has been deleted!')
    }catch (e) {
        next(e)
    }
}

export const getAllRooms = async (req,res, next) => {

    try {
        const rooms = await Room.find()
        res.status(200).json(rooms)
    }catch (e) {
        next(e)
    }
}

export const getRoomById = async (req,res, next) => {
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    }catch (e) {
        next(e)
    }
}

export const updateRoomAvailability = async (req,res,next)=>{
    try{
        await Room.updateOne({'roomNumbers._id': req.params.id},
            {$push: {
                'roomNumbers.$.unavailableDate': req.body.dates// 注意！如果要更新nested字段，中间需要加$！
                }})
        res.status(200).json('Room status has been updated!')
    }catch (e) {
        next(e)
    }
}
