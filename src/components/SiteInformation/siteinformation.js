import React, { useContext,useEffect } from 'react';
import imagelogin from './../../assets/login.PNG';
import imageadminmain from './../../assets/adminmain.PNG';
import imageapprovals from './../../assets/approvals.PNG';
import imageedit from './../../assets/edit.PNG';
import { Link } from 'react-router-dom';
import AppContext from "../../AppContext";

export default function SiteInformation() {
  
  const myContext = useContext(AppContext);
  useEffect(() => {
    myContext.toggleShowAdminMenu(false)
  });

      return(
        
          <div>
            


      <div className="d-flex justify-content-start">
      <p className="pgutter">
        This site was created as stated on the main page, as a tribute to a long lost media.  Besides that it was created to increase my skills (React and Bootstrap)
        and to increase my knowledge in some technologies that were new to me.(Firebase and Visual Studio Code)
        <br /><br />
        This site functions using the following main features (other features are used but not as prominent):<br />
          <ul>
              <li>React JS (18.2)</li>
              <li>React-Router-Dom (6)</li>
              <li>Bootstrap (5.2)</li>
              <li>Firebase (9.9)</li>
              <li>Visual Studio Code (1.72)</li>
              <li>Font Awesome</li>
          </ul>
          <br /><br />
        This site contains a public facing Blog Site which gives the user the following options
          <ul>
            <li>Options to View Lastest Reviews or the Review List which contains all reviews</li>
            <li>New Reviews are added weekly</li>
            <li>Option for a user to add their own review of the cassette.  Name and location are required to add a review.  All reviews will need to be approved
              before they will show live on the site
            </li>
          </ul>
          <br /><br />
        In addition to the public facing side, there is an admin portal that is secured by using a protected route custom class.  The login for the admin site is protected
         by login and password combination that is verfied in the Firebase database.
         <br /><br />
         <div className="imagecenter">
            <img
            src={imagelogin}
            alt="Info"
            style={{
              width: 600
            }}
          />
          </div>
          <br /><br />
          Upon successfully validation of the username and password with the Firebase database, the admin will have the following options available
          <div className="imagecenter">
            <img
            src={imageadminmain}
            alt="Info"
            style={{
              width: 600
            }}
          />
          </div>
          <br /><br />
        The Approvals screen shows the admin, all user reviews awaiting approval and the data they submitted.  The admin can one click approve and reject each review.
        <br /><br />
         <div className="imagecenter">
            <img
            src={imageapprovals}
            alt="Info"
            style={{
              width: 600
            }}
          />
          </div>
          <br /><br />
        Under the Review List, the admin can edit(quite similar to the add screen) an existing review.  On the edit screen, the admin can edit the following SiteInformation
        <ul>
          <li>Album Cover</li>
          <li>Band and Album Title</li>
          <li>Release Year and Label</li>
          <li>Rating and Review Comments</li>
          <li>Songs and Ratings for Side A and Side B</li>
        </ul>
        <br /><br />
        <div className="imagecenter">
            <img
            src={imageedit}
            alt="Info"
            style={{
              width: 600
            }}
          />
          </div>
          <br /><br />
          This site was staged and hosted using a GitHub repository and netlify.
          <br /><br />
          Is this site a work of art, no, I do not claim to be an Artist.  Is this site coded, tested and hosted using some the latest technologies, yes.  I have now 
          continue on to start picking apart the monolith site that I currently look after at work and break it done in smaller react apps that will use a docker system
          and microservices.
          <br /><br />
          If you would like to contact me then please send a message through <a class="text-reset fw-bold" href="https://www.linkedin.com/in/rodney-batten-ab7a67244/">LinkedIn</a>
    </p>
      </div>
      </div>
      )
  
}