import React from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from '../firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css';
import PopupAccount from '../components/Popup';
import { getFirestore } from "firebase/firestore";
import { setDoc, doc } from "firebase/firestore";

function Login() {
  const navigate = useNavigate();
  const [email_in, setEmailin] = useState("");
  const [password_in, setPassin] = useState("");
  const [email_up, setEmailup] = useState("");
  const [password_up, setPassup] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const auth = getAuth(app);
  const [visibility, setVisibility] = useState(false);

  const db = getFirestore(app);

  const createUser = async () => {
    await setDoc(doc(db, "users", email_up), {
      LastName: lastName,
      FirstName: firstName
    });
  };

  const popupCloseHandler = (e) => {
    setVisibility(e);
  };

  const signUp = () => {

    createUserWithEmailAndPassword(auth, email_up, password_up)
      .then((userCredential) => {
        // Signed in 
        // const user = userCredential.user;
        createUser();
        navigate("/");
        //console.log(user);
        // ...
      })
      .catch((error) => {
        //const errorCode = error.code;
        //const errorMessage = error.message;
        document.getElementById("err").style.visibility = "visible";

        // ..
      });
  }

  const signIn = () => {
    signInWithEmailAndPassword(auth, email_in, password_in)
      .then((userCredential) => {
        // Signed in 
        //const user = userCredential.user;
        navigate("/");
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        //const errorMessage = error.message;
        alert("Utilizatorul nu exista!")
      });

  }



  return (
    <div>
      <div className='container'>
        <div className='form'>
          <h2>LogIn</h2>
          <label>Email: </label>
          <input type={'email'} placeholder='Enter your email' onChange={(e) => setEmailin(e.target.value)}></input>
          <label>Password: </label>
          <input type={'password'} placeholder='Enter your password' onChange={(e) => setPassin(e.target.value)}></input>
          <button onClick={signIn}>Sign in</button>
          <button onClick={(e) => setVisibility(!visibility)} >Create Account</button>
        </div>

        <PopupAccount
          onClose={popupCloseHandler}
          show={visibility}
          title="Create New Account"
        >
          <input type='text' placeholder='First Name...' onChange={(e) => setfirstName(e.target.value)}></input>
          <input type='text' placeholder='Last Name...' onChange={(e) => setlastName(e.target.value)}></input>
          <input type='email' placeholder='Email' onChange={(e) => setEmailup(e.target.value)}></input>
          <input type='password' placeholder='Password' onChange={(e) => setPassup(e.target.value)}></input>

          <button onClick={signUp}>Create</button>
          <label id='err'>Eroare!!!!</label>
        </PopupAccount>
      </div>

    </div>
  )
}

export default Login