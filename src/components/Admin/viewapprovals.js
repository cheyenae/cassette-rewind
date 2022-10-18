import React,{ useState, useEffect } from "react";
import {db} from '../../firebase';
import { FaStar } from 'react-icons/fa';
import {  getDocs ,updateDoc,doc,deleteDoc } from "firebase/firestore";

export default function ViewApprovals() {
    const [reviewcomments, setReviewComments] = useState([]);
    
    useEffect(() => {
      const getComments = async()=>{
        const q = db.collection('crdataother').where('approved', '==', "false").orderBy("dateentered","desc");
        //const q = db.collection('crdataother').where('albumkey', '==', location.state.reviewid);
        if (!q.empty) {
          
          const querySnapshot = await getDocs(q);
          const newUserDataArray = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setReviewComments(newUserDataArray);
          console.log(reviewcomments);
        }else{
        }
      }
      getComments();
    }, []);
    const getComments2 = async()=>{
        const q = db.collection('crdataother').where('approved', '==', "false").orderBy("dateentered","desc");
        //const q = db.collection('crdataother').where('albumkey', '==', location.state.reviewid);
        if (!q.empty) {
          
          const querySnapshot = await getDocs(q);
          const newUserDataArray = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setReviewComments(newUserDataArray);
          console.log(reviewcomments);
        }else{
        }
      }
    
      const approveComments = async(rid,value)=>{
        const data = {};
        const docRef = doc(db, "crdataother", rid);
        data["approved"]=value;
        await updateDoc(docRef,data
            ).then(() =>{
                const spane = document.getElementById('spansuccess');
                spane.textContent ="COMMENTS APPROVED";
                spane.hidden=false;
            }).catch((error) =>{
              const spane = document.getElementById('spansuccess');
              spane.textContent ="Error approving comments.  Please try again later";
              spane.hidden=false;
             
            });
      }
      const rejectComments = async(rid)=>{
        const docRef = doc(db, "crdataother", rid);
        await deleteDoc(docRef)
        .then(() =>{
                const spane = document.getElementById('spansuccess');
                spane.textContent ="COMMENTS REJECTED";
                spane.hidden=false;
            }).catch((error) =>{
              const spane = document.getElementById('spansuccess');
              spane.textContent ="Error rejecting comments.  Please try again later";
              spane.hidden=false;
              console.log(error);
            });
      }
    function approveRejectRequest(rid,value){
        
        if(value === "true"){
            approveComments(rid,value);
        }else{
            rejectComments(rid);
        }
        getComments2();
    }
    if ((reviewcomments) === undefined) {
        return(<div class="reviewnotfound"> <br /><br /><h1>Review Not Found</h1></div>);
    }else{
      return(
        <div class="approvalsdiv">
        <div className="reviewlistuserdiv" col-12>
            <div class="pcenterbuttonmessage row">
                <p className="pcenter text-success">
                <h3><span id="spansuccess"></span></h3>
            </p>
    </div> 
        <br />
        <div class="rowuserreviewstitle row">
        <div class="col-6"><h1><u>User Reviews</u></h1></div>
        <div class="col-6"></div>
        </div>
        <div class="rowuserreviewsheader row">
        <div class="col-3"><u>User</u></div><div class="col-2"><u>Rating</u></div><div class="col-4"><u>Comments</u></div><div class="col-3"></div>
        </div>
        {
        reviewcomments && reviewcomments.map(cass=>{
  
        return(
          <div class="rowuserreviewsodd row">
          <div class="col-3">{cass.username} ({cass.userlocation})</div>
          <div class="col-2">
          {Number(cass.userrating) === 1 ? (<span><FaStar/></span>) : Number(cass.userrating) === 2 ? (<span><FaStar/><FaStar/></span>) :
           Number(cass.userrating) === 3 ? (<span><FaStar/><FaStar/><FaStar/></span>) : Number(cass.userrating) === 4 ? (<span><FaStar/><FaStar/><FaStar/><FaStar/></span>) :
           (<span><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></span>)}
          </div>
          <div class="col-4">{cass.usercomments}</div>
          <div class="col-3"><button type="button" class="btn btn-success btn-sm" onClick={() => approveRejectRequest(cass.id,'true')}>APPROVE</button>&nbsp;&nbsp;&nbsp;
          <button type="button" class="btn btn-danger btn-sm" onClick={() => approveRejectRequest(cass.id,'false')}>REJECT</button>
          </div>
          </div>
      )
    })
  }
  
  
      </div>
      </div>
        )
    }
}
    