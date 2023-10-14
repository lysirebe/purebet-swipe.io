import React from 'react';
import hasMoneyLine from '../utils/hasMoneyLine';

export default function BetCard({ event }) {
  let date = new Date(event.startDate * 1000).toLocaleString();
  const foundKey = hasMoneyLine(event);
  const homeOdds = event[foundKey].home.highestOdds;
  const awayOdds = event[foundKey].away.highestOdds;
  // const eventId = event[foundkey].away.

  // time break the string into 2 substrings

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
        <p>Select your desired team:</p>
          <button className='oddItem'>
            <p>{event.homeTeam}</p>
            <div className='odd'>{homeOdds}</div>
        </button>
        
          <button className='oddItem'>
            <p>{event.awayTeam}</p>
            <div className='odd'>{awayOdds}</div>
        </button>
        </div>

        {/* <div className="swipeContainer">
          <div className="swipeBtnContainer">
            <button className="swipeButton">Skip Bet </button>
            <button className="swipeButton">Place Bet</button>
          </div>
        </div> */}
      </div>
 
  );
}



            /* // how to include return value in the below response */

            /* <p>{event.${foundKey}.home.highestOdds}</p> */
            /* <p>{event.moneyline.home.highestOdds}</p>

          <p>{event.moneyline.away.highestOdds}</p> */