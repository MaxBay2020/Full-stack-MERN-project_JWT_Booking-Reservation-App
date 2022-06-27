import './hotel.scss'
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import {useState} from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ClearIcon from '@mui/icons-material/Clear';
import useFetch from "../../hooks/useFetch";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from 'react-redux'
import {calculateDaysOfTwoDates} from "../../utils/helpers";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
    const [slideNumber, setSlideNumber] = useState(0)
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false);

    // const photosMock = [
    //     {
    //         src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    //     },
    //     {
    //         src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    //     },
    //     {
    //         src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    //     },
    //     {
    //         src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    //     },
    //     {
    //         src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    //     },
    //     {
    //         src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    //     },
    // ];

    const location = useLocation()
    const id = location.pathname.split('/')[2]
    const { data, loading, error } = useFetch(`/hotels/find/${id}`)

    const {
        _id,
        name,
        type,
        city,
        address,
        distance,
        photos,
        title,
        desc,
        rooms,
        cheapestPrice,
        featured,
        rating
    } = data

    const search = useSelector(state => state.search.value)
    const {dates, options:{room}} = search


    const days = calculateDaysOfTwoDates(dates[0].startDate, dates[0].endDate)



    const handleOpen = (index) => {
        setSlideNumber(index)
        setOpen(true)
    }

    const handleMove = (direction) => {
        let newSlideNumber
        switch (direction){
            case 'l':
                newSlideNumber = slideNumber === 0 ? photos.length - 1 : slideNumber - 1
                break
            case 'r':
                newSlideNumber = slideNumber === photos.length - 1 ? 0 : slideNumber + 1
                break
            default:
                break
        }

        setSlideNumber(newSlideNumber)
    }

    const { user } = useSelector(state => state.auth.value)
    const navigate = useNavigate()

    const handleBooking = (e) => {
        e.preventDefault()
        if(user) setOpenModal(true)
        else navigate('/login')
    }

    return (
        <main>
            <Navbar />
            <Header type='list' />

            {
                loading?
                    <p>Loading...</p>
                    :
                    <>
                        <section className="hotelContainer">
                            {
                                open
                                &&
                                <div className="slider">
                                    <ArrowBackIosIcon
                                        className='arrow'
                                        fontSize='large'
                                        onClick={()=>handleMove('l')}
                                    />
                                    <div className="sliderWrapper">
                                        <img src={photos[slideNumber]} alt={name} className="sliderImg"/>
                                    </div>

                                    <ArrowForwardIosIcon
                                        className='arrow'
                                        fontSize='large'
                                        onClick={()=>handleMove('r')}
                                    />
                                    <ClearIcon
                                        fontSize='large'
                                        className='close'
                                        onClick={()=>setOpen(false)}
                                    />
                                </div>
                            }

                            <div className="hotelWrapper">
                                <button onClick={(e)=>handleBooking(e)} className="bookNow">Reserve or Book Now!</button>

                                <h1 className="hotelTitle">{name}</h1>

                                <section className="hotelAddress">
                                    <LocationOnIcon />
                                    <span>{address}</span>
                                </section>

                                <section className="hotelDistance">
                                    Excellent location – {distance}m from center
                                </section>

                                <section className="hotelPriceHighlight">
                                    Book a stay over ${cheapestPrice} at this property and get a free airport taxi
                                </section>

                                <section className="hotelImages">
                                    {
                                        photos?.map((photo, index) => (
                                            <article className="hotelImgWrapper" key={index}>
                                                <img
                                                    src={photo}
                                                    alt=""
                                                    className='hotelImg'
                                                    onClick={() => handleOpen(index)}
                                                />
                                            </article>
                                        ))
                                    }
                                </section>

                                <section className="hotelDetails">
                                    <div className="hotelDetailsTexts">
                                        <h1 className="hotelTitle">{title}</h1>
                                        <p className="hotelDesc">{desc}</p>
                                    </div>
                                    <div className="hotelDetailsPrice">
                                        <h1>Perfect for a {days}-night stay!</h1>
                                        <span>
                                    Located in the real heart of Krakow, this property has an
                                    excellent location score of 9.8!
                                </span>
                                        <h2>
                                            <b>${days * cheapestPrice * room}</b> ({days} nights)
                                        </h2>
                                        <button onClick={(e)=>handleBooking(e)}>Reserve or Book Now!</button>
                                    </div>
                                </section>
                            </div>

                            <MailList />
                            <Footer />
                        </section>

                        {
                            openModal &&
                            <Reserve
                                setOpenModal={setOpenModal}
                                hotelId={id}
                            />
                        }
                    </>
            }
        </main>
    );
};

export default Hotel;
