import { useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material/';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import axios from 'axios';
import TinderCard from 'react-tinder-card'
import FippableCard from './FippableCard';
import '../../styles.css';

import { MessageDialog, ConfirmationDialog } from '../../components/dialogs';
import Tag from './Tag';
import * as buffer from "buffer";
window.Buffer = buffer.Buffer;


const PurebetSwipe = () => {

	var solanaWeb3 = require('@solana/web3.js');
	var mintPubkey = new solanaWeb3.PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');

	const wallet = useWallet();

	const { connection } = useConnection();
	const [usdcBalance, setUSDCBalance] = useState(0);
	const [solBalance, setSolBalance] = useState(0);
	const [stake, setStake] = useState(10); //set default to 10 USDC
	const [ betTransactions, setBetTransactions ] = useState([]); 
	const [ events, setEvents ] = useState([]);
	const [ homeOnTopCard, setHomeOnTopCard ] = useState(true);
	const [ eventToBet, setEventToBet ] = useState(null);  //event id to bet

	const [ betDialog, setBetDialog ] = useState({ modal: null });

	const eventStr = event => { return event.event + " with id1=" + event.moneyline.id1 + " id2=" + event.moneyline.id2 ; };

	const getPurebetId = (ev) => { return (ev.moneyline.id1 * 256 + ev.moneyline.id2) };

	const getEvent = (purebetId) => { return events.find(ev => getPurebetId(ev) === purebetId) };

	const swiped = (direction, event) => {
		console.log('removing: ' + eventStr(event) + " from: " + direction);

		let eventId = getPurebetId(event);

		if (direction === "right" && eventId != eventToBet){
			setTimeout(()=>setEventToBet(eventId), 100);
		}
	}

	//this is a temp fix. It deletes the event Its not a bad thing. 
	//The scrolling still happens but is removed.
	//We should try to find the root cause but I am lost
	// const deleteCard = (delEv) => {
	// 	setEvents(events.filter((event) => getPurebetId(event) !== getPurebetId(delEv)));
	// }

	const outOfFrame = (event) => {
		console.log(eventStr(event) + ' left the screen!');
		//deleteCard(event); //part of temp fix
		setHomeOnTopCard(true);
	}

	useEffect(() => {
		if (wallet.publicKey) {
		  getUSDCBalance();
		  getSolBalance()
		}
	  }, [wallet.publicKey, connection]);
	

	async function getUSDCBalance() {
		var usdcAccRaw = await connection.getTokenAccountsByOwner(wallet.publicKey, { mint: mintPubkey });
		// var bal = usdcAccRaw.value[0].account.data.parsed.info.tokenAmount.uiAmount
		var usdcAcc = usdcAccRaw.value[0].pubkey;
		var balRaw = await connection.getTokenAccountBalance(usdcAcc);
		var bal = balRaw.value.uiAmount;
		setUSDCBalance(bal);
		setStake(Math.min(bal, stake));
	}

	async function getSolBalance(){
		const accInfo = await connection.getAccountInfo(wallet.publicKey);
		const sol = accInfo.lamports / solanaWeb3.LAMPORTS_PER_SOL;
		setSolBalance(sol);

		if (sol < 0.002){
			setTimeout(()=> setBetDialog({
				modal: (
				<MessageDialog
					open
					title="Low SOL Balance"
					text="You need more than 0.002 SOL balance in your wallet to bet. Please refill and try again."
					confirmButtonText="OK"
					onClose={()=>{ setBetDialog({modal: null}) }}
					onConfirm={()=>{ setBetDialog({modal: null}) }}
				/>
				),
			}));
		}
	}

	useEffect(() => {
		fetchEvents().catch(console.error);
	}, [wallet.publicKey]);


	useEffect(() => {
		if (eventToBet) {
			let event = getEvent(eventToBet);
			if (event) {
				confirmToPlaceBet(event);
			}
		}
	}, [eventToBet]);


	const confirmToPlaceBet = (event) => {
		//gtg
		{wallet.publicKey && solBalance > 0.002
      ? setBetDialog({
          modal: (
            <ConfirmationDialog
              open
              data={event}
              title="Do you really want to place this bet?"
              body={
                <>
                  <div style={{ textAlign: 'center' }}>
                    for: <Tag className="tag" key="for" label={homeOnTopCard ? event.homeTeam : event.awayTeam} />
                    <br />
                    <br />
                    stake: <Tag className="tag" key="stake" label={'' + stake + ' USDC'} />
                    <br />
                    <br />
                    odds:{' '}
                    <Tag
                      key="odd"
                      label={'' + (homeOnTopCard ? event.moneyline.home.highestOdds : event.moneyline.away.highestOdds)}
                      className="tag"
                    />
                    <br />
                  </div>
                </>
              }
              text="overridden by body"
              confirmButtonText="Yes Place Bet"
              onClose={() => {
                setBetDialog({ modal: null });
              }}
              onConfirm={() => {
                handlePlaceBet(event);
              }}
              className="modal" // Apply the CSS class here
            />
          ),
        })
      : !wallet.publicKey
      ? //no wallet connected
        setBetDialog({
          modal: (
            <ConfirmationDialog
              open
              title="No wallet connected"
              text="Connect a Solana wallet to place this"
              confirmButtonText="OK"
              hideCancelButton={true}
              onClose={() => {
                setBetDialog({ modal: null });
              }}
              onConfirm={() => {
                setBetDialog({ modal: null });
              }}
              className="modal" // Apply the CSS class here
            />
          ),
        })
      : //sol bal is low
        setBetDialog({
          modal: (
            <ConfirmationDialog
              open
              title="SOL balance low"
              text="Your SOL balance is low. 0.002 SOL is required to place a bet. This is refunded once the match is over. Please add SOL to your wallet."
              confirmButtonText="OK"
              hideCancelButton={true}
              // onClose={()=>{ setBetDialog({modal: null}) }}
              onConfirm={() => {
                setBetDialog({ modal: null });
              }}
              className="modal" // Apply the CSS class here
            />
          ),
        });
		}
	};
	
	const fetchEvents = async () => {

		// if (wallet.publicKey){
			let eventData = await axios.get("https://api.purebet.io/pbapi?sport=baseball");
			setEvents(eventData.data.baseball["Major League Baseball"].filter(event => event.moneyline));
		// }
		// else {
		// 	setEvents([]);
		// }
		setHomeOnTopCard(true);
		setEventToBet(null);
	};

	const handlePlaceBet = (event) => {
		setBetDialog({modal: null})
		console.log('placing bet for ' + (homeOnTopCard ? event.homeTeam : event.awayTeam) + ' in event "' + eventStr(event) + '"');

		if (!process.env.REACT_APP_PLACE_REAL_BET || process.env.REACT_APP_PLACE_REAL_BET.toLowerCase()!=='true'){
			console.log("not in real betting mode")
			return null;
		}

		placeBet(
			event.moneyline.id1,
			event.moneyline.id2,
			(homeOnTopCard ? "home" : "away"),
			stake,
			(homeOnTopCard ? event.moneyline.home.highestOdds : event.moneyline.away.highestOdds)
		)
		.then((result) => {
			console.log(result);

			setBetDialog({
        modal: (
          <MessageDialog
            open
            data={result}
            title="Bet Status"
            body={
              <>
                {result.error ? (
                  <div>
                    Your bet placement failed due to the following reason:
                    <br />
                    <br />
                    {result.error.message}
                  </div>
                ) : (
                  <div>
                    Your bet has been placed with the following transaction signature:
                    <br />
                    <br />
                    <Tag className="tag" key="txSignature" label={result.signature} />
                    <br />
                  </div>
                )}
              </>
            }
            text="overridden by body"
            confirmButtonText="OK"
            onClose={() => {
              setBetDialog({ modal: null });
            }}
            onConfirm={() => {
              setBetDialog({ modal: null });
            }}
          />
        ),
      });
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

	const noEventsForNow = ()=> { return Array.isArray(events) && events.length === 0 }

	const onStakeChanged = (event)=>{ 
		const stake = parseFloat(event.target.value);
		setStake(Math.min(Math.floor(usdcBalance*100)/100, stake));
	}

	
    return (
		<div>
			{ betDialog.modal }
			<Grid container direction="column">
				<Grid item component="header">
				</Grid>

				<Grid item component="main">
					<div style={{ height: 800, maxheight: 1200,  width: '95%', margin: 'auto', overflow: "hidden"}}>

						{ 
						// wallet.publicKey ? 
							( 
								<>
									<Typography sx={{ fontSize: '1rem', padding: 1 }}>Wallet USDC balance: {Math.floor(usdcBalance*100)/100}</Typography>

									<Typography sx={{ fontSize: '1rem', padding: 1 }} display="inline">Stake: </Typography>
									<input
										type="number" 
										// pattern="^\d*(\.\d{0,2})?$" 
										// inputmode="text"
										step="any"
										min="1.01"
										placeholder='10.00'
										style={{ width:"60px" }}
										value={stake}
										onChange={ onStakeChanged }
									/>
									<Typography sx={{ fontSize: '1rem', padding: 1 }} display="inline">USDC</Typography>
								</>
							)
							//  : 
							// <h3>Please connect your wallet to start</h3>
						}
						
						<br/><br/>
						<div style={{ marginTop: '30px' }}>
							<div className='swipeCardContainer'>
								{ noEventsForNow() ? 
									<Typography sx={{ fontSize: '0.8rem', padding: 1 }}>MLB Events for betting will be coming soon. Please check back a bit later.</Typography> : 
									<></>}
								{ 	<div id='swipeCardStack' lowSOL={ solBalance < 0.002 ? 'true' : 'false'}>{
										events.map((eventInfo) =>
											<TinderCard className='swipe' key={ getPurebetId(eventInfo) } 
												onCardLeftScreen={() => outOfFrame(eventInfo)}
												onSwipe={(dir) => swiped(dir, eventInfo)} 
												preventSwipe={['up', 'down']}>
													<FippableCard eventInfo={eventInfo} onFlipCard={setHomeOnTopCard} stake={stake}/>
											</TinderCard>)
										}
									</div>
								}
							</div>


						</div>
						<br/><br/>
						{ noEventsForNow() ? <></> : 
							<Typography sx={{ fontSize: '0.8rem', padding: 1 }}>
								{solBalance < 0.002 ? "Please refill SOL to continue" : "Swipe right to place bet, swipe left to skip"}</Typography>}
					</div>
				</Grid>
			</Grid>
			
		</div>
		
    );
};

export default PurebetSwipe;
