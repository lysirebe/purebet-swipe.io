import React, { useEffect, useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
export default function WalletBalance() {

  var solanaWeb3 = require('@solana/web3.js');
  var mintPubkey = new solanaWeb3.PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
  const wallet = useWallet();
	const { connection } = useConnection();
	const [usdcBalance, setUSDCBalance] = useState(0);
	const [solBalance, setSolBalance] = useState(0);
	const [stake, setStake] = useState(10); //set default to 10 USDC
  const [betTransactions, setBetTransactions] = useState([]); 
  
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
      console.log(usdcBalance)
      
  }

  async function getSolBalance() {
    const accInfo = await connection.getAccountInfo(wallet.publicKey);
    const sol = accInfo.lamports / solanaWeb3.LAMPORTS_PER_SOL;
    setSolBalance(sol);
  }

  
  return (
    <div className="balanceContainer">
      <p>Your Balance</p>
      <h2>{usdcBalance}</h2>
    </div>
  );
}
