import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SelectSport from '../pages/SelectSport';
import Home from '../pages/Home';
import ConfirmBet from '../pages/ConfirmBet';
import Welcome from '../pages/Welcome';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/selectsport" element={<SelectSport />} />
        <Route path="/home/:sport" element={<Home />} />
        <Route path="/confirmbet" element={<ConfirmBet />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;




