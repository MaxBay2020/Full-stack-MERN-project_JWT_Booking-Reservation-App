import express from 'express'
import {
    createHotel,
    deleteHotelById,
    getAllHotels, getHotelsByCity,
    getHotelById, getHotelsByType,
    updateHotelById, getAllRoomsOfHotelById
} from "../controllers/hotelController.js";
import {verifyAdmin} from "../utils/verifyToken.js";

const router = express.Router()

/* QUERY - get hotel by id */
// 所有用户都可以访问该路由
router.get('/find/:id', getHotelById)

/* QUERY - get all hotels */
// 所有用户都可以访问该路由
router.get('/', getAllHotels)

/* CREATE */
// 只有admin才可以访问该路由
router.post('/', verifyAdmin, createHotel)

/* UPDATE */
// 只有admin才可以访问该路由
router.patch('/:id', verifyAdmin, updateHotelById)

/* DELETE */
// 只有admin才可以访问该路由
router.delete('/:id', verifyAdmin, deleteHotelById)

// Query: get all hotels of a city
// 如：/countByCity?cities=toronto,baotou
router.get('/countByCity', getHotelsByCity)

// Query: get all hotels of a type
router.get('/countByType', getHotelsByType)

// Query: get all rooms of a hotel by id
router.get('/room/:id', getAllRoomsOfHotelById)


export default router
