import React from 'react';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import app from "../firebase";
import { useState, useEffect } from 'react';
import { doc,collection,getDocs,query, where, deleteDoc} from "firebase/firestore";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';

 

function MyReservations() {
    const db = getFirestore(app);
    const auth = getAuth(app);
    const [user] = useAuthState(auth);
    const [res, setRes] = useState([]);

    const resCollectionRef = collection(db, "reservations");
    const q = query(resCollectionRef, where("Email", "==",user.email ));

    useEffect(() => {
        const getRes = async () => {
          const data = await getDocs(q);
          setRes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
    
        getRes();
      }, []);
     
      const Delete =async (s) =>{
        console.log(s);
        const docRef = doc(db, "reservations", s);
        deleteDoc(docRef)
        .then(() => {
          window.location.reload();
        })
        .catch(error => {
            console.log(error);
        })
        
      }
  return (
    <div className='reservation-container'> 
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Cod</TableCell>
            <TableCell align="right">Car</TableCell>
            <TableCell align="right">Data start</TableCell>
            <TableCell align="right">Time start</TableCell>
            <TableCell align="right">Data end</TableCell>
            <TableCell align="right">Time end</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {res.map((row) => {
            return (
               
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.Car}</TableCell>
                <TableCell align="right">{row.StartData}</TableCell>
                <TableCell align="right">{row.StartTime}</TableCell>
                <TableCell align="right">{row.EndData}</TableCell>
                <TableCell align="right">{row.EndTime}</TableCell>
                <TableCell align="right"><DeleteIcon id={row.id} onClick={ (e) => Delete(e.currentTarget.getAttribute('id'))}></DeleteIcon></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default MyReservations