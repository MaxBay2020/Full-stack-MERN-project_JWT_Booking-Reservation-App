import './featuredProperties.scss'
import useFetch from "../../hooks/useFetch";

const FeaturedProperties = () => {
    const { data, loading, error } = useFetch('hotels?featured=true&limit=4')

    return (
        <div className='fp'>
            {
                loading ?
                    <p>Loading...</p>
                    :
                    <>
                        {
                            data?.map( item => (
                                <article className="fpItem" key={item._id}>
                                    <img
                                        src={item.photos[0]}
                                        alt=""
                                        className="fpImg"
                                    />
                                    <span className="fpName">{item.name}</span>
                                    <span className="fpCity">{item.city}</span>
                                    <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
                                    {
                                        item.rating &&
                                        <div className="fpRating">
                                            <button>8.9</button>
                                            <span>Excellent</span>
                                        </div>
                                    }
                                </article>
                            ))
                        }
                    </>
            }
        </div>
    );
};

export default FeaturedProperties;
