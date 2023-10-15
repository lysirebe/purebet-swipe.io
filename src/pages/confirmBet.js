import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import WalletBalance from '../components/WalletBalance';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import axios from 'axios'
import Modal from '../components/Modal';

export default function ConfirmBet() {
  const location = useLocation();
  const navigate = useNavigate();
  const { chosenEvent, selectedTeam, selectedTeamOdds, selectedLocation } = location.state;
    console.log(chosenEvent);
  // const searchParams = new URLSearchParams(location.search);
  // const chosenEvent= searchParams.get('event');
  // console.log(chosenEvent);
  // const chosenEventName= searchParams.get('eventName');
  // const chosenTeam = searchParams.get('team');
  // const chosenLocation = searchParams.get('location');
  // const chosenOdd = searchParams.get('odds');



  var solanaWeb3 = require('@solana/web3.js');
  var mintPubkey = new solanaWeb3.PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
  const wallet = useWallet();
	const { connection } = useConnection();
	const [usdcBalance, setUSDCBalance] = useState(0);
	const [solBalance, setSolBalance] = useState(0);
  const [betDialog, setBetDialog] = useState({ modal: null });
	const [stake, setStake] = useState(null); //
  const [stakeInput, setStakeInput] = useState("")
  const [betTransactions, setBetTransactions] = useState([]); 
  const [potentialReturn, setPotentialReturn] = useState(0); // State for potential return


  
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

  const handleStakeInputChange = (event) => {
    // Update the input field value state
    setStakeInput(event.target.value);
    
    // Parse the input value to a number and update the stake state
    const parsedStake = parseFloat(event.target.value);
    setStake(isNaN(parsedStake) ? null : parsedStake);

       // Calculate potential return based on stake and selected team odds
       const parsedOdds = parseFloat(selectedTeamOdds);
       const potentialReturnValue = isNaN(parsedStake) || isNaN(parsedOdds) ? 0 : parsedStake * parsedOdds;
       setPotentialReturn(potentialReturnValue);
  };


  


const handlePlaceBet = () => {
placeBet(
  //this excludes soccer 
  chosenEvent.moneyline.id1,
  chosenEvent.moneyline.id2,
  selectedLocation,
  stake,
  selectedTeamOdds
).then((result) => {
  console.log(result);
  if (result && !result.error) {
    const betDetails = {
      event: chosenEvent.event,
      team: selectedTeam,
      location: selectedLocation,
      odds: selectedTeamOdds,
      stake: stake,
    };
    setBetDialog({
      modal: {
        title: "Bet Placed Successfully",
        text: <div className='modalsuccsess'>
        <p className='betdetails'>Bet Details:</p>
        <p className='betdetails'><strong>You Staked:</strong> {betDetails.stake} USDC</p>
        <div className='selectedBet'>
        <p className='chosenEvent'>{betDetails.event}</p>
        <p className='chosenLocation'>{betDetails.location}</p>
         <div className='betItem'>
            <p>{betDetails.team}</p>
            <div className='odd'>{betDetails.odds}</div>
        </div>
      </div>
      </div>,
        confirmButtonText: "Back to Betting ->",
        onClose: () => {
          setBetDialog({ modal: null });
          // Redirect to the sport select page
          navigate('/SelectSport');
        },
        onConfirm: () => {
          setBetDialog({ modal: null });
          // Redirect to the sport select page
          navigate('/SelectSport');
        },
      },
    });
  } else {
  
    // Handle error case, display error message in modal
    setBetDialog({
      modal: {
        title: "Error",
        text: "There was an error placing your bet. Please try again.",
        confirmButtonText: "OK",
        onClose: () => setBetDialog({ modal: null }),
        onConfirm: () => setBetDialog({ modal: null }),
      },
    });
  }
});
};


async function placeBet(id1, id2, side, userStake, userOdds) {

  var wireRaw = await axios.get("https://api.purebet.io/bets/betBuilder" + 
    "?id1=" + id1 + 
    "&id2=" + id2 + 
    "&side=" + side + 
    "&stake=" + userStake + 
    "&odds=" + userOdds + 
    "&bettorAddr=" + wallet.publicKey.toBase58()
  );
  var wire = wireRaw.data.body;
  var betAccs = wireRaw.data.betAccs;
  var transaction = solanaWeb3.Transaction.from(wire);
  
  let signature = null;
  try {
    const {
      context: { slot: minContextSlot },
      value: { blockhash, lastValidBlockHeight },
    } = await connection.getLatestBlockhashAndContext();

    signature = await wallet.sendTransaction(transaction, connection, { minContextSlot });
    await connection.confirmTransaction({ signature });
  } 
  catch (error) {
    console.error(error);
    return { error }
  }

  const txResult = { signature, betAccs };
  setBetTransactions([...betTransactions, txResult]);
  return txResult;
}

return (
    <>
      <nav className="navbar">
        <a href="https://exchange.purebet.io">
          <img src="/img/logo_dark.png"></img>
        </a>
        <WalletMultiButton className="wallet" />
      </nav>

      <p className='heading'>Your Selected Bet</p>

      <div className='selectedBet'>
        <p className='chosenEvent'>{chosenEvent.event}</p>
        <p className='chosenLocation'>{selectedLocation}</p>
         <div className='betItem'>
            <p>{selectedTeam}</p>
            <div className='odd'>{selectedTeamOdds}</div>
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
            <input
             type="number"
             value={stakeInput} // Bind input value to the state
             onChange={handleStakeInputChange} // Handle input change event
            ></input>
            <button className='odd'>MAX</button>
          </div>
          
          <div className='potentialReturnContainer'>
            <p>Potential Return</p>
            <div className='potentialReturn'>${potentialReturn.toFixed(2)}</div>
          </div>
          
            <button onClick={handlePlaceBet} className='placeBetBtn '>Click to place bet</button>
            <div className='backButton'>
      <button onClick={() => navigate(`/home/${chosenEvent.sport}`)}className='goBack'>
        or click here to go back to bets </button>
      </div>
        </div>

      </div>

      {betDialog.modal && (
        <Modal
          open={true}
          title={betDialog.modal.title}
          text={betDialog.modal.text}
          confirmButtonText={betDialog.modal.confirmButtonText}
          onClose={betDialog.modal.onClose}
          onConfirm={betDialog.modal.onConfirm}
        />
      )}
    </>
  )
}