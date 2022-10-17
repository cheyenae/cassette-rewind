import React,{ useState, useEffect } from "react";
import {db} from '../../firebase';
//import { getDatabase, ref, onValue} from "firebase/database";
import { collection, getDocs,query, orderBy } from "firebase/firestore";
import { Link } from 'react-router-dom';

export default function AdminList() {
    const [cassettes, setCassettes] = useState([]);
  
  
  
    const getCassettes = async()=>{
  
      //const querySnapshot = await getDocs(collection(db, "crdata"));
      const q = query(collection(db, "crdata"), orderBy("albumkey","desc"));
      const querySnapshot = await getDocs(q);
      const newUserDataArray = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
  
          setCassettes(newUserDataArray);
      
      
  }
  useEffect(() => {
    getCassettes();
  }, []);
  
  
    return (
      <div class="d-flex flex-wrap justify-content-center">
        <table class="table table-striped w-75 px-1">
          <thead class="thead-dark">
          <tr>
          <th scope="col" width="10%"></th>
            <th scope="col" width="25%">BAND</th>
            <th scope="col" width="25%">TITLE</th>
            <th width="35%"></th>
          </tr>
        </thead>
        <tbody>
        {
  
  cassettes && cassettes.map(cass=>{
  
    return(
          <tr key={cass.albumkey}>
            <td><img width='75' height='75' src={cass.albumcover} alt=""/></td>
            <td>{cass.bandname}</td>
            <td>{cass.albumtitle}</td>
            <td>
                <Link to="/reviewdetails" state={{reviewid: cass.albumkey }}><button type="button" class="btn btn-dark">VIEW DETAILS</button></Link>
                &nbsp;&nbsp;&nbsp;<Link to="/editreview" state={{reviewid: cass.albumkey }}><button type="button" class="btn btn-dark">EDIT REVIEW</button></Link>
            </td>
          </tr>
    )
  
  })
  
  
  }
  </tbody>
  </table>
        
      </div>
    );
          }