import mongoose from 'mongoose'
const {Schema} = mongoose

const roomSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true
    },
    roomNumbers: {
        type: [
            {
                number: { type: Number, unique: true },
                unavailableDate : { type: [Date] }
            },
        ],
        required: true
    }
}, {timestamps: true})

const roomModel = mongoose.model('Room', roomSchema)

export default roomModel
