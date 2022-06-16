import './footer.scss'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="fLists">
                {
                    new Array(6).fill(0).map((item, index) => (
                        <ul className="fList" key={index}>
                            <li className="fListItem">Countries</li>
                            <li className="fListItem">Regions</li>
                            <li className="fListItem">Cities</li>
                            <li className="fListItem">Districts</li>
                            <li className="fListItem">Airports</li>
                            <li className="fListItem">Hotels</li>
                        </ul>
                    ))
                }
            </div>

            <div className="fText">Copyright &copy; 2022 Maxbooking.</div>
        </footer>
    );
};

export default Footer;
