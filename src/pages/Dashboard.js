import React from 'react'
import SideBar from '../components/SideBar';
import "../css/Dashboard.css"
import Earnings from '../components/Earnings';
import ResultTraites from '../components/ResultTraites';
import { AiOutlineDashboard } from "react-icons/ai";
import authHeader from '../auth/authHeader';

function Dashboard() {
  const authorization = authHeader();
  console.log(authorization)

  return (
    <div className='col-md-12'>
      <div className='d-flex'>
        <div className='col-2 navbarCol'>
          <SideBar />
        </div>
        <div className='col-10 mt-4 dashboardCol'>
          <div className='text-dashboard d-flex'>
            <h3>Dashboard Recours</h3>
            <h1 style={{ marginTop: '-10px' }}><AiOutlineDashboard /></h1>
          </div>
          <div className='d-flex'>
            <div className='col-3'>
              <Earnings />
            </div>
            <div className='col-3'>
              <ResultTraites />
            </div>
            <div className='col-5 MainContent'></div>
          </div>
          <div className='d-flex'>
            <div className='col-7 dash1'></div>
            <div className='col-5 dash2'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard