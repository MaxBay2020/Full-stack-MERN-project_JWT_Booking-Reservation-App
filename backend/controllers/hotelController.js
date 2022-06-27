import Hotel from "../mongoDB/models/Hotel.js";
import Room from "../mongoDB/models/Room.js";


export const createHotel = async (req,res,next) => {
    const {city, ...others} = req.body
    const newHotel = new Hotel({city: city.toLowerCase(), ...others})

    try {
        const savedNewHotel = await newHotel.save()
        res.status(200).json(savedNewHotel)
    }catch (e) {
        next(e)
    }
}

export const updateHotelById = async (req,res, next) => {
    try {
        // 如果不加第三个参数{ new: true }的话，则返回更新前的对象，加了之后就会返回更新后的对象了！
        const updatedNewHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            {new: true})
        res.status(200).json(updatedNewHotel)
    }catch (e) {
        next(e)
    }
}

export const deleteHotelById = async (req,res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json('Hotel has been deleted!')
    }catch (e) {
        next(e)
    }
}

// 针对的路由：
// localhost:5000/api/hotels或
// localhost:5000/api/hotels/?featured=true&limit=4&min=0&max=100
export const getAllHotels = async (req,res, next) => {

    const {min, max, ...others} = req.query

    try {
        // mongoDB的limit()方法可以指定获取前几条数据
        // 注意下面的过滤条件的写法
        const hotels = await Hotel.find({...others, cheapestPrice: { $gt: min || 1, $lt: max || 9999 } }).limit(req.query.limit)
        res.status(200).json(hotels)
    }catch (e) {
        next(e)
    }
}

export const getHotelById = async (req,res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    }catch (e) {
        next(e)
    }
}

export const getHotelsByCity = async (req,res, next) => {
    // 将过滤条件从字符串变成数组
    const cities = req.query?.cities?.split(',')

    try {
        // 注意！
        // 因为cities中可能放了肯多个城市名字，没个名字都要去数据库查询，然后获得此城市的hotel的个数
        // 因此使用Promise.all()方法
        const list = await Promise.all(cities.map(city => {
            // 注意！这里使用了mongoDB的方法countDocuments()，里面放要查询的条件
            // 这个方法会返回符合条件的hotel个数
            // 这里也可以使用Hotel.find({ city: city }).length，但是这个方法会获取数据，因此很耗时，效率很低
            // 而countDocuments()方法不耗时，因为这个方法不会获取数据，它只会帮我们数满足条件的文档个数
            return Hotel.countDocuments({city: city})
        }))
        res.status(200).json(list)
    }catch (e) {
        next(e)
    }
}

export const getHotelsByType = async (req,res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount },
        ]);
    }catch (e) {
        next(e)
    }
}

export const getAllRoomsOfHotelById = async (req,res,next) => {
    try{
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map(roomId => Room.findById(roomId)))

        res.status(200).json(list)
    }catch (e) {
        next(e)
    }

}
