import React from 'react'
import SideBar from '../components/SideBar';
import '../css/ListRecours.css';
import { useContext } from "react";
import { multiStepContext } from "../StepContext";
import Form1 from './Form1';
import Form2 from "./Form2";
import { Card, Step, StepLabel, Stepper } from '@material-ui/core';


function ListRecours() {

  const { currentStep } = useContext(multiStepContext);

  function showStep(step) {
    if (step === 1) {
      return <Form1 />
    } else if (step === 2) {
      return <Form2 />
    } else if (step === 3) {
      return 'Fini'
    };
  };

  return (
    <div className='col-md-12'>
      <div className='d-flex'>
        <div className='col-2'>
          <SideBar />
        </div>
        <div className='col-10'>
          <div className='mainRecours container'>
            <main>
              <section className="recent">
                <Card>
                  <div className="col-12" style={{ marginTop: "15px" }}>
                    <div className="container center-stepper">
                      <Stepper style={{ width: "100%" }} activeStep={currentStep - 1} orientation='horizontal'>
                        <Step>
                          <StepLabel></StepLabel>
                        </Step>

                        <Step>
                          <StepLabel></StepLabel>
                        </Step>

                        <Step>
                          <StepLabel></StepLabel>
                        </Step>
                      </Stepper>
                    </div>
                    {showStep(currentStep)}
                  </div>
                </Card>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListRecours