
import React,{  useState,useContext,useEffect }  from "react"
import AppContext from "../../AppContext";
import { Link } from 'react-router-dom';
import {db} from '../../firebase';
export default function Login() {
  const myContext = useContext(AppContext);
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  useEffect(() => {
    myContext.toggleShowAdminMenu(true)
  });
  
  let isLoggedIn = myContext.valueIsLoggedIn;
  const logout= () => {
    myContext.toggleIsLoggedIn(false);
  }
  const login= () => {
    //myContext.toggleIsLoggedIn(true);
    checkLogin(inputs.usernametxt,inputs.passwordtxt);
  }



  const checkLogin = async(usernamevalue,passwordvalue)=>{
   db.collection("crusers").where("username", "==", usernamevalue).get()
   .then((querySnapshot) => {
       querySnapshot.forEach((doc) => {
           if(doc.data().password == passwordvalue){
            myContext.toggleIsLoggedIn(true);
           }else{
            myContext.toggleIsLoggedIn(false);
            //show message
            const spane = document.getElementById('spanerror');
            spane.textContent ="Invalid Login";
            spane.hidden=false;
           }
           
       });
   })
   .catch((error) => {
       console.log("Error getting documents: ", error);
   });



  }

  
  if(isLoggedIn != null && isLoggedIn){
    
    return(
    <div class="pcenter">
    <p className="pcenter text-success">
    <span id="spanerror">You have successfully logged in.  Click <Link to='/adminmain'><b>here</b> </Link> to view the main admin page</span>
    </p>
    </div>
    
    )
    
  }else{
    
    


  
  return(
    <form class="logindiv">
    <div class="form-outline mb-4">
      <h3>Admin Login</h3>
    </div>
  
    <div class="form-outline mb-4">
      <input type="text" name="usernametxt" class="form-control" onChange={handleChange} />
      <label class="form-label" for="form2Example1">User</label>
    </div>
  
    
    <div class="form-outline mb-4">
      <input type="password" name="passwordtxt" class="form-control" onChange={handleChange} />
      <label class="form-label" for="form2Example2">Password</label>
    </div>
  
    

    
  <div class="form-outline mb-4 text-center">
  <button type="button" class="btn btn-primary btn-block me-2" onClick={login}>Sign in</button>
  <Link to="/home"><button type="button" class="btn btn-danger btn-block me-2">Cancel</button></Link>
  </div>
  <p className="pcenter text-danger">
        <span id="spanerror"></span>
        </p>
  </form>
  
  );



    
    
    
    
  }
  

  

  
  

  
  
}