import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ListRecours from "../pages/ListRecours";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Recours from '../pages/Recours';
import AddFiliere from "../forms/AddFiliere";
import Filieres from "../pages/Filieres";
import Prof from '../pages/Prof';
import AddProf from '../forms/AddProf';

function RoutesEtudiants() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/filieres/addFiliere" element={<addRecours />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/recours/addRecours' element={<ListRecours />} />
        <Route path='/recours' element={<Recours />} />
        <Route path='/filieres' element={<Filieres />} />
        <Route path="/filieres/add-filiere" element={<AddFiliere />} />
        <Route path="/professeurs" element={<Prof />} />
        <Route path="/professeurs/add-prof" element={<AddProf />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesEtudiants