
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js';
import Home from './pages/Home.js';
import Contact from './pages/Contact.js';
import Cars from './pages/Cars.js';
import MyReservations from './pages/MyReservations';
import NotFound from './pages/NotFound';
import { getAuth } from "firebase/auth";
import app from './firebase';
import {useAuthState} from 'react-firebase-hooks/auth';

function App() {
 
  const auth = getAuth(app);
  const[user] = useAuthState(auth);

  
  

  return (


    <div className="App">

      <Router>
        
        <Navbar />
        <div className='content'>
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          {user? <Route path="/cars" element={<Cars />} /> : <Route path="/cars" element={<NotFound/>} />}
          {user? <Route path="/reservations" element={<MyReservations />} /> : <Route path="/reservations" element={<NotFound/>} />}
         
          
        </Routes>
        <Footer />
        </div>
      </Router>
      

    </div>
  );
}

export default App;
