import "./SolveChallenge.css"
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { Box } from "@chakra-ui/react";
import {CodeEditor, ChallengeDetails} from "../../components/index.js";
import Axios from 'axios'

const SolveChallenge = () => {
    const [challenge, setChallenge] = useState(null);
    const [sampleOutput, setSampleOutput] = useState('');
    const { challengeId } = useParams();

    useEffect(() => {
        const fetchSampleOutput = async () => {
            try {
                const response = await Axios.get(`http://localhost:3001/challenges/${challengeId}`)
                setChallenge(response.data);
                setSampleOutput(response.data.sampleOutput);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchSampleOutput();
    }, [challengeId]);

    if (challenge === null) {
        return <div className={"loading"}>Loading...</div>; // Or any loading indicator
    }


    return (
        <div className="container solve-challenge">
            <div className={"left-side"}>
                <ChallengeDetails challenge={challenge}/>
            </div>
            <div className="right-side">
                <div className="code-reader">
                    {/*<Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>*/}
                        <CodeEditor sampleOutput={sampleOutput}/>
                    {/*</Box>*/}
                </div>
            </div>
        </div>
    );
};

export default SolveChallenge;
