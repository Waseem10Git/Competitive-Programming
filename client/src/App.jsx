import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Header, Footer, Container, Login, Registration, Navigation} from "./components/index"
import {Challenges, Home, MyRate, NewChallenge, Rating, SolveChallenge} from "./Pages";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path={'/solveChallenge/:challengeId'} element={<SolveChallenge/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/register'} element={<Registration/>}/>
                    <Route path={'*'} element={
                        <>
                            <Header/>
                            <Navigation/>
                            <Container>
                                <Routes>
                                    <Route path={'/'} element={<Home/>}/>
                                    <Route path={'/challenges'} element={<Challenges/>}/>
                                    <Route path={'/rating'} element={<Rating/>}/>
                                    <Route path={'/myRate'} element={<MyRate/>}/>
                                    <Route path={'/newChallenge'} element={<NewChallenge/>}/>
                                </Routes>
                            </Container>
                            <Footer/>
                        </>
                    }/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
