import "./MyRate.css"
import {useEffect, useState} from "react";
import axios from "axios";

const MyRate = () => {
    const userId = "66c5e1ec88a9787a8ed9dafc"
    const [challenges, setChallenges] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSolvedChallenges = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/user/${userId}/solved-challenges`);
                setChallenges(response.data);  // Set the challenges to the state
            } catch (err) {
                setError('Failed to fetch solved challenges');
                console.error('Error:', err);
            }
        };

        // Call the function
        fetchSolvedChallenges();
    }, [userId]);

    console.log(challenges);

    const myChallenges = () => {
        return challenges.map((challenge, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{challenge.title}</td>
                    <td>{challenge.language}</td>
                    <td>{challenge.difficulty}</td>
                </tr>
            );
        })
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className="container challenges-tables">
                <h2>Some Recent Challenges</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Last Solved</th>
                        <th>Challenge</th>
                        <th>Language</th>
                        <th>Difficulty</th>
                    </tr>
                    </thead>
                    <tbody>
                    {myChallenges()}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default MyRate