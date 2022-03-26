import React from 'react';
import styled from 'styled-components';
import {themeColor} from '../utils/index';

function Badge ({content}) {
  return <Div></Div>;
}

const Div = styled.div`
    padding: 0.3rem 1rem;
    border-radius: 1rem;
    font-weight: 500;
    background-color: ${themeColor};
    cursor: pointer;
`;

export default Badge;
