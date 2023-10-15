import React from 'react';
import { Link } from "react-router-dom"
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Welcome({ }) {

  return (
<>
      <nav className="navbar">
        <a href="https://exchange.purebet.io">
        <img src="https://exchange.purebet.io/img/logo_dark.png" alt="Description"/>
        </a>
      </nav>


    <div className="middle">
        <div>SWIPE</div>
        <p>your perfect bet is just a <span>swipe</span> away</p>
    </div>

    <Link to="/selectsport" className='wrapper'>
    <WalletMultiButton
    className='startButton'
    >Swipe to Start</WalletMultiButton>
    </Link>

    {/* <button className='startButton'>
        <div></div>
        <p>swipe to start</p>
    </button> */}

</>



// dynamically create each card 
// get all the names from the league endpoint 
// loop through that to create the cards matching the icons with the name in array 
// get the name from the array and format it it so thats theres space inbetween and capitalised 

 
  );
}