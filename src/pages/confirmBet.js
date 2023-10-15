import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import WalletBalance from '../components/WalletBalance';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

export default function ConfirmBet() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const chosenEvent= searchParams.get('event');
  const chosenTeam = searchParams.get('team');
  const chosenLocation = searchParams.get('location');
  const chosenOdd = searchParams.get('odds');



  var solanaWeb3 = require('@solana/web3.js');
  var mintPubkey = new solanaWeb3.PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
  const wallet = useWallet();
	const { connection } = useConnection();
	const [usdcBalance, setUSDCBalance] = useState(0);
	const [solBalance, setSolBalance] = useState(0);
	const [stake, setStake] = useState(10); //set default to 10 USDC
  // const [betTransactions, setBetTransactions] = useState([]); 
  // const [ betDialog, setBetDialog ] = useState({ modal: null });
  
useEffect(() => {
		if (wallet.publicKey) {
		  getUSDCBalance();
		  getSolBalance()
		}
}, [wallet.publicKey, connection]);
  
  	async function getUSDCBalance() {
		var usdcAccRaw = await connection.getTokenAccountsByOwner(wallet.publicKey, { mint: mintPubkey });
		var usdcAcc = usdcAccRaw.value[0].pubkey;
		var balRaw = await connection.getTokenAccountBalance(usdcAcc);
		var bal = balRaw.value.uiAmount;
		setUSDCBalance(bal);
		setStake(Math.min(bal, stake));
  }
  

  async function getSolBalance() {
    const accInfo = await connection.getAccountInfo(wallet.publicKey);
    const sol = accInfo.lamports / solanaWeb3.LAMPORTS_PER_SOL;
    setSolBalance(sol);
      
  }

	// 	if (sol < 0.002){
	// 		setTimeout(()=> setBetDialog({
	// 			modal: (
	// 			<Modal
	// 				open
	// 				title="Low SOL Balance"
	// 				text="You need more than 0.002 SOL balance in your wallet to bet. Please refill and try again."
	// 				confirmButtonText="OK"
	// 				onClose={()=>{ setBetDialog({modal: null}) }}
	// 				onConfirm={()=>{ setBetDialog({modal: null}) }}
	// 			/>
	// 			),
	// 		}));
	// 	}
	// }

  return (
    <>
      <nav className="navbar">
        <a href="https://exchange.purebet.io">
          <img src="/img/logo_dark.png"></img>
        </a>
        <WalletMultiButton className="wallet" />
      </nav>

      {/* Section that displays Wallet Balance */}
      <WalletBalance />

      <div></div>
      <button className='goBack'>
        back to bets
      </button>

      <p className='heading'>Your Selected Bet</p>

      <div className='selectedBet'>
        <p className='chosenEvent'>{chosenEvent}</p>
        <p className='chosenLocation'>{chosenLocation}</p>
         <div className='betItem'>
            <p>{chosenTeam}</p>
            <div className='odd'>{chosenOdd}</div>
        </div>
      </div>
      <div className='betSlipContainer'>
        {/* <div className="line"></div> */}
        {/* <svg className="line" xmlns="http://www.w3.org/2000/svg" width="69" height="5" viewBox="0 0 69 5" fill="none">
  <path d="M0 2.97589H36H69" stroke="white" stroke-width="4"/>
</svg> */}
        <p className='bettitle'>BET SLIP</p>
        <div className="stakeContainer">
          <p>Enter Stake Amount</p>
          <div className='inputContainer'>
            <input></input>
            <button className='odd'>MAX</button>
          </div>
          
          <div className='potentialReturn'>
            <p>Potential Return</p>
            <div className='odd'>$3.90</div>
          </div>
          
            <button className='placeBetBtn '>Click to place bet</button>
        </div>

      </div>


    </>
  )
}