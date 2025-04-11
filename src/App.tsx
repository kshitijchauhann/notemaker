import SignUp from "./pages/SignUp.tsx";
import SignIn from "./pages/SignIn.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Profile from "./pages/UserProfile.tsx";
import NoteArea from "./pages/NoteArea.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.tsx";

const App = () => {
  return (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={< Landing />}/>
        <Route path="/login" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/notes" element={<NoteArea/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
