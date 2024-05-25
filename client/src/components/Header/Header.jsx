import "./Header.css"
import icon from "../../FCAIicon.jpg"
import { IoSunnySharp } from "react-icons/io5";
import { IoLanguageSharp } from "react-icons/io5";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const Header = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Fetch user data using the token and update the state
            fetchUserData(token);
        }
    }, []);

    const fetchUserData = async (token) => {
        try {
            const response = await fetch('http://localhost:3001/students', { // Assuming there's a route to fetch user data for the logged-in user
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const userData = await response.json();
                console.log(userData)
                setUser(userData); // Assuming the user data object contains the username
                // console.log(user)
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <header>
            <div>
                <img src={icon} alt={"Custom Icon"} className={"left-logo"}/>
            </div>
            <div className="center-logo">
                PREMIUM
            </div>
            <div className="right-services">
                <div className="darkMode-languages">
                    <Link to="" className="right-logos"><IoSunnySharp /></Link>
                    <Link to="" className="right-logos"><IoLanguageSharp /></Link>
                </div>
                {user ? (
                    <>
                        <span>{user[8].username} | </span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className={"login-register"}>Login</Link> | <Link to="/register" className={"login-register"}>Register</Link>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header