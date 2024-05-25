import "./NewChallenge.css"
import {useState} from "react";
import Axios from "axios";
import {DateComponent} from "../../components/index.js";

const NewChallenge = () => {
    const [title, setTitle] = useState("")
    const [language, setLanguage] = useState("JavaScript")
    const [difficulty, setDifficulty] = useState("Easy")
    const [date, setDate] = useState(new Date())
    const [durationDay, setDurationDay] = useState(0)
    const [durationHour, setDurationHour] = useState(0)
    const [durationMinute, setDurationMinute] = useState(0)
    const [description, setDescription] = useState("")
    const [inputForm, setInputForm] = useState("")
    const [outputForm, setOutputForm] = useState("")
    const [sampleInput, setSampleInput] = useState("")
    const [sampleOutput, setSampleOutput] = useState("")
    const createChallenge = () => {

        const formattedDate = date.toISOString();
        const durationInMilliseconds = ((durationDay * 24 * 60) + (durationHour * 60) + durationMinute) * 60 * 1000;

        Axios.post("http://localhost:3001/newChallenge", {
            title: title,
            language: language,
            difficulty: difficulty,
            date: formattedDate,
            duration: durationInMilliseconds,
            description: description,
            inputForm: inputForm,
            outputForm: outputForm,
            sampleInput: sampleInput,
            sampleOutput: sampleOutput
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            <div className="form-container">
                <h3>Create New Challenge</h3>

                <form>
                    <label htmlFor="challenge-title">Challenge Title:</label>
                    <input type="text" id="challenge-title" name="title" onChange={e => setTitle(e.target.value)}
                           required autoFocus/>

                    <div className="difficulty-language">
                        <div className="difficulty-of-task">
                            <span className="block">Choose Difficulty:</span>
                            <select className="block program-languages-selection"
                                    onChange={e => setDifficulty(e.target.value)}>
                                <option value={"Easy"}>Easy</option>
                                <option value={"Medium"}>Medium</option>
                                <option value={"Hard"}>Hard</option>
                            </select>
                        </div>
                        <div className="program-languages">
                            <span className="block">Choose Language:</span>
                            <select className="block program-languages-selection"
                                    onChange={e => setLanguage(e.target.value)}>
                                <option value={"JavaScript"}>JavaScript</option>
                            </select>
                        </div>
                    </div>

                    <div className="date-start-duration">
                        <div className="start-date">
                            <span className="block">Choose Date & Time:</span>
                            <DateComponent onChange={setDate}/>
                        </div>

                        <div className="challenge-duration">
                        <span className="block">Choose Duration:</span>
                            <div className={"challenge-duration-inputs"}>
                                <input type={"number"} min={0} max={7} placeholder={"Days"} onChange={e => setDurationDay(Number(e.target.value))}/>
                                <input type={"number"} min={0} max={23} placeholder={"Hours"} onChange={e => setDurationHour(Number(e.target.value))}/>
                                <input type={"number"} min={0} max={59} placeholder={"Minutes"} onChange={e => setDurationMinute(Number(e.target.value))}/>
                            </div>
                        </div>
                    </div>

                    <label htmlFor="description">Challenge Description:</label>
                    <textarea id="description" name="description" rows="4"
                              onChange={e => setDescription(e.target.value)} required></textarea>

                    <label htmlFor="inputFormat">Input Format:</label>
                    <textarea id="inputFormat" name="inputFormat" rows="2"
                              onChange={e => setInputForm(e.target.value)} required></textarea>

                    <label htmlFor="outputFormat">Output Format:</label>
                    <textarea id="outputFormat" name="outputFormat" rows="2"
                              onChange={e => setOutputForm(e.target.value)} required></textarea>

                    <label htmlFor="sampleInput">Sample Input:</label>
                    <textarea id="sampleInput" name="sampleInput" rows="3"
                              onChange={e => setSampleInput(e.target.value)} required></textarea>

                    <label htmlFor="sampleOutput">Sample Output:</label>
                    <textarea id="sampleOutput" name="sampleOutput" rows="3"
                              onChange={e => setSampleOutput(e.target.value)} required></textarea>

                    <button onClick={createChallenge}>Submit Challenge</button>
                </form>
            </div>
        </>
    )
}

export default NewChallenge