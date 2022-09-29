import React,{ useState, useEffect } from "react";
import {db} from '../../firebase';
//import { getDatabase, ref, onValue} from "firebase/database";
import { collection, getDocs,query, orderBy, limit } from "firebase/firestore";
import { Link } from 'react-router-dom';


export default function LatestReviews() {
  const [cassettes, setCassettes] = useState([]);



  const getCassettes = async()=>{

    //const querySnapshot = await getDocs(collection(db, "crdata"));
    const q = query(collection(db, "crdata"), orderBy("reviewdate","desc"), limit(5));
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
          
          <tr  align="center"><th colSpan={4}><br /><h2>LATEST REVIEWS</h2></th></tr>
        <tr>
        <th scope="col"></th>
          <th scope="col">BAND</th>
          <th scope="col">TITLE</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {

cassettes && cassettes.map(cass=>{

  return(
        <tr key={cass.albumkey}>
          <td><img width='75' height='75' src={cass.albumcover} alt="NO IMAGE AVAILABLE"/></td>
          <td>{cass.bandname}</td>
          <td>{cass.albumtitle}</td>
          <td><Link to="/reviewdetails" state={{reviewid: cass.albumkey }}><button type="button" class="btn btn-dark">VIEW DETAILS</button></Link></td>
        </tr>
  )

})


}
</tbody>
</table>
      
    </div>
  );
        }