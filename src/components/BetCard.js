
import hasMoneyLine from '../utils/hasMoneyLine';
import React, { useState, useEffect } from 'react';

export default function BetCard({ event, onLocationSelect, onTeamSelect  }) {


  const [selectedTeam, setSelectedTeam] = useState(null);
  
  const [selectedLocation, setSelectedLocation] = useState(null);

// const handleTeamSelect = (team) => {
//   console.log('Selected Team:', team);
//   setSelectedTeam(team);
// };


  const handleLocation = (team, location) => {
    console.log('Selected Team:', team, location);
    setSelectedTeam(team);
    setSelectedLocation(location);
    onTeamSelect(team);
    onLocationSelect(location);
  };

   useEffect(() => {
     console.log('Selected Location:', selectedLocation);
    console.log('Selected Team:', selectedTeam);
  }, [selectedLocation, selectedTeam]);


  let date = new Date(event.startDate * 1000).toLocaleString();
  const foundKey = hasMoneyLine(event);
  const homeOdds = event[foundKey].home.highestOdds;
  const awayOdds = event[foundKey].away.highestOdds;


  return (

      <div className="card">
        <div className="dateContainer">
          <p className="date">{date}</p>
        </div>

      <div className="infoContainer">
        <p>{event.event}</p>
          {/* <h4>{event.homeTeam}</h4>
          <p>vs</p>

          <h4>{event.awayTeam}</h4> */}
        </div>

      <div className="oddContainer">
        <button 
          onClick={() => handleLocation(event.homeTeam, 'home')}
          className={`oddItem ${selectedLocation === 'home' ? 'selected' : ''}`}>
            <p>{event.homeTeam}</p>
            <div className='odd'>{homeOdds}</div>
        </button>
        
        <button
            onClick={() => handleLocation(event.awayTeam, 'away')}
            className={`oddItem ${selectedLocation === 'away' ? 'selected' : ''}`}
          >
            <p>{event.awayTeam}</p>
            <div className='odd'>{awayOdds}</div>
        </button>

        <p className='selecttext'>Select your desired team then swipe </p>
        </div>
      </div>
 
  );
}