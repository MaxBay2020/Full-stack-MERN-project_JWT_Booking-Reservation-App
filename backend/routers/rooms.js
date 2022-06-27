import express from 'express'

import {verifyAdmin} from "../utils/verifyToken.js";
import {
    createRoom,
    deleteRoomById,
    getAllRooms,
    getRoomById, updateRoomAvailability,
    updateRoomById
} from "../controllers/roomController.js";

const router = express.Router()

/* QUERY - get hotel by id */
// 所有用户都可以访问该路由
router.get('/:id', getRoomById)

/* QUERY - get all hotels */
// 所有用户都可以访问该路由
router.get('/', getAllRooms)

/* CREATE */
// 只有admin才可以访问该路由
router.post('/:hotelId', verifyAdmin, createRoom)

/* UPDATE */
// 只有admin才可以访问该路由
router.patch('/:id', verifyAdmin, updateRoomById)
router.patch('/availability/:id', updateRoomAvailability)


/* DELETE */
// 只有admin才可以访问该路由
router.delete('/:id/:hotelId', verifyAdmin, deleteRoomById)


export default router
