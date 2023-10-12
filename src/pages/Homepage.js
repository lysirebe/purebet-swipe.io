import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Homepage() {
  return (
    <>
      <div className="mainContainer">
        {/* NavBar */}
        <nav className="navbar">
          <a href="https://exchange.purebet.io">
            <img src="logo_dark.png"></img>
          </a>
          <WalletMultiButton className="wallet" />
        </nav>
        {/* Section that displays Wallet Balance */}
        <div className="balanceContainer">
          <p>Your Balance</p>
          <h2>186.00 USDC</h2>
          {/* <h2>{balance}</h2> */}
        </div>
        {/* Section that displays sport categories */}
        {/* <SportsMenu /> */}


        
        // get corresponding api data, display this on cards with highest odd infor from both teams
      // make an array of this data to be used for mapping the tinder cards. 
        {/* when button is clicked make sportname = 'football' or whatever button is clicked also change color of div 
       dynamically update the api url  */}
        
        {/* const fetchEvents = async () { */}

{/* 	
        //get event data for each sport
        let eventData = await axios.get("https://api.purebet.io/pbapi?sport="+{sportName});
        
        //get league for each sport 
        let leagueData = await axios.get("https://api.purebet.io/pbapi?getLeaguesFor="+{sportName})


			  setEvents(eventData.data.baseball["Major League Baseball"].filter(event => event.moneyline));
        
        } */}

        <div className="categoryContainer">
          <button className="sport">
            <i class="fa-solid fa-medal"></i>
            <p>All</p>
          </button>

          <div class="sportsContainer">
            <i class="fa-solid fa-football"></i>
            <p>Football</p>
          </div>

          <div class="sportsContainer">
            <i class="fa-solid fa-baseball-bat-ball"></i>
            <p>Baseball</p>
          </div>

          <div class="sportsContainer">
            <i class="fa-regular fa-futbol"></i>
            <p>Soccer</p>
          </div>
        </div>
        // click on a button, that button has linke
      </div>
    </>
  );
}
