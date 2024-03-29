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
import Cours from '../pages/Cours';
import AddCours from '../forms/AddCours';
import AttributesCours from '../forms/AttributesCours';
import Register from '../pages/Register';

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
        <Route path='/cours' element={<Cours />} />
        <Route path="/cours/add-cours" element={<AddCours />} />
        <Route path="/professeurs/attribution-cours" element={<AttributesCours />} />
        <Route path="/inscription" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesEtudiants