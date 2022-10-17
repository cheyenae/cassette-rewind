import React,{ useState } from "react";
import {db} from '../../firebase';
import { FaAtom,FaQuestion,FaTrash } from 'react-icons/fa';
import { collection, addDoc,doc,updateDoc } from "firebase/firestore";
import Modal from "react-bootstrap/Modal";
import firebaseAdmin from 'firebase/compat/app';
export default function NewReview() {
  const [sideatracks, setSideATracks] = useState([]);
  const [sidebtracks, setSideBTracks] = useState([]);
  let [sideatracksratings] = useState([]);
  let [sidebtracksratings] = useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputs, setInputs] = useState({});
  const [currentside,setCurrentSide] = useState([]);
  const [currenttracknumber,setCurrentTrackNumber] = useState([]);
  const [addedit, setAddEdit] = useState(["add"]);
  const [itemdeleted, setItemDeleted] = useState(false);
  let albumkey= -1
  let albumkeydocid=''
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
          setInputs(values => ({...values, "trackrating" : sideatracksratings[snum]}))
        }else{
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
          setInputs(values => ({...values, "trackrating" : sidebtracksratings[snum]}))
        }else{
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
      let ratingarray = sideatracksratings;
      sideatracksratings = ratingarray;
    }else{
      let arraytest = sidebtracks;
      setSideBTracks(arraytest);
      //now the ratings
      let ratingarray = sidebtracksratings;
      sidebtracksratings = ratingarray;
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
        sideatracksratings[currenttracknumber]=inputs.trackrating;
      }else{
        let currenttrack="";
        //currenttrack.tracknumber=sideatracks.length+1;
        currenttrack=inputs.tracktitle;
        sideatracks[sideatracks.length]=currenttrack;
        sideatracksratings[sideatracksratings.length]=inputs.trackrating;
      }
      
        
    }else{
      if(addedit === "edit"){
        sidebtracks[currenttracknumber] = inputs.tracktitle;
        sidebtracksratings[currenttracknumber]=Number(inputs.trackrating);
      }else{
        let currenttrack="";
        //currenttrack.tracknumber=sideatracks.length+1;
        currenttrack=inputs.tracktitle;
        sidebtracks[sidebtracks.length]=currenttrack;
        sidebtracksratings[sidebtracksratings.length]=Number(inputs.trackrating);
      }
        
    }
    hideModal();
    
  }
  function updateNextKey(){
    const data = {};
    const docRef = doc(db, "crkeys",albumkeydocid)
    
    data["albumkey"] = ++albumkey;
    updateDoc(docRef,data
    ).then(() =>{
        
    }).catch((error) =>{
      alert("testing" + error)
    })
    ;
  }

  const saveReview = async()=>{
    const data = {};
    if(inputs.txttitle !== undefined){
      data["albumtitle"] = inputs.txttitle;
    }
    if(inputs.txtalbumcover !== undefined){
      data["albumcover"] = inputs.txtalbumcover;
    }
    if(inputs.txtalbumlabel !== undefined){
      data["albumlabel"] = inputs.txtalbumlabel;
    }
    if(inputs.txtalbumyear !== undefined){
      data["albumyear"] = inputs.txtalbumyear;
    }
    if(inputs.txtbandname !== undefined){
      data["bandname"] = inputs.txtbandname;
    }
    if(inputs.selrating !== undefined){
      data["albumrating"] = inputs.selrating;
    }
    if(inputs.txtalbumcomments !== undefined){
      data["albumreview"] = inputs.txtalbumcomments;
    }
    if(sideatracks.length > 0){
      data["albumsidea"] = sideatracks;
      data["albumsidearatings"] = sideatracksratings;
    }
    if(sidebtracks.length > 0){
      data["albumsideb"] = sidebtracks;
      data["albumsidebratings"] = sidebtracksratings
    }
    data["reviewdate"] = firebaseAdmin.firestore.FieldValue.serverTimestamp();

    const query = await db.collection('crkeys').get();
    const snapshot = query.docs[0];
    const data2 = snapshot.data();
    albumkeydocid = snapshot.id
    albumkey = data2.albumkey
    data["albumkey"] = albumkey
    //const docRef = doc(db, "crdata", docid);
    //await updateDoc(docRef,data
    await addDoc(collection(db, "crdata"), data
    ).then(() =>{
        const spane = document.getElementById('spansuccess');
        spane.textContent ="REVIEW ADDED";
        spane.hidden=false;
        //update key field by one
        updateNextKey()
    }).catch((error) =>{
      alert(error)
      const spane = document.getElementById('spansuccess');
      spane.textContent ="Error adding review.  Please try again later";
      spane.hidden=false;
    })
    ;
  }



  

  return(
       
    <div class="reviewdiv"> 
    <div class="row1 row">
    <div class="test col-5">
        <h5>ALBUM COVER:</h5>
    </div>
    <div class="row1 col-7">
        <input type="text" class="outerinput" name="txtalbumcover" onChange={handleChange}></input>
    </div>
    </div>
    <div class="row2 row">
    <div class="test col-5">
        <h5>BAND/ARTIST NAME:</h5>
    </div>
    <div class="row2 col-7">
        <input type="text" class="outerinput" name="txtbandname" onChange={handleChange}></input>
    </div>
    </div>
    <div class="row3 row">
    <div class="test col-5">
        <h5>ALBUM TITLE:</h5>
    </div>
    <div class="row3 col-7">
        <input type="text" class="outerinput" name="txttitle" onChange={handleChange}></input>
    </div>
    </div>
    <div class="row4 row">
    <div class="test col-5">
        <h5>RELEASE YEAR:</h5>
    </div>
    <div class="row4 col-7">
        <input type="text" class="outerinput" name="txtalbumyear" onChange={handleChange} ></input>
    </div>
    </div>
    <div class="row5 row">
    <div class="test col-5">
        <h5>LABEL:</h5>
    </div>
    <div class="row5 col-7">
        <input type="text" class="outerinput" name="txtalbumlabel" onChange={handleChange} ></input>
    </div>
    </div>
    <div class="row6 row">
    <div class="test col-5">
        <h5>RATING:</h5>
    </div>
    <div class="row6 col-7">
        <select name="selrating" class="outerinput" onChange={handleChange}>
            <option value="1" selected>1 STAR</option>
            <option value="2">2 STAR</option>
            <option value="3">3 STAR</option>
            <option value="4">4 STAR</option>
            <option value="5">5 STAR</option>
        </select>
    </div>
    </div>
    <div class="row5 row">
    <div class="test col-5">
        <h5>COMMENTS:</h5>
    </div>
    <div class="row5 col-7">
        <textarea rows="5" cols="100" class="outerinput" name="txtalbumcomments" onChange={handleChange}></textarea>
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
            <div class="col-6"> {sideatracks[e]}</div>
            <div class="col-2" style={{textAlign: "center"}}> {sideatracksratings[e] == 1 ? (<FaAtom/>) : sideatracksratings[e] == 2 ? (<FaQuestion/>) : (<FaTrash/>)}</div>
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
            <div class="col-6"> {sidebtracks[e]}</div>
            <div class="col-2" style={{textAlign: "center"}}> {sidebtracksratings[e] == 1 ? (<FaAtom/>) : sidebtracksratings[e] == 2 ? (<FaQuestion/>) : (<FaTrash/>)}</div>
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