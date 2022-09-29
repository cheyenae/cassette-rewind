import React,{ useState, useEffect } from "react";
import {db} from '../../firebase';
import { useLocation } from 'react-router-dom';
import { FaAtom,FaQuestion,FaTrash } from 'react-icons/fa';
import {  getDocs,updateDoc,doc } from "firebase/firestore";
import Modal from "react-bootstrap/Modal";
export default function EditReview() {
  const [currentreview, setCurrentReview] = useState([]);
  const [sideatracks, setSideATracks] = useState([]);
  const [sidebtracks, setSideBTracks] = useState([]);
  const [reviewcomments, setReviewComments] = useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const [inputs, setInputs] = useState({});
  const [currentside,setCurrentSide] = useState([]);
  const [currenttracknumber,setCurrentTrackNumber] = useState([]);
  const [addedit, setAddEdit] = useState(["add"]);
  const [itemdeleted, setItemDeleted] = useState(false);
  const [docid, setDocId] = useState();
  function getTrackNumber(keynum){
    return ++keynum;
  }
  const hideModal = () => {
    setIsOpen(false);
  };
  function showModal (snum,sside,ae)  {
    setAddEdit(ae);
    if(sside === "a"){
      setCurrentSide("a");
        if(ae === "edit"){
          setCurrentTrackNumber(snum);
          const currenttrack = sideatracks[snum];
          setInputs(values => ({...values, "tracknumber" : getTrackNumber(snum)}))
          setInputs(values => ({...values, "tracktitle" : currenttrack}))
          setInputs(values => ({...values, "trackrating" : currentreview.albumsidearatings[snum]}))
        }else{
          const currenttrack = null;
          setInputs(values => ({...values, "tracknumber" : sideatracks.length+1}))
          setInputs(values => ({...values, "tracktitle" : ""}))
          setInputs(values => ({...values, "trackrating" : 1}))
        }
        setIsOpen(true);
    }else{
        setCurrentSide("b");
        if(ae === "edit"){
          setCurrentTrackNumber(snum);
          const currenttrack = sidebtracks[snum];
          setInputs(values => ({...values, "tracknumber" : getTrackNumber(snum)}))
          setInputs(values => ({...values, "tracktitle" : currenttrack}))
          setInputs(values => ({...values, "trackrating" : currentreview.albumsidebratings[snum]}))
        }else{
          const currenttrack = null;
          setInputs(values => ({...values, "tracknumber" : sidebtracks.length+1}))
          setInputs(values => ({...values, "tracktitle" : ""}))
          setInputs(values => ({...values, "trackrating" : 1}))
        }
        
        setIsOpen(true);
    }
    
  };
  function toggleIsDeleted(){
    if(itemdeleted){
      setItemDeleted(false);
    }else{
      setItemDeleted(true);
    }
  }
  function deleteTrack(sside,tnum){
    if(sside === "a"){
      let arraytest = sideatracks;
      setSideATracks(arraytest);
      //now the ratings
      let ratingarray = currentreview.albumsidearatings;
      currentreview.albumsidearatings = ratingarray;
    }else{
      let arraytest = sidebtracks;
      setSideBTracks(arraytest);
      //now the ratings
      let ratingarray = currentreview.albumsidebratings;
      currentreview.albumsidebratings = ratingarray;
    }
    toggleIsDeleted();
    
  }
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  const handleSubmitEditTrackA  = (event) => {
    event.preventDefault();
    if(currentside === "a"){
      if(addedit === "edit"){
        sideatracks[currenttracknumber] = inputs.tracktitle;
        currentreview.albumsidearatings[currenttracknumber]=inputs.trackrating;
      }else{
        let currenttrack="";
        //currenttrack.tracknumber=sideatracks.length+1;
        currenttrack=inputs.tracktitle;
        sideatracks[sideatracks.length]=currenttrack;
        currentreview.albumsidearatings[currentreview.albumsidearatings.length]=inputs.trackrating;
      }
      
        
    }else{
      if(addedit === "edit"){
        sidebtracks[currenttracknumber] = inputs.tracktitle;
        currentreview.albumsidebratings[currenttracknumber]=Number(inputs.trackrating);
      }else{
        let currenttrack="";
        //currenttrack.tracknumber=sideatracks.length+1;
        currenttrack=inputs.tracktitle;
        sidebtracks[sidebtracks.length]=currenttrack;
        currentreview.albumsidebratings[currentreview.albumsidebratings.length]=Number(inputs.trackrating);
      }
        
    }
    hideModal();
    
  }
  const saveReview = async()=>{
    const data = {};
    if(inputs.txttitle != undefined){
      data["albumtitle"] = inputs.txttitle;
    }
    if(inputs.txtalbumcover != undefined){
      data["albumcover"] = inputs.txtalbumcover;
    }
    if(inputs.txtalbumlabel != undefined){
      data["albumlabel"] = inputs.txtalbumlabel;
    }
    if(inputs.txtalbumyear != undefined){
      data["albumyear"] = inputs.txtalbumyear;
    }
    if(inputs.txtbandname != undefined){
      data["bandname"] = inputs.txtbandname;
    }
    if(inputs.selrating != undefined){
      data["albumrating"] = inputs.selrating;
    }
    if(inputs.txtalbumcomments != undefined){
      data["albumreview"] = inputs.txtalbumcomments;
    }
    if(sideatracks.length > 0){
      data["albumsidea"] = sideatracks;
      data["albumsidearatings"] = currentreview.albumsidearatings;
    }
    if(sidebtracks.length > 0){
      data["albumsideb"] = sidebtracks;
      data["albumsidebratings"] = currentreview.albumsidebratings;
    }
    const docRef = doc(db, "crdata", docid);
    await updateDoc(docRef,data
    ).then(() =>{
        const spane = document.getElementById('spansuccess');
        spane.textContent ="REVIEW UPDATED";
        spane.hidden=false;
    }).catch((error) =>{
      const spane = document.getElementById('spansuccess');
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
        setDocId(snapshot.id);
      }else{
      }
    }
    const getComments = async()=>{
      const q = db.collection('crdataother').where('albumkey', '==', location.state.reviewid).where('approved', '==', true).orderBy("dateentered","desc");
      //const q = db.collection('crdataother').where('albumkey', '==', location.state.reviewid);
      if (!q.empty) {
        
        const querySnapshot = await getDocs(q);
        const newUserDataArray = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        //setReviewComments(newUserDataArray);
      }else{
      }
    }
    getReview();
    //getComments();
  }, []);

  
  if ((currentreview.albumcover) === undefined) {
    return(<div class="reviewnotfound"> <br /><br /><h1>Review Not Found</h1></div>);
  }else{
  return(
       
    <div class="reviewdiv"> 
    <div class="row1 row">
    <div class="test col-5">
        <h5>ALBUM COVER:</h5>
    </div>
    <div class="row1 col-7">
        <input type="text" class="outerinput" name="txtalbumcover" onChange={handleChange} defaultValue={currentreview.albumcover}></input>
    </div>
    </div>
    <div class="row2 row">
    <div class="test col-5">
        <h5>BAND/ARTIST NAME:</h5>
    </div>
    <div class="row2 col-7">
        <input type="text" class="outerinput" name="txtbandname" onChange={handleChange} defaultValue={currentreview.bandname}></input>
    </div>
    </div>
    <div class="row3 row">
    <div class="test col-5">
        <h5>ALBUM TITLE:</h5>
    </div>
    <div class="row3 col-7">
        <input type="text" class="outerinput" name="txttitle" onChange={handleChange} defaultValue={currentreview.albumtitle}></input>
    </div>
    </div>
    <div class="row4 row">
    <div class="test col-5">
        <h5>RELEASE YEAR:</h5>
    </div>
    <div class="row4 col-7">
        <input type="text" class="outerinput" name="txtalbumyear" onChange={handleChange} defaultValue={currentreview.albumyear}></input>
    </div>
    </div>
    <div class="row5 row">
    <div class="test col-5">
        <h5>LABEL:</h5>
    </div>
    <div class="row5 col-7">
        <input type="text" class="outerinput" name="txtalbumlabel" onChange={handleChange} defaultValue={currentreview.albumlabel}></input>
    </div>
    </div>
    <div class="row6 row">
    <div class="test col-5">
        <h5>RATING:</h5>
    </div>
    <div class="row6 col-7">
        <select name="selrating" class="outerinput" onChange={handleChange}>
            <option value="1" selected= {currentreview.albumrating == 1 ? "selected":""}>1 STAR</option>
            <option value="2"  selected= {currentreview.albumrating == 2 ? "selected":""}>2 STAR</option>
            <option value="3"  selected= {currentreview.albumrating == 3 ? "selected":""}>3 STAR</option>
            <option value="4"  selected= {currentreview.albumrating == 4 ? "selected":""}>4 STAR</option>
            <option value="5"  selected= {currentreview.albumrating == 5 ? "selected":""}>5 STAR</option>
        </select>
    </div>
    </div>
    <div class="row5 row">
    <div class="test col-5">
        <h5>COMMENTS:</h5>
    </div>
    <div class="row5 col-7">
        <textarea rows="5" cols="100" class="outerinput" name="txtalbumcomments" onChange={handleChange} defaultValue={currentreview.albumreview}></textarea>
    </div>
    </div>
    <br /><br />
    <div class="rowwhite row">
    <div class="rowwhite col-10">
      <div class="rowband row">
        <h5>SIDE A</h5>
      </div>

    </div>
    
    <div class="test2 col-2">
      <div class="rowband row">
        <button type="button" class="btn btn-primary me-3 text-nowrap btn-sm"   onClick={() => showModal(0,'a','add')}>ADD SONG</button>
      </div>
    </div>
    </div>
<br />
    <div class="row9 row">
    <div class="test2 col-1">
      <div class="rowband row">
        <h5>#</h5>
      </div>
    </div>
    <div class="test2 col-6">
      <div class="rowband row">
        <h5>SONG TITLE</h5>
      </div>
    </div>
    <div class="test2 col-2">
      <div class="rowband row"  style={{textAlign: "center"}}>
        <h5>RATING</h5>
      </div>
    </div>
    <div class="test2 col-3">
      <div class="rowband row" style={{textAlign: "center"}}>
        <h5>OPTIONS</h5>
      </div>
    </div>
    </div>
    {
        
        Object.keys(sideatracks).map(e => {
          return(
          <div className="rowtracka row">
            <div class="col-1"> {getTrackNumber(e)}.</div>
            <div class="col-6"> {currentreview.albumsidea[e]}</div>
            <div class="col-2" style={{textAlign: "center"}}> {currentreview.albumsidearatings[e] == 1 ? (<FaAtom/>) : currentreview.albumsidearatings[e] == 2 ? (<FaQuestion/>) : (<FaTrash/>)}</div>
            <div class="col-3" style={{textAlign: "center"}}> <button type="button" class="btn btn-warning me-3 text-nowrap btn-sm"  onClick={() => showModal(e,'a','edit')}>EDIT</button>
            &nbsp;<button type="button" class="btn btn-danger me-3 text-nowrap btn-sm"  onClick={() => deleteTrack('a',e)}>DELETE</button></div>
          </div>)
          
        })
        
      }
<br /><br />
    <div class="rowwhite row">
    <div class="rowwhite col-10">
      <div class="rowband row">
        <h5>SIDE B</h5>
        
      </div>
    </div>
    
    <div class="test2 col-2">
      <div class="rowband row">
        <button type="button" class="btn btn-primary me-3 text-nowrap btn-sm"  onClick={() => showModal(0,'b','add')}>ADD SONG</button>
      </div>
    </div>
    </div>
    <br />
    <div class="row9 row">
    <div class="test2 col-1">
      <div class="rowband row">
        <h5>#</h5>
      </div>
    </div>
    <div class="test2 col-6">
      <div class="rowband row">
        <h5>SONG TITLE</h5>
      </div>
    </div>
    <div class="test2 col-2">
      <div class="rowband row"  style={{textAlign: "center"}}>
        <h5>RATING</h5>
      </div>
    </div>
    <div class="test2 col-3">
      <div class="rowband row" style={{textAlign: "center"}}>
        <h5>OPTIONS</h5>
      </div>
    </div>
    </div>
    {
        
        Object.keys(sidebtracks).map(e => {
          return(
          <div className="rowtracka row">
            <div class="col-1"> {getTrackNumber(e)}.</div>
            <div class="col-6"> {currentreview.albumsideb[e]}</div>
            <div class="col-2" style={{textAlign: "center"}}> {currentreview.albumsidebratings[e] == 1 ? (<FaAtom/>) : currentreview.albumsidebratings[e] == 2 ? (<FaQuestion/>) : (<FaTrash/>)}</div>
            <div class="col-3" style={{textAlign: "center"}}> 
            <button type="button" class="btn btn-warning me-3 text-nowrap btn-sm"  onClick={() => showModal(e,'b','edit')}>EDIT</button>
            &nbsp;<button type="button" class="btn btn-danger me-3 text-nowrap btn-sm"  onClick={() => deleteTrack('b',e)}>DELETE</button></div>
          </div>)
          
        })
        
      }
<br /><br />

 <div class="pcenterbutton row">
    <button type="button" class="btn btn-secondary btn-lg" onClick={saveReview}>UPDATE REVIEW</button>
</div>   

<br /><br />

<div class="pcenterbuttonmessage row">
    <p className="pcenter text-success">
    <h3><span id="spansuccess"></span></h3>
    </p>
  </div> 


    <Modal show={isOpen} onHide={hideModal} size='sm'>
      <Modal.Header>EDIT TRACK</Modal.Header>
      <Modal.Body>
        <p className="pcenter text-danger">
        <span id="spanerror"></span>
        </p>
        <p>TRACK NUMBER</p>
        <p><input type="text" name="tracknumber" value={inputs.tracknumber || ""} 
        onChange={handleChange}/></p>
        <p>TRACK TITLE</p>
        <p><input type="text" name="tracktitle" value={inputs.tracktitle || ""} 
        onChange={handleChange}/></p>
        <p>Rating</p>
        <p>
          <select name="trackrating" value={inputs.trackrating || ""} 
          onChange={handleChange}>
            <option value="1">Repeat Worthy</option>
            <option value="2">Need to Listen Again</option>
            <option value="3">Pray Your Machine Has Auto Skip</option>
          </select>
            
        </p>
        

        
      </Modal.Body>
      <Modal.Footer><button type="button" class="btn btn-primary me-3 text-nowrap" onClick={handleSubmitEditTrackA }>Add</button> <button type="button" class="btn btn-danger me-3 text-nowrap" 
      onClick={hideModal} >Cancel</button></Modal.Footer>
  </Modal> 
</div>
   

    
  )
    
  }
}