import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import SportsMenu from '../components/SportsMenu';
import BetCard from '../components/BetCard';
import TinderCard from 'react-tinder-card';
import hasMoneyLine from '../utils/hasMoneyLine';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import WalletBalance from '../components/WalletBalance';


export default function Home() {
  const { sport: routeSport } = useParams();
  const [selectedSport, setSelectedSport] = useState(routeSport || 'soccer');
  const [data, setData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);  const navigate = useNavigate();
  const [selectedTeam, setSelectedTeam] = useState(null);
  // const [selectedBet, setSelectedBet] = useState(null);;
  // const [selectedSport, setSelectedSport] = useState(null);

  const fetchEvents = async (sport) => {

    try {
      // Fetch events from all leagues within the chosen sport
      const response = await axios.get(`https://api.purebet.io/pbapi?sport=${sport}`);
      const foundKey = hasMoneyLine(response.data);
      console.log(foundKey);

      if (foundKey) {
        const allEvents = [];
        // const leagues = [];
        // Iterate through leagues and events, filter based on moneyline presence
        Object.keys(response.data[sport]).forEach((league) => {
          // const leagueEvents = response.data[sport][league].filter((event) => event.moneyline);
          const leagueEvents = response.data[sport][league].filter((event) => event[foundKey]);
          allEvents.push(...leagueEvents);
        });
        console.log(allEvents);
        setData(allEvents);
        
      } else {
        console.log("No valid odds data key found")
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };


     useEffect(() => {
    fetchEvents(selectedSport);
  }, [selectedSport]);

  //Tinder functions

  // console.log(selectedTeam)
  //   console.log(selectedLocation)

  
  const swiped = (direction, event) => {
  if (direction === 'right') {
    const foundKey = hasMoneyLine(event);
    console.log("swiped func", foundKey)

    // Check if foundKey and event[foundKey] are defined before accessing properties
    if (foundKey) {
      const selectedTeamOdds = event[foundKey][selectedLocation].highestOdds;
      navigate(`/confirmbet`, {
        state: {
          chosenEvent: event,
          selectedTeam,
          selectedTeamOdds,
          selectedLocation,
        },
      });
          //  setSelectedBet({ event, selectedTeam, selectedTeamOdds, selectedLocation });
      // navigate(`/confirmbet?event=${event}&eventName=${event.event}&team=${selectedTeam}&odds=${selectedTeamOdds}&location=${selectedLocation}`);
    } else {
      console.error('Invalid event or key');
      // Handle the error or show a message to the user
    }
  }
};




  	const outOfFrame = (event) => {
      console.log((event.event) + ' left the screen!');
    };
  

  return (
    <>
      <nav className="navbar">
        <a href="https://exchange.purebet.io">
          <img src="https://exchange.purebet.io/img/logo_dark.png"></img>
        </a>
        <WalletMultiButton className="wallet" />
      </nav>

      {/* Section that displays Wallet Balance */}
      <WalletBalance />

      {/* Section that displays sport categories */}
      <SportsMenu onSelectSport={setSelectedSport} />
      {/* <div className="sportheading">
        <p>{sportName(selectedSport)}</p>
</div> */}
      {/* Section that displays Tinder-style Bet Cards */}
      <div className='one'>
        <div className='two'>
        <div className="cardContainer">
{data.map((eventData) => (
        <TinderCard
          className='swipe'
          key={eventData.event}
          onCardLeftScreen={() => outOfFrame(eventData)}
          onSwipe={(dir) => swiped(dir, eventData)}
          preventSwipe={['up', 'down']}
        >
    <BetCard
              event={eventData}
              onLocationSelect={setSelectedLocation}
              onTeamSelect={setSelectedTeam}
            />
        </TinderCard>
      ))}
          </div>
        </div>
      </div>
           <div className='buttons'>
            <div className='swipeButton' >SWIPE RIGHT TO BET</div>
          
      <div className='swipeButton'>SWIPE LEFT TO SKIP</div>
      
      </div>

      
    </>
  );
}
