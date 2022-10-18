import React,{ useState, useEffect } from "react";
import {db} from '../../firebase';
import { useLocation } from 'react-router-dom';
import { FaStar,FaAtom,FaQuestion,FaTrash } from 'react-icons/fa';
import { collection, getDocs,addDoc } from "firebase/firestore";
import Modal from "react-bootstrap/Modal";
import firebaseAdmin from 'firebase/compat/app';
export default function Review() {
  const [currentreview, setCurrentReview] = useState([]);
  const [sideatracks, setSideATracks] = useState([]);
  const [sidebtracks, setSideBTracks] = useState([]);
  const [reviewcomments, setReviewComments] = useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const [inputs, setInputs] = useState({});
  function getTrackNumber(keynum){
    return ++keynum;
  }
  const hideModal = () => {
    setIsOpen(false);
  };
  const showModal = () => {
    setIsOpen(true);
  };
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if(inputs.username === undefined || inputs.username === ""){
        const spane = document.getElementById('spanerror');
        spane.textContent ="Please enter Name";
        spane.hidden=false;
        return false;
    }else if(inputs.userlocation === undefined || inputs.userlocation===""){
      const spane = document.getElementById('spanerror');
      spane.textContent ="Please enter Location";
      spane.hidden=false;
      return false;
    }
    //now we save it
    saveReview();
  }
  const saveReview = async()=>{
    await addDoc(collection(db, "crdataother"), {
      albumkey: currentreview.albumkey,
      approved: "false",
      usercomments: inputs.usercomments,
      userlocation:inputs.userlocation,
      username: inputs.username,
      userrating:inputs.userrating,
      dateentered:  firebaseAdmin.firestore.FieldValue.serverTimestamp()
    }).then(() =>{
        const spane = document.getElementById('spanerror');
        spane.textContent ="Review added. Once it has been approved it will be visible on the site.  Thank You";
        spane.hidden=false;
    }).catch((error) =>{
      const spane = document.getElementById('spanerror');
      spane.textContent ="Error adding review.  Please try again later";
      spane.hidden=false;
    })
    ;
  }

  useEffect(() => {
  
  const getReview = async()=>{
      
      //const query = await db.collection('crdata').where('albumkey', '==', location.state.reviewid).get();
      const query = await db.collection('crdata').where('albumkey', '==', location.state.reviewid).get();
      if (!query.empty) {
        const snapshot = query.docs[0];
        const data = snapshot.data();
        setCurrentReview(data);
        setSideATracks(data.albumsidea);
        setSideBTracks(data.albumsideb);
      }else{
      }
    }
    const getComments = async()=>{
      let test = location.state.reviewid
      const q = db.collection('crdataother').where('albumkey', '==', test).where('approved', '==', "true").orderBy("dateentered","desc");
      //const q = db.collection('crdataother').where('albumkey', '==', location.state.reviewid);
      if (!q.empty) {
        
        const querySnapshot = await getDocs(q);
        const newUserDataArray = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setReviewComments(newUserDataArray);
      }else{
      }
    }
    getReview();
    getComments();
  }, [location.state.reviewid]);

  
  if ((currentreview.albumcover) === undefined) {
    return(<div class="reviewnotfound"> <br /><br /><h1>Review Not Found</h1></div>);
  }else{
  return(
       
    <div class="reviewdiv"> 
    <div class="row1 row">

    <div class="test1 col-3">
    <img className='imagereview' src={currentreview.albumcover} alt=""/>

    </div>
    
    <div class="test2 col-9">
      <div class="rowband row">
        {currentreview.bandname}
      </div>
      <div class="rowtitle row">
        {currentreview.albumtitle}
      </div>
      <div class="rowlabel row">
        Released {currentreview.albumyear} on {currentreview.albumlabel}
      </div>
      
    </div>
    
    <div className="row3 row">
      <div className="ratingdiv" col-12>
        <br />
        <div class="rowrating row">
          
          <div class="rowrating col-2">RATING:</div>
          <div class={currentreview.albumrating > 0 ? "ratingnormal col-2":"ratingfaded col-2"}><FaStar/></div>
          <div class={currentreview.albumrating > 1 ? "ratingnormal col-2":"ratingfaded col-2"}><FaStar/></div>
          <div class={currentreview.albumrating > 2 ? "ratingnormal col-2":"ratingfaded col-2"}><FaStar/></div>
          <div class={currentreview.albumrating > 3 ? "ratingnormal col-2":"ratingfaded col-2"}><FaStar/></div>
          <div class={currentreview.albumrating > 4 ? "ratingnormal col-2":"ratingfaded col-2"}><FaStar/></div>
        </div>
        <br />
      </div>
    </div>
    <div className="row4 row">
    <div class="sidea col-5">
      <h1><u>Tracks</u></h1>
      <h1><u>Side A</u></h1>
      {
        
        Object.keys(sideatracks).map(e => {
          return(
          <div className="rowtracka row">
            <div class="col-10"> {getTrackNumber(e)}. {currentreview.albumsidea[e]}</div><div class="col-1">
              {currentreview.albumsidearatings[e] === 1 ? (<FaAtom/>) : currentreview.albumsidearatings[e] === 2 ? (<FaQuestion/>) : (<FaTrash/>)}</div>
          </div>)
          
        })
        
      }
    </div>
    <div class="sideb col-2">
    &nbsp;
    </div>
    <div class="sideb col-5">
    <h1>&nbsp;</h1>
      <h1><u>Side B</u></h1>
      {
        
        Object.keys(sidebtracks).map(e => {
          return(
          <div className="rowtracka row">
            <div class="col-10"> {getTrackNumber(e)}. {currentreview.albumsideb[e]}</div><div class="col-1"></div><div class="col-1">
              {currentreview.albumsidebratings[e] === 1 ? (<FaAtom/>) : currentreview.albumsidebratings[e] === 2 ? (<FaQuestion/>) : (<FaTrash/>)}</div>
          </div>)
          
        })
        
      }
    </div>
    </div>
    
    <div className="songkeydiv" col-12>
      <br />
      <div class="rowsongkey row">
          <div class="rating0 col-1">Key:</div>
          <div class="rating1 col-3"><FaAtom/>Repeat Worthy</div>
          <div class="rating2 col-3"><FaQuestion/>Need to Listen Again</div>
          <div class="rating3 col-4"><FaTrash/>Pray Your Machine Has Auto Skip</div>
      </div>
      <br />

    </div>
    <div className="reviewtextdiv" col-12>
      <br />
      <h1><u>Comments</u></h1>
      <div class="rowsongkey row">
          <p>
            {currentreview.albumreview}
          </p>
      </div>
      <br />

    </div>
    <div className="reviewlistuserdiv" col-12>
      <br />
      <div class="rowuserreviewstitle row">
      <div class="col-5"><h1><u>User Reviews</u></h1></div>
      <div class="col-5"></div>
      <div class="col-2"><button type="button" class="btn btn-primary me-3 text-nowrap" onClick={showModal}>Add Review</button></div>
      </div>
      <div class="rowuserreviewsheader row">
      <div class="col-5"><u>User</u></div><div class="col-2"><u>Rating</u></div><div class="col-5"><u>Comments</u></div>
      </div>
      {
      reviewcomments && reviewcomments.map(cass=>{

      return(
        <div class="rowuserreviewsodd row">
        <div class="col-5">{cass.username} ({cass.userlocation})</div>
        <div class="col-2">
        {Number(cass.userrating) === 1 ? (<span><FaStar/></span>) : Number(cass.userrating) === 2 ? (<span><FaStar/><FaStar/></span>) :
         Number(cass.userrating) === 3 ? (<span><FaStar/><FaStar/><FaStar/></span>) : Number(cass.userrating) === 4 ? (<span><FaStar/><FaStar/><FaStar/><FaStar/></span>) :
         (<span><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></span>)}
        </div>
        <div class="col-5">{cass.usercomments}</div>
        </div>
    )
  })
}


      <br />
      
    </div>
    </div>
    <Modal show={isOpen} onHide={hideModal} size='sm'>
      <Modal.Header>Add Review</Modal.Header>
      <Modal.Body>
        <p className="pcenter text-danger">
        <span id="spanerror"></span>
        </p>
        <p>Name</p>
        <p><input type="text" name="username" value={inputs.username || ""} 
        onChange={handleChange}/></p>
        <p>Location</p>
        <p><input type="text" name="userlocation" value={inputs.userlocation || ""} 
        onChange={handleChange}/></p>
        <p>Rating</p>
        <p>
          <select name="userrating" value={inputs.userrating || ""} 
          onChange={handleChange}>
            <option value="1">1 STAR</option>
            <option value="2">2 STARS</option>
            <option value="3">3 STARS</option>
            <option value="4">4 STARS</option>
            <option value="5">5 STARS</option>
            
          </select>
            
        </p>
        <p>User Comments</p>
        <p><textarea name="usercomments" maxLength={300}value={inputs.usercomments || ""} 
        onChange={handleChange}/></p>

        
      </Modal.Body>
      <Modal.Footer><button type="button" class="btn btn-primary me-3 text-nowrap" onClick={handleSubmit}>ADD</button> <button type="button" class="btn btn-danger me-3 text-nowrap" 
      onClick={hideModal} >CANCEL</button></Modal.Footer>
  </Modal> 
</div>
   
    
    
  )
    
  }
}