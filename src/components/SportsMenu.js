import React from 'react';

export default function SportsMenu({ onSelectSport }) {
  return (
    <div className="categoryContainer">
      <button onClick={() => onSelectSport('all')} className="sportsContainer">
        <i className="fa-solid fa-medal"></i>
        <p>All</p>
      </button>

      <button onClick={() => onSelectSport('americanfootball')} className="sportsContainer">
        <i className="fa-solid fa-football"></i>
        <p>Football</p>
      </button>

      <button onClick={() => onSelectSport('baseball')} className="sportsContainer">
        <i className="fa-solid fa-baseball-bat-ball"></i>
        <p>Baseball</p>
      </button>

      <button onClick={() => onSelectSport('soccer')} className="sportsContainer">
        <i className="fa-regular fa-futbol"></i>
        <p>Soccer</p>
      </button>
    </div>
  );
}
