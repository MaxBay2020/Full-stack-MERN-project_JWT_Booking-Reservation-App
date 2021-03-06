import './header.scss'
import HotelIcon from '@mui/icons-material/Hotel';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import NordicWalkingIcon from '@mui/icons-material/NordicWalking';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import AirlineSeatIndividualSuiteIcon from '@mui/icons-material/AirlineSeatIndividualSuite';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { DateRange } from 'react-date-range';
import {useState} from "react";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {newSearch} from "../../redux/features/search";

const Header = ({type}) => {
    const [destination, setDestination] = useState('');

    const [openDate, setOpenDate] = useState(false);
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    });

    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth.value)

    const handleOption = (optionName, operator) => {
        switch (operator){
            case 'decrease':
                setOptions(prev => ({
                    ...prev,
                    [optionName]: prev[optionName] - 1
                }))
                break
            case 'increase':
                setOptions(prev => ({
                    ...prev,
                    [optionName]: prev[optionName] + 1
                }))
                break
            default:
                break
        }
    }

    const navigate = useNavigate()
    const handleSearch = () => {
        // ????????????navigate()???????????????????????????????????????????????????????????????????????????????????????state??????
        // ???????????????????????????useLocation()???????????????????????????????????????state??????
        navigate('/hotels', {
            state: {
                destination,
                dates,
                options
            }
        })

        dispatch(newSearch({
            city: destination,
            dates,
            options
        }))
    }


    return (
        <div className='header'>
            <div className={type === 'list' ? 'headerContainer listMode' : 'headerContainer'}>

                <div className="headerList">
                    <article className="headerListItem active" >
                        <HotelIcon />
                        <span>Stays</span>
                    </article>

                    <article className="headerListItem">
                        <FlightTakeoffIcon />
                        <span>Flights</span>
                    </article>

                    <article className="headerListItem">
                        <DirectionsCarIcon />
                        <span>Car rentals</span>
                    </article>

                    <article className="headerListItem">
                        <LocalTaxiIcon />
                        <span>Airport taxis</span>
                    </article>
                </div>

                {
                    type !== 'list'
                    &&
                    <>
                        <h1 className="headerTitle">
                            A lifetime of discounts? It's Genius.
                        </h1>

                        <p className="headerDesc">
                            Get rewarded for your travels ??? unlock instant savings of 10% or
                            more with a free Maxbooking account
                        </p>

                        {!user && <button className="headerBtn">Sign in / Register</button>}


                        <div className="headerSearch">

                            <article className="headerSearchItem">
                                <AirlineSeatIndividualSuiteIcon className='headerIcon' />
                                <input
                                    type="text"
                                    placeholder='Where are you going?'
                                    className='headerSearchInput'
                                    onChange={(e)=>setDestination(e.target.value)}
                                />
                            </article>

                            <article className="headerSearchItem">
                                <CalendarMonthIcon className='headerIcon' />
                                <span
                                    className='headerSearchText'
                                    onClick={() => setOpenDate(prev => !prev)}
                                >
                            {`${format(dates[0].startDate, 'MM/dd/yyyy')} to ${format(dates[0].endDate, 'MM/dd/yyyy')}`}
                        </span>
                                {
                                    openDate
                                    &&
                                    <DateRange
                                        className='date'
                                        minDate={new Date()}
                                        editableDateInputs={true}
                                        onChange={item => setDates([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={dates}
                                    />
                                }
                            </article>

                            <article className="headerSearchItem">
                                <PeopleAltIcon className='headerIcon' />
                                <span className='headerSearchText' onClick={() => setOpenOptions(prev=>!prev)}>
                            {`${options.adult} adult ?? ${options.children} children ?? ${options.room} room `}
                        </span>

                                {
                                    openOptions
                                    &&
                                    <div className="options">
                                        <article className="optionItem">
                                            <span className="optionText">Adult</span>
                                            <div className="optionCounter">
                                                <button disabled={options.adult <= 1} className="optionCounterButton" onClick={()=>handleOption('adult', 'decrease')}>-</button>
                                                <span className="optionCounterNumber">{options.adult}</span>
                                                <button className="optionCounterButton" onClick={()=>handleOption('adult', 'increase')}>+</button>
                                            </div>
                                        </article>

                                        <article className="optionItem">
                                            <span className="optionText">Children</span>
                                            <div className="optionCounter">
                                                <button disabled={options.children <= 0} className="optionCounterButton"  onClick={()=>handleOption('children', 'decrease')}>-</button>
                                                <span className="optionCounterNumber">{options.children}</span>
                                                <button className="optionCounterButton" onClick={()=>handleOption('children', 'increase')}>+</button>
                                            </div>
                                        </article>

                                        <article className="optionItem">
                                            <span className="optionText">Room</span>
                                            <div className="optionCounter">
                                                <button disabled={options.room <= 1} className="optionCounterButton"  onClick={()=>handleOption('room', 'decrease')}>-</button>
                                                <span className="optionCounterNumber">{options.room}</span>
                                                <button className="optionCounterButton" onClick={()=>handleOption('room', 'increase')}>+</button>
                                            </div>
                                        </article>
                                    </div>
                                }

                            </article>

                            <article className="headerSearchItem">
                                <button className="headerBtn" onClick={()=>handleSearch()}>Search</button>
                            </article>

                        </div>
                    </>
                }

            </div>
        </div>
    );
};

export default Header;
