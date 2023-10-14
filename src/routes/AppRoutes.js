import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SelectSport from '../pages/SelectSport';
import Home from '../pages/Home';

const AppRoutes = () => {


  const [selectedSport, setSelectedSport] = useState('americanfootball'); // Default sport is 'football'

  const handleSportChange = (sport) => {
    setSelectedSport(sport);
  };

  return (

    <Router>
      <Routes>
        <Route path="/" element={<SelectSport />} />
        <Route path="/home/:sport" element={<Home />} />
      </Routes>
    </Router>
  );
    
    // <BrowserRouter>
    //         <Routes>
    //             <Route path="/start" element={<Start/>} />
    //             <Route path="/" element={<SelectSport/>} />
    //             <Route path="/home" element={<Home/>} />
    //         </Routes>
    //      </BrowserRouter>
    
};





export default AppRoutes;
