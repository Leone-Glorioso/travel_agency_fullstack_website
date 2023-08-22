import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css';
import {AuthProvider} from "./Components/Auth/contex";
import Home from "./Components/Home/Home";
import Login from "./Components/Auth/Login";
import SingUp from "./Components/Auth/singUp";
import Profile from "./Components/Home/Profile";

function App() {
  return (
      <AuthProvider>
        <Router>
          {/*<Navbar />*/}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SingUp />} />
            <Route path='/profile' element={<Profile />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
  );
}

export default App;
