import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SelectSport from '../pages/SelectSport';
import Home from '../pages/Home';
import ConfirmBet from '../pages/confirmBet';
import Welcome from '../pages/Welcome';

const AppRoutes = () => {


  const [selectedSport, setSelectedSport] = useState('americanfootball'); // Default sport is 'football'

  const handleSportChange = (sport) => {
    setSelectedSport(sport);
  };

  return (

    <Router>
      <Routes>
      < Route path="/purebet-swipe.io" element={<Welcome />} />
        <Route path="/selectsport" element={<SelectSport />} />
        <Route path="/home/:sport" element={<Home />} />
        <Route path="/confirmbet" element={<ConfirmBet />} />
      </Routes>
    </Router>
  );
    

    
};





export default AppRoutes;
    // <BrowserRouter>
    //         <Routes>
    //             <Route path="/start" element={<Start/>} />
    //             <Route path="/" element={<SelectSport/>} />
    //             <Route path="/home" element={<Home/>} />
    //         </Routes>
    //      </BrowserRouter>