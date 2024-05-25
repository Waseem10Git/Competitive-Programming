import "./Footer.css"
import { FaRegCopyright } from "react-icons/fa6";

const Footer = () => {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    return (
        <footer>
            <p>Copyright <FaRegCopyright /> {currentYear}</p>
        </footer>
    )
}

export default Footer