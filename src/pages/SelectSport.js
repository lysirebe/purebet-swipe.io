import React from 'react';
import hasMoneyLine from '../utils/hasMoneyLine';

export default function SelectSport({ event }) {




  return (
<>
    <div class="headerSection">
    <h1>Pick A Sport</h1>
    <p>Choose a sport so we can reccommend you with the <span>best events</span></p>

</div>

<div class="sportsGrid">
    <div class="sportItem">
        <img class = "sportIcon" href="./public/img/sports/americanfootball.png"></img>
        <p class = "sportName">American Football</p>
    </div>

    <div class="sportItem">
        <div class = "sportIcon" href="./public/img/sports/soccer.png"></div>
        <p class = "sportName">Soccer</p>
    </div>

    <div class="sportItem">
        <div class = "sportIcon" href="./public/img/sports/combatsports.png"></div>
        <p class = "sportName">Combat Sports</p>
    </div>

    <div class="sportItem">
        <div class = "sportIcon" href="./public/img/sports/baseball.png"></div>
        <p class = "sportName">Baseball</p>
    </div>

    <div class="sportItem">
        <div class = "sportIcon" href="./public/img/sports/basketball.png"></div>
        <p class = "sportName">Basketball</p>
    </div>

    <div class="sportItem">
        <div class = "sportIcon" href="./public/img/sports/esports.png"></div>
        <p class = "sportName">Esports</p>
    </div>

  

</div>
</>



// dynamically create each card 
// get all the names from the league endpoint 
// loop through that to create the cards matching the icons with the name in array 
// get the name from the array and format it it so thats theres space inbetween and capitalised 

 
  );
}