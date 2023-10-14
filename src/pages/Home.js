import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import SportsMenu from '../components/SportsMenu';
import BetCard from '../components/BetCard';
import TinderCard from 'react-tinder-card';
import hasMoneyLine from '../utils/hasMoneyLine';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import WalletBalance from '../components/WalletBalance';

//api connected test front end when i get home
export default function Home() {
  let title = "";
  const { sport: routeSport } = useParams();
  const [selectedSport, setSelectedSport] = useState(routeSport || 'soccer');
  const [data, setData] = useState([]);

  // const [data, setData] = useState([]);
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

   // useEffect(() => {
  //   if (selectedSport) {
  //     fetchEvents(selectedSport);
  //   }
  // }, [selectedSport]);

     useEffect(() => {
    fetchEvents(selectedSport);
  }, [selectedSport]);

  //Tinder functions 
  const swiped = (direction, event) => {
    console.log('removing: ' + (event.event) + ' from: ' + direction);

    //link to new page, send to this page the event chosen 

    // let eventId = getPurebetId(event);

    // if (direction === 'right' && eventId != eventToBet) {
    //   setTimeout(() => setEventToBet(eventId), 100);
    // }
  };

  	const outOfFrame = (event) => {
      console.log((event.event) + ' left the screen!');
    };

  
  // const sportName = (selectedSport) => {
    
  //   if (selectedSport === "americanfootball") {
  //     title = "American Football";
  //   } else {
  //     title = selectedSport
  //   }
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
          <BetCard key={eventData.event} event={eventData} />
        </TinderCard>
      ))}
          </div>
        </div>
      </div>

           {/* <div className='buttons'>
            <button className='swipeButton' onClick={() => swipe('right')}>swipe to bet</button>
          
      <button className='swipeButton' onClick={() => swipe('left')}>swipe to skip</button>
      
      </div> */}

      
    </>
  );
}
