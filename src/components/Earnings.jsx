import React from 'react';
import styled from 'styled-components';
import {IoStatsChart} from 'react-icons/io5';
import {themeColor, hoverEffect} from '../utils/index';
import "../css/Earning.css";

function Earnings() {
  return (
    <div className='EarningsCard'>
        <CardContent>
            <Chart>
                <IoStatsChart />
            </Chart>
            <EarningsText>Total Recours</EarningsText>
            <Earning>107</Earning>
            <EarningsIncrease>10% des étudiants</EarningsIncrease>
        </CardContent>
    </div>
  )
}

const CardContent = styled.div`
    margin: 1rem;
`;

const Chart = styled.div`
    display: flex;
    justify-content: center;
    svg {
        height: 3rem;
        width: 3rem; 
    }
`;

const EarningsText = styled.h3`
    text-align: center;
    font-weigth: normal;
    padding: 0.4rem 0;
`;

const Earning = styled.h2`
    text-align: center;
`;

const EarningsIncrease = styled.h5`
    text-align: center;
    font-weigth: normal;
    background-color: rgba(0, 0, 0, 0.2);
    padding: 0.5rem;
    border-radius: 2rem;
`;

export default Earnings