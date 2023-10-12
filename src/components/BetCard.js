import React from 'react';

export default function BetCard({ event }) {
  let date = new Date(event.startDate * 1000).toLocaleString();
  const homeOdds = event.moneyline.home.highestOdds;
  const awayOdds = event.moneyline.away.highestOdds;

  // time break the string into 2 substrings

  return (
    <>
      <section className="betCardContainer">
        <div className="dateContainer">
          <p className="date">{date}</p>
          {/* <p className="time">{date}</p> */}
        </div>

        <div className="infoContainer">
          <h4>{event.homeTeam}</h4>
          <p>vs</p>

          <h4>{event.awayTeam}</h4>
        </div>

        <div className="oddContainer">
          <p>{homeOdds}</p>
          <p>{awayOdds}</p>
        </div>

        <div className="swipeContainer">
          <div className="swipeBtnContainer">
            <button className="swipeButton">Skip Bet </button>
            <button className="swipeButton">Place Bet</button>
          </div>
        </div>
      </section>
    </>
  );
}



            /* // how to include return value in the below response */

            /* <p>{event.${foundKey}.home.highestOdds}</p> */
            /* <p>{event.moneyline.home.highestOdds}</p>

          <p>{event.moneyline.away.highestOdds}</p> */