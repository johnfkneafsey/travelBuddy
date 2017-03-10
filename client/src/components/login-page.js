import React from 'react';
import {SERVER_ROOT} from '../config';

export default function LoginPage() {
    return (
    <div>
        <div className="signInPageWrapper">
          <header>
              <div className="logInHeader">
              </div>
         </header>
          <div className="inner signUpBody">
                <img className="img-responsive globeImageDash" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Globe_icon-white.svg/2000px-Globe_icon-white.svg.png" alt="" />
                <h1 className="cover-heading">Welcome to <b>World Traveler</b> </h1>
                <a className="flipButton btn" href={`${SERVER_ROOT}/auth/google`}>Sign Up or Log In</a>
                <h4 className="description" >A multi-language learning app for the adventurer</h4>
          </div>

        </div>
         <footer>
            <div className="logInFooter">
            </div>
         </footer>
    </div>
    )}



