import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login";
import Team from "./pages/Team/Team";
// import Team from "./pages/Team/CreateTeam";
import Player from "./pages/Player/Player";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import CreatePLayer from "./pages/Player/CreatePlayer";

function App() {


  return (


    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/team" element={<Team/>}/>
        {/* <Route path="/create-team" element={<Team/>}/> */}
        {/* <Route path="/create-player" element={<CreatePLayer/>}/> */}
        <Route path="/player" element={<Player/>}/>
      </Routes>
    </BrowserRouter>
    // <>
    // <Register/>
    // <Login />
    // <TeamList/>
    // <Team/>
    // <PlayerPage/>
     
    // </>
  )
}

export default App