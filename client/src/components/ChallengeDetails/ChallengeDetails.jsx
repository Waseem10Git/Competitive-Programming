import "./ChallengeDetails.css"
import {Link} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";

const ChallengeDetails = ({challenge}) => {

    return (
        <>
            <div className={"out-title"}>
                <Link to={"/challenges"}><h3 className={"back-arrow"}><FaArrowLeft/></h3></Link>
                <h3>{challenge.title}</h3>
            </div>
            <div>
                <h5>Description</h5>
                {challenge.description}
            </div>
            <div>
                <h5>Input Form</h5>
                {challenge.inputForm}
            </div>
            <div>
                <h5>Output Form</h5>
                {challenge.outputForm}
            </div>
            <div>
                <h5>Sample Input</h5>
                {challenge.sampleInput}
            </div>
            <div>
                <h5>Sample Output</h5>
                {challenge.sampleOutput}
            </div>
        </>
    )
}

export default ChallengeDetails;