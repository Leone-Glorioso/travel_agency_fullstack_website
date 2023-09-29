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
import LandlordPage from "./Components/Landlord/LandlordPage";
import LandlordClientPage from "./Components/LandlordClients/LandlordClientPage";
import SearchPage from './Components/Home/SearchPage'
import RoomCreate from "./Components/Room/RoomCreate";
import RoomPage from "./Components/Room/RoomPage";

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
                    <Route path='/landlord' element={<ProtectedRoute> <LandlordPage/> </ProtectedRoute>} />
                    <Route path='/landlordclient' element={<ProtectedRoute> <LandlordClientPage/> </ProtectedRoute>} />
                    {/*<Route path="/search-results" />*/}
                    <Route path='/search-result' element={<SearchPage/>}/>
                    <Route path='/new_room' element={<RoomCreate />} />
                    <Route path='/room_page' element={<RoomPage />} />
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
