import React, { useContext,useEffect } from 'react';
import image1 from './../../assets/walkman.png';
import image2 from './../../assets/walkman2.png';
import { Link } from 'react-router-dom';
import AppContext from "../../AppContext";
export default function Home()  {
  
    const myContext = useContext(AppContext);
    useEffect(() => {
      myContext.toggleShowAdminMenu(false)
    });
  
        return(
          
            <div>
              
            <div className="imageright">
            <img
            src={image1}
            alt="Info"
            style={{
              width: 200
            }}
          /><br /><br /><br /><br />
          <Link to='/adminlogin'><img
            src={image2}
            alt="Info"
            style={{
              width: 200
            }}
          /></Link>    
        </div>

        <div className="d-flex justify-content-start">
        <p className="pgutter">
        This site is a tribute to the long lost music format, the <b> CASSETTE TAPE</b>.&nbsp;&nbsp;Around since the sixties, the format's popularity grew in the 
        seventies and eighties and decline in the nineties with the rise of compact discs.&nbsp;&nbsp;All cassettes featured on this site were originally purchased in the
        eighties.
        <br /> <br />
        To make the listening of these classic cassettes more authenticate, I have dusted off a sony walkman and vintage eighties headphones.&nbsp;&nbsp;There will be
        no Beats, JBL or Skullcandy used, just a plain pair of headphones that probably were purchased at KMART or Zellers.  See image to the right for example of the 
        classic walman and headphones.
        <br /> <br />
        These reviews will not be your comprehensive type of review of every note and solo.  &nbsp;&nbsp;There is a simple format for each review.  First, it will show the details of each cassette.  This 
        includes band, title, label, year of release and an image of the front cover if possible.  &nbsp;&nbsp;In addition, it will list the songs on each side of the cassette .
        Next, &nbsp;it will break the songs up into three categories: 
        <ul>
        <li>Repeat Worthy: Excellent song worth additional repeat listens</li>
        <li>On the Fence: Need another few listens to determine if it goes up in rating or drops in rating</li>
        <li>Automatic Music Search: If you are lucky enough to have AMS then click the button, &nbsp;if not then hit the fast forward button</li>
        </ul>
        
        Finally, it will give a five star rating for the overall cassette and a few comments.  &nbsp;&nbsp;In addition, there will be a section where comments can be added.  You are required
        to enter your name, location and comments up to a 500 character limit.  &nbsp;&nbsp;These comments will be reviewed before they are shown on the site.  &nbsp;&nbsp;Once they are deemed appropriate
        they will show on the comments section for that cassette.
        <br /> <br />
        Please remember these reviews are just done for pure love of music and everyone has their right to their own opinions about that music.
        <br /> <br />
        Now on to the reviews, click <Link to='/latestreviews'><b>here</b></Link>!!!
        </p>
        

        </div>
        </div>
        )
    
}

