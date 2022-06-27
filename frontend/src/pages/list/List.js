import './list.scss'
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import {useLocation} from 'react-router-dom'
import {useState} from "react";
import {format} from "date-fns";
import DateRange from "react-date-range/dist/components/DateRange";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
    const location = useLocation()

    const [destination, setDestination] = useState(location.state.destination);
    const [dates, setDates] = useState(location.state.dates);
    const [options, setOptions] = useState(location.state.options);

    const [openDate, setOpenDate] = useState(false);

    const [min, setMin] = useState(undefined)
    const [max, setMax] = useState(undefined)

    const { data, loading, error, fetchData } = useFetch(`hotels?city=${destination.toLowerCase()}&min=${min || 0}&max=${max || 99999}`)


    const handleClick = () => {
        fetchData()
    }

    return (
        <main>
            <Navbar />
            <Header type='list' />

            <div className="listContainer">
               <div className="listWrapper">
                   <section className="listSearch">
                        <h1 className="listTitle">Search</h1>

                        <article className="lsItem">
                            <label htmlFor="destination">Destination</label>
                            <input id='destination' type="text" placeholder={destination} />
                        </article>

                       <article className="lsItem">
                           <label>Check-in Date</label>
                           <span onClick={()=>setOpenDate(prev=>!prev)}>
                               {`${format(dates[0].startDate, 'MM/dd/yyyy')} to ${format(dates[0].endDate, 'MM/dd/yyyy')}`}
                           </span>

                           {
                               openDate &&
                               <DateRange
                                   minDate={new Date()}
                                   editableDateInputs={true}
                                   onChange={item => setDates([item.selection])}
                                   moveRangeOnFirstSelection={false}
                                   ranges={dates}
                               />
                           }
                       </article>

                       <article className="lsItem">
                           <label>Options</label>

                           <div className="lsOptions">
                               <article className="lsOptionItem">
                                   <span className="lsOptionText">Min price <small>per night</small></span>
                                   <input
                                       type="text"
                                       className='lsOptionInput'
                                       onChange={(e) => setMin(e.target.value)}
                                   />
                               </article>

                               <article className="lsOptionItem">
                                   <span className="lsOptionText">Max price <small>per night</small></span>
                                   <input
                                       type="text"
                                       className='lsOptionInput'
                                       onChange={(e) => setMax(e.target.value)}
                                   />
                               </article>

                               <article className="lsOptionItem">
                                   <span className="lsOptionText">Adult</span>
                                   <input min={1} type="number" className='lsOptionInput' placeholder={options.adult}/>
                               </article>

                               <article className="lsOptionItem">
                                   <span className="lsOptionText">Children</span>
                                   <input min={0} type="number" className='lsOptionInput' placeholder={options.children}/>
                               </article>

                               <article className="lsOptionItem">
                                   <span className="lsOptionText">Room</span>
                                   <input min={1} type="number" className='lsOptionInput' placeholder={options.room}/>
                               </article>
                           </div>

                       </article>
                       <button onClick={()=>handleClick()}>Search</button>


                   </section>

                   <section className="listResult">
                       {
                           loading?
                               <p>Loading...</p>
                               :
                               <>
                                   {
                                       data?.map((item) => (
                                           <SearchItem item={item} key={item._id} />
                                       ))
                                   }
                               </>
                       }
                   </section>
               </div>
            </div>
        </main>
    );
};

export default List;
