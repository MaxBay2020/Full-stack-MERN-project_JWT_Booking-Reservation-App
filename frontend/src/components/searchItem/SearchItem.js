import './searchItem.scss'
import {Link} from "react-router-dom";

const SearchItem = ({item}) => {
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
    } = item


    return (
        <main className='searchItem'>
            <img
                src={photos[0]}
                alt=""
                className='siImg'
            />

            <section className="siDesc">
                <h1 className="siTitle">{title}</h1>
                <span className="siDistance">{distance}m from center</span>
                <span className="siTaxiOp">Free airport taxi</span>
                <span className="siSubtitle">Studio Apartment with Air conditioning</span>
                <span className="siFeatures">{desc}</span>
                <span className="siCancelOp">Free cancellation </span>
                <span className="siCancelOpSubtitle">You can cancel later, so lock in this great price today!</span>
            </section>

            <section className="siDetails">
                {
                    rating &&
                    <div className="siRating">
                        <span>Excellent</span>
                        <button>{rating}</button>
                    </div>
                }
                <div className="siDetailTexts">
                    <span className="siPrice">${cheapestPrice}</span>
                    <span className="siTaxOp">Includes taxes and fees</span>
                    <Link to={`/hotels/${_id}`}>
                        <button className="siCheckButton">See availability</button>
                    </Link>
                </div>
            </section>

        </main>
    );
};

export default SearchItem;
