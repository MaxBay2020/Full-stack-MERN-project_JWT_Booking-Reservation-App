import './reserve.scss'
import ClearIcon from '@mui/icons-material/Clear';
import useFetch from "../../hooks/useFetch";
import {useState} from "react";
import {useSelector} from 'react-redux'
import {getDatesInRange} from "../../utils/helpers";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Reserve = ({setOpenModal, hotelId}) => {
    const {data, loading, error} = useFetch(`/hotels/room/${hotelId}`)

    const [selectedRooms, setSelectedRooms] = useState([]);

    const handleSelect = e => {
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRooms(prev=> checked ? [...prev, value] : prev.filter(item=>item !== value))
    }

    const { dates } = useSelector(state => state.search.value)
    const navigate = useNavigate()
    const handleReserve = async () => {
        try {
            await Promise.all(selectedRooms.map(roomId => {
                const res = axios.patch(`/rooms/availability/${roomId}`, {
                    dates: allDates
                })
                return res.data
            }))

            setOpenModal(false)
            navigate('/')
        }catch (e) {

        }
    }

    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate)

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDate.some(eachDate => allDates.includes(new Date(eachDate).getTime()))
        return !isFound
    }

    return (
        <div className='reserve'>
            <div className="rContainer">
                <ClearIcon
                    className='rCLose'
                    onClick={()=>setOpenModal(false)}
                />
                <span>Select your rooms: </span>
                {
                    data.map(room => (
                        <div className="rItem">
                            <div className="rItemInfo">
                                <div className="rTitle">{room.title}</div>
                                <div className="rDesc">{room.desc}</div>
                                <div className="rMax">Max people: <b>{room.maxPeople}</b></div>
                                <div className="rPrice">{room.price}</div>
                            </div>

                            <div className="rSelectRooms">
                                {room.roomNumbers.map(roomNumber=>(
                                    <div className="room" key={roomNumber._id}>
                                        <label htmlFor="">{roomNumber.number}</label>
                                        <input
                                            type="checkbox"
                                            value={roomNumber._id}
                                            onChange={e=>handleSelect(e)}
                                            disabled={!isAvailable(roomNumber)}
                                        />
                                    </div>
                                ))}
                            </div>

                        </div>
                    ))
                }

                <button className="rButton" onClick={()=>handleReserve()}>Reserve Now!</button>
            </div>
        </div>
    );
};

export default Reserve;
