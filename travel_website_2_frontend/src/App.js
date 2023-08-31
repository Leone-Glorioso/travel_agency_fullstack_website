import {BrowserRouter as Router, Routes, Route, Navigate, Link} from 'react-router-dom'
import './App.css';
import {AuthProvider} from "./Components/Auth/contex";
import Home from "./Components/Home/Home";
import Login from "./Components/Auth/Login";
import SingUp from "./Components/Auth/singUp";
import Profile from "./Components/Home/Profile";
import RoomList from "./Components/Room/RoomList";
import AdminPage from "./Components/Admin/AdminPage";
import ProtectedRoute from "./Components/Other/ProtectedRoute";
import ClientPage from "./Components/Clients/ClientPage";

function App() {
  return (
      <AuthProvider>
        <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SingUp />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/rooms' element={<RoomList/>} />
                    <Route path='/admin' element={<ProtectedRoute> <AdminPage/> </ProtectedRoute>} />
                    <Route path='/client' element={<ProtectedRoute> <ClientPage/> </ProtectedRoute>} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
          {/*<Navbar />*/}
          {/*<Routes>*/}
          {/*  <Route path='/' element={<Home />} />*/}
          {/*  <Route path='/login' element={<Login />} />*/}
          {/*  <Route path='/signup' element={<SingUp />} />*/}
          {/*  <Route path='/profile' element={<Profile />} />*/}
          {/*  <Route path="*" element={<Navigate to="/" />} />*/}
          {/*</Routes>*/}
        </Router>
      </AuthProvider>
  );
}

export default App;
