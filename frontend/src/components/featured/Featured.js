import './featured.scss'
import useFetch from "../../hooks/useFetch"

const Featured = () => {

    const { data, loading, error } = useFetch('hotels/countByCity?cities=Toronto,chengdu')

    return (
        <section className='featured'>
            {
                loading ?
                    <p>
                        Loading...
                    </p>
                    :
                    <>
                        <article className="featuredItem">
                            <img
                                src="https://images.squarespace-cdn.com/content/v1/59c9456437c581931426f206/1507207905886-SZQPX5A4I9F9SLWAS91T/toronto-2544786_1920.jpg?format=1500w"
                                alt=""
                                className="featuredImg"
                            />
                            <div className="featuredTitles">
                                <h1>Toronto</h1>
                                <h2>{data[0]} properties</h2>
                            </div>
                        </article>

                        <article className="featuredItem">
                            <img
                                src="https://a.travel-assets.com/findyours-php/viewfinder/images/res70/259000/259143-Montreal.jpg"
                                alt=""
                                className="featuredImg"
                            />
                            <div className="featuredTitles">
                                <h1>Montreal</h1>
                                <h2>{data[1]} properties</h2>
                            </div>
                        </article>

                        <article className="featuredItem">
                            <img
                                src="https://expatra.com/wp-content/uploads/2008/03/rsz_victoria_inner_harbour.jpg"
                                alt=""
                                className="featuredImg"
                            />
                            <div className="featuredTitles">
                                <h1>Victoria</h1>
                                <h2>{data[2]} properties</h2>
                            </div>
                        </article>
                    </>
            }
        </section>
    );
};

export default Featured;
