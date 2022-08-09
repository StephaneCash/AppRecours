import React, { useContext, useState, useEffect } from 'react'
import { Button, TextField, Card } from "@material-ui/core";
import "../css/Form.css";
import { multiStepContext } from "../StepContext";
import InputAdornment from '@mui/material/InputAdornment';
import { MenuBook } from '@material-ui/icons';


function Form2() {

    const { setCurrentStep, userData, setUserData } = useContext(multiStepContext);

    const [click, setClick] = useState(false);
    const [isValidPostnom, setIsValidPostnom] = useState(false);
    const [isValidNom, setIsValidNom] = useState(false);
    const [isValidCours, setIsValidCours] = useState(false);

    const handleNom = (e) => {
        if (e.target.value === "") {
            setIsValidNom(false);
        } else {
            setIsValidNom(true);
        }
    };

    const handlePostnom = (e) => {
        if (e.target.value === '') {
            setIsValidPostnom(false);
        } else {
            setIsValidPostnom(true);
        }
    }

    const handleCours = (e) => {
        if (e.target.value === '--Cours--') {
            setIsValidCours(false);
        } else {
            setIsValidCours(true);
        }
    }

    useEffect(() => {
        if (userData.nomProf) {

        };


    }, []);

    const nextStep = (e) => {
        e.preventDefault();
        setClick(true);

        if (isValidNom === false || isValidPostnom === false || isValidCours === false) {
            return false;
        } else {
            setCurrentStep(3);
        }
    };

    return (
        <>
            <h3 className="text-center mt-1">Identité de l'enseignant</h3>
            <h3 className='text-center'><MenuBook /></h3>
            <Card>
                <form onSubmit={nextStep}>
                    <div className="col-10 container form2 mt-3">
                        <div className="row">
                            <div className="col-6">
                                <label style={{ marginBottom: '10px' }}>Nom:</label> <br />
                                <input
                                    className='form-control' placeholder='Nom du prof.'
                                    style={{ width: '100%' }}
                                    value={userData['nomProf']}
                                    onChange={(e) => (setUserData({ ...userData, "nomProf": e.target.value }), handleNom(e))}
                                />
                                {
                                    click === true &&
                                    <>
                                        {
                                            isValidNom === false ? 'Veuillez renseigner le nom du professeur svp !' : ''
                                        }
                                    </>

                                }
                            </div>
                            <div className="col-6">
                                <label style={{ marginBottom: '10px' }}>Postnom:</label> <br />
                                <input className="form-control" placeholder='Postnom'
                                    style={{ width: '100%' }}
                                    value={userData['postnomProf']}
                                    onChange={(e) => (setUserData({ ...userData, "postnomProf": e.target.value }), handlePostnom(e))}
                                />
                                {
                                    click === true &&
                                    <>
                                        {
                                            isValidPostnom === false ?
                                                'Veuillez renseigner le postnom du professeur svp !' : ''
                                        }
                                    </>
                                }
                            </div>
                        </div>

                        <div className='col-12'>
                            <label className='mt-1' style={{ marginBottom: '10px' }}>Choisir un cours:</label> <br />
                            <select
                                className="form-control"
                                value={userData['cours']}
                                onChange={(e) => (setUserData({ ...userData, 'cours': e.target.value }), handleCours(e))}
                                style={{ width: "100%", marginRight: "10px", height: "61px", marginTop: '-5px', boxShadow: "none", border: "1px solid silver" }}
                            >
                                {userData.cours ?
                                    <>
                                        <option>Hardware</option>
                                        <option>Electronique I</option>
                                    </> :
                                    <>
                                        <option>--Cours--</option>
                                        <option>Hardware</option>
                                        <option>Electronique I</option>
                                    </>
                                }
                            </select>

                            {
                                click === true && (
                                    <>
                                        {isValidCours === false ? <div className="sexeObligatoire mt-1">Veuillez choisir le nom du cours svp !</div> : ""}
                                    </>
                                )
                            }
                        </div>


                    </div>
                    <div className="col-12 container">
                        <div className="row">
                            <div className="col-12">

                                <Button
                                    className='mb-3 mt-3 btn-confirm'
                                    type="submit"
                                    style={{ marginLeft: "10px", float: "right" }}
                                >
                                    Suivant
                                </Button>
                                <Button
                                    className='mb-5 mt-3 btn-back'
                                    onClick={() => setCurrentStep(1)}
                                    style={{ float: "right" }}
                                >
                                    Retour
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </Card>
        </>
    )
}

export default Form2