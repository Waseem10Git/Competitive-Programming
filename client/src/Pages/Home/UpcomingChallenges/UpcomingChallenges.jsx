import "./UpcomingChallenges.css";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Axios from "axios";

const UpcomingChallenges = () => {

    const [challenges, setChallenges] = useState([]);
    const [registerStatus, setRegisterStatus] = useState([]);

    const currentDate = new Date()
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const millisecondsInHour = 1000 * 60 * 60;
    const millisecondsInMinute = 1000 * 60;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get("http://localhost:3001/challenges")
                const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date))
                const upcomingChallenges = sortedData.filter(challenge => new Date(challenge.date) > currentDate)
                setChallenges(upcomingChallenges);
                console.log(challenges)
            }catch (error){
                console.log('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const updatedRegisterStatus = challenges.map(challenge => {

                const durationInMilliseconds = challenge.duration;
                const days = Math.floor(durationInMilliseconds / millisecondsInDay);
                const remainingHours = durationInMilliseconds % millisecondsInDay;
                const hours = Math.floor(remainingHours / millisecondsInHour);
                const remainingMinutes = remainingHours % millisecondsInHour;
                const minutes = Math.floor(remainingMinutes / millisecondsInMinute);

                const startDate = new Date(challenge.date);
                const currentDate = new Date();
                const endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + days);
                endDate.setHours(startDate.getHours() + hours);
                endDate.setMinutes(startDate.getMinutes() + minutes);

                if (startDate > currentDate) {
                    // Calculate time remaining to start
                    const timeRemaining = startDate.getTime() - currentDate.getTime();
                    return { status: 'Start', remainingTime: timeRemaining };
                } else if (currentDate <= endDate) {
                    // Participate Now
                    return { status: 'Participate' };
                } else {
                    // Solve Now
                    return { status: 'Solve' };
                }
            });
            setRegisterStatus(updatedRegisterStatus);
        }, 1000);

        return () => clearInterval(interval);
    }, [challenges]);


    const ChallengeRows = () => {
        return challenges.map((challenge, index) => {
            const statusData = registerStatus[index];

            const startDate = new Date(challenge.date);
            const endDate = new Date(startDate.getTime() + challenge.duration); // Calculate end date

            let durationText;

            if (currentDate < startDate) {
                durationText = "Not Started Yet";
            } else if (currentDate >= startDate && currentDate <= endDate) {
                // Challenge is ongoing, display remaining time
                durationText = formatTimeRemaining(endDate.getTime() - currentDate.getTime());
            } else {
                durationText = "End";
            }

            return (
                <tr key={index}>
                    <td>{++index}</td>
                    <td>{challenge.title}</td>
                    <td>{challenge.language}</td>
                    <td>{challenge.difficulty}</td>
                    <td>{challenge.solved}</td>
                    <td>{challenge.date}</td>
                    <td>{durationText}</td>
                    <td>
                        {statusData && (
                            <>
                                {statusData.status === 'Start' && (
                                    <span>{formatTimeRemaining(statusData.remainingTime)}</span>
                                )}
                                {statusData.status === 'Participate' && (
                                    <Link to={`/solveChallenge/${challenge._id}`} className="button">Participate Now</Link>
                                )}
                                {statusData.status === 'Solve' && (
                                    <Link to={`/solveChallenge/${challenge._id}`} className="button">Solve Now</Link>
                                )}
                            </>
                        )}
                    </td>
                </tr>
            )
        })
    }

    const formatTimeRemaining = time => {
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / (1000 * 60)) % 60);
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const days = Math.floor(time / (1000 * 60 * 60 * 24));

        return `${days}:${hours}:${minutes}:${seconds}`;
    };


    return (
        <>
            <div className={"container"}>
                <h2>Upcoming Challenges</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Language</th>
                        <th>Difficulty</th>
                        <th>Solved</th>
                        <th>Start</th>
                        <th>Duration</th>
                        <th>Register</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ChallengeRows()}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default UpcomingChallenges