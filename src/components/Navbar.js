import React from 'react';
import '../style/Navbar.css';
import { NavLink,useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../img/logo.png';
import { getAuth } from "firebase/auth";
import app from '../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import { useState } from 'react';
import ReorderIcon from '@mui/icons-material/Reorder';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect,useRef } from 'react';
 

function Navbar() {
    const navigate =useNavigate();
    const ref_cars = useRef(null);
    const ref_reservations = useRef(null);
    const auth = getAuth(app);
    const[user,loading,error] = useAuthState(auth);
    const [isNavExpanded, setIsNavExpanded] = useState(false);
  

    const signOutClick=()=>{
        auth.signOut();
        navigate("/");
    }

    const NavToLogin =()=>{
        navigate("/login");
    }
    const NavbarResp = () => {
      setIsNavExpanded(!isNavExpanded);
    }

    useEffect(() => {
        const cars = ref_cars.current;
        const reservations = ref_reservations.current;
        if(user===null) {
            cars.id = 'hidden-link' 
            reservations.id ='hidden-link'
     }
        else{
            cars.id='visible-link' 
            reservations.id='visible-link'  
        } 
      }, [user]);

    
    return (
        <div>
            <div className={isNavExpanded? "navbar expended" : "navbar"} >
                <div className='logo'>
                    <img src={logo} alt='logo'></img>
                </div>

                <div className='links' onClick={()=>{if(isNavExpanded) NavbarResp()}}>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <NavLink ref ={ref_cars} id="vis" to="/cars">Cars</NavLink>
                    <NavLink  ref ={ref_reservations} id="vis" to="/reservations" >My Reservations</NavLink>
                </div>
                    {user===null? <button className='login' onClick={NavToLogin} > <LoginIcon  /></button>  : <button className='login' onClick={signOutClick} >  <LogoutIcon  /></button>} 
                 <div className='user-indicator'>
                  {user?.email}
                 </div>
                <div className='list' onClick={NavbarResp}>{isNavExpanded? <CloseIcon /> :<ReorderIcon /> }</div> 
               
            </div>
            
        </div>
    )
}

export default Navbar