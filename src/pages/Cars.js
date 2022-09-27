import React from "react";
import { getFirestore } from "firebase/firestore";
import app from "../firebase"
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from 'react';
import CardCar from "../components/CardCar";
import '../style/Cars.css';
import PopupAccount from "../components/Popup";
import { addDoc, doc, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';



function Cars() {

  const db = getFirestore(app);
  const auth = getAuth(app);
  const [cars, setCars] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [startData, setStartData] = useState("");
  const [endData, setEndData] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [user] = useAuthState(auth);
  const [carName, setcarName] = useState("");
 
  const usersCollectionRef = collection(db, "cars");
  

  //const storage = getStorage(app);

  const createReservations = async () => {
    await addDoc(collection(db, "reservations"), {
      StartData: startData,
      StartTime: startTime,
      EndData: endData,
      EndTime: endTime,
      Email: document.getElementById('email-label').innerHTML,
      Car: document.getElementById('car-label').innerHTML 
    });
    setVisibility(!visibility)
  };

  // const getFirstLast = async()=> {
  //   const name = await getDocs(collection(db,"user").doc(user.email));
  //   setnumePrenume();
  // }

  useEffect(() => {
    const getCars = async () => {
      const data = await getDocs(usersCollectionRef);
      setCars(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getCars();
  }, []);

  const popupCloseHandler = (e) => {
    setVisibility(e);
  };

  const getCurrentDate = () => {

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}-${month < 10 ? `0${month}` : `${month}`}-${date}`

  }


  return (
    <div>
      <PopupAccount
        onClose={popupCloseHandler}
        show={visibility}
        title="Add Reservation"
      >
        <label id="email-label">{user? user.email:""}</label>
        <label id="car-label">{carName}</label>
        <label>Start date:</label>
        <input type="date" min={getCurrentDate()} onChange={(e) => setStartData(e.target.value)} id="start-data" name="start-data" />
        <label>Start time:</label>
        <input type="time" onChange={(e) => setStartTime(e.target.value)} ></input>
        <label>End date:</label>
        <input type="date" min={getCurrentDate()} onChange={(e) => setEndData(e.target.value)} />
        <label>End time:</label>
        <input type="time" onChange={(e) => setEndTime(e.target.value)} ></input>
        <button onClick={createReservations} >Create</button>

      </PopupAccount>
      <div className="grid-container">
        {cars.map((car) => {
        
          return (
            <CardCar addReservation={(e) => {setVisibility(!visibility); setcarName(car.id)} } key={car.id} id={car.id} engine={car.engine} year={car.year} img={car.img} price={car.price} />
          );

        })}
      </div>
    </div>

  )

}


export default Cars