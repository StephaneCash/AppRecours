import React, { useContext } from 'react';
import { multiStepContext } from "../StepContext";


function Test() {
    const isLoggedIn = true;

    const { setUserLoggedIn, userLoggedIn, } = useContext(multiStepContext);


    return (
        <div>Test</div>
    )
}

export default Test