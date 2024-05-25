import "./Navigation.css"
import {Link} from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Navigation = () => {
    return (
        <nav className="nav">
            {/*<Link to="/" className="nav-item"><span className="arrow"><FaArrowLeft /></span></Link>*/}
            <Link to="/" className="nav-item is-active">Home</Link>
            <Link to="/challenges" className="nav-item">Challenges</Link>
            <Link to="/rating" className="nav-item">Rating</Link>
            <Link to="/myRate" className="nav-item">UserRating</Link>
            <Link to="/newChallenge" className="nav-item">CreateNewProblem</Link>
        </nav>
    );
};

export default Navigation;