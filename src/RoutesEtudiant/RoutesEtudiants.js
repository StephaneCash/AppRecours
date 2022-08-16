import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ListRecours from "../pages/ListRecours";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Recours from '../pages/Recours';
import Filieres from "../pages/Filieres";

function RoutesEtudiants() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/recours/addRecours' element={<ListRecours />} />
        <Route path='/recours' element={<Recours />} />
        <Route path='/filieres' element={<Filieres />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesEtudiants