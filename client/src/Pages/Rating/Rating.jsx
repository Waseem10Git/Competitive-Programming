import "./Rating.css"
import {useEffect, useState} from "react";
import Axios from "axios";

const Rating = () => {


    // Get Data For Rating Page
    const [students, setStudents] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await Axios.get("http://localhost:3001/students")
                const sortedData = response.data.sort((a,b) => b.rate - a.rate)
                setStudents(sortedData);
            }catch (error){
                console.log('Error fetching data:', error)
            }
        }
        fetchData();
    }, []);

    const filteredStudents = students.slice(0, 5);

    const ratingRows = () => {
        return students.map((student, index) => {
            return(
                <tr key={index}>
                    <td>{++index}</td>
                    <td>{student.name}</td>
                    <td>{student.solve.length}</td>
                    <td>{student.rate}</td>
                </tr>
            )
        })
    }

    return (
        <>
            <div className={"container challenges-tables"}>
                <h2>Some Users Rating</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Rank</th>
                        <th>User Name</th>
                        <th>Solve</th>
                        <th>Rating</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ratingRows()}
                    </tbody>
                </table>
            </div>
        </>
    )
}

// Rating for Home page
const SomeRating = () => {


    // Get Data For Rating Page
    const [students, setStudents] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await Axios.get("http://localhost:3001/students")
                const sortedData = response.data.sort((a,b) => b.rate - a.rate).slice(0,5)
                setStudents(sortedData);
            }catch (error){
                console.log('Error fetching data:', error)
            }
        }
        fetchData();
    }, []);



    const ratingRows = () => {
        return students.map((student, index) => {
            return(
                <tr key={index}>
                    <td>{++index}</td>
                    <td>{student.name}</td>
                    <td>{student.solve.length}</td>
                    <td>{student.rate}</td>
                </tr>
            )
        })
    }

    return (
        <>
            <div className={"container"}>
                <h2>Some Users Rating</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Order</th>
                        <th>User Name</th>
                        <th>Solve</th>
                        <th>Rating</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ratingRows()}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Rating
export {SomeRating}