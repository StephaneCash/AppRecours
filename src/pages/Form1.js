import React, { useContext, useState, useEffect } from 'react'
import { Button, } from "@material-ui/core";
import "../css/Form.css";
import { multiStepContext } from "../StepContext";
import { School } from '@material-ui/icons';
import axios from "axios";

function Form1() {

    const { setCurrentStep, userData, setUserData } = useContext(multiStepContext);
    const [isValidNom, setIsValidNom] = useState(false);
    const [isValidPromotion, setisValidPromotion] = useState(false);
    const [isValidPostnom, setisValidPostnom] = useState(false);
    const [isValidObjRecours, setisValidObjRecours] = useState(false);
    const [click, setClick] = useState(false);
    const [objChoist, setObjChoisit] = useState(false);

    const handleNom = (e) => {
        if (e.target.value === "") {
            setIsValidNom(false);
        } else {
            setIsValidNom(true);
        };
    };

    const handlePromotion = (e) => {
        if (e.target.value === "--Filière--") {
            setisValidPromotion(false);
        } else {
            setisValidPromotion(true);
        };
    };

    useEffect(() => {
        if (!objChoist) {
            setUserData({ ...userData, "coteExamen": 0, "coteAnnee": 0 })
        }
    }, [objChoist]);

    const handleCoteExam = (e) => {
        if (e.target.value !== "") {
            setUserData({ ...userData, "coteExamen": parseInt(e.target.value) });
            setObjChoisit(false)
        } else {
            setObjChoisit(true)
        }
    };

    const handleAnne = (e) => {
        console.log(e.target.value)
        if (e.target.value !== "") {
            setUserData({ ...userData, "coteAnnee": parseInt(e.target.value) });
            setObjChoisit(false)
        } else {
            setObjChoisit(true)
        }
    };

    const handleObjectRecours = (e) => {
        if (e.target.value === "----Object du recours----") {
            setisValidObjRecours(false);
        } else {
            setisValidObjRecours(true);

            if (e.target.value === 'Erreur de transcription de cotes de l\'examen' ||
                e.target.value === "Erreur de transcription de cotes de l'année"
            ) {
                setObjChoisit(true);
            } else {
                setObjChoisit(false);
            }
        }
    };

    function handlePostnom(e) {
        if (e.target.value === "") {
            setisValidPostnom(false);
        } else {
            setisValidPostnom(true);
        };
    };

    const stepNext = () => {
        setClick(true);
        if (isValidNom === false || isValidPromotion === false || isValidPostnom === false ||
            isValidObjRecours === false || objChoist
        ) {
            return false;
        } else {
            setCurrentStep(2)
        }
    };

    useEffect(() => {
        if (userData.nom) {
            setIsValidNom(true);
        };
        if (userData.promotion) {
            setisValidPromotion(true);
        };
        if (userData.postnom) {
            setisValidPostnom(true);
        };
        if (userData.objetRecours) {
            setisValidObjRecours(true);
        }

    }, [userData.nom, userData.promotion, userData.postnom, userData.objetRecours,]);

    const validationStyle = { color: 'red', fontSize: '13px' };

    const [filiere, setFiliere] = useState([]);
    const [checked, setChecked] = useState(false);

    const getFilieres = () => {
        axios.get(`http://localhost:5000/api/filieres`).then(resp => {
            setFiliere(resp.data);
        }).catch(err => {
            console.log(err)
        })
    };

    useEffect(() => {
        getFilieres();
    }, []);

    const checkBoxFunction = (e) => {
        if (e.target.checked === true) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }

    return (
        <>
            <h3 className="text-center mt-1">Identité de l'étudiant</h3>
            <h3 className='text-center'><School color='primary' /></h3>
            <div className="col-10 container mt-3 form1">
                <div className="row form1dFlex">
                    <div className="col-6 colonne6">
                        <label style={{ marginBottom: '10px' }}>Nom:</label> <br />
                        <input type="text"
                            className="form-control"
                            style={{ width: '100%' }}
                            placeholder='Entrer un nom'
                            value={userData['nom']}
                            onChange={(e) => (setUserData({ ...userData, "nom": e.target.value }), handleNom(e))}
                        />

                        {
                            click === true && (
                                <>
                                    {isValidNom === false ? <span style={validationStyle}>Veuillez renseigner un nom svp !</span> : ""}
                                </>
                            )
                        }
                        <br />

                        <label style={{ marginBottom: '10px', marginTop: '5px' }}>Choisir votre filière:</label> <br />
                        <select
                            className="form-control"
                            value={userData['promotionj']}
                            onChange={(e) => (setUserData({ ...userData, 'promotion': e.target.value }), handlePromotion(e))}
                        >
                            <option>--Filière--</option>
                            {
                                filiere.data && filiere.data.map((val, index) => {
                                    return (
                                        <option key={index}>{val.nom} {val.niveau}</option>
                                    )
                                })
                            }
                        </select>
                        {
                            click === true && (
                                <>
                                    {isValidPromotion === false ? <div style={validationStyle}>Veuillez choisir une promotion svp !</div> : ""}
                                </>
                            )
                        }

                        <label style={{ marginBottom: '10px', marginTop: '5px' }}>Choisir l'objet du recours:</label> <br />
                        <select
                            className="form-control"
                            value={userData['objetRecours']}
                            onChange={(e) => (setUserData({ ...userData, 'objetRecours': e.target.value }), handleObjectRecours(e))}
                        >
                            {userData.objetRecours ?
                                <>
                                    <option>Omission de cotes de l'examen</option>
                                    <option>Omission de cotes de l'année</option>
                                    <option>Erreur de transcription de cotes de l'examen</option>
                                    <option>Erreur de transcription de cotes de l'année</option>
                                </> :
                                <>
                                    <option>--Object du recours--</option>
                                    <option>Omission de cotes de l'examen</option>
                                    <option>Omission de cotes de l'année</option>
                                    <option>Erreur de transcription de cotes de l'examen</option>
                                    <option>Erreur de transcription de cotes de l'année</option>
                                </>
                            }
                        </select>
                        {
                            click === true && (
                                <>
                                    {isValidObjRecours === false ? <div style={validationStyle} className="mt-1">Veuillez choisir l'objet du recours svp !</div> : ""}
                                </>
                            )
                        }
                    </div>

                    <div className="col-6 colonne62">
                        <form encType="multipart/form-data" action=''>
                            <label style={{ marginBottom: '10px' }}>Postnom:</label> <br />
                            <input type="text" className='form-control' placeholder='Postnom'
                                value={userData['postnom']}
                                onChange={(e) => (setUserData({ ...userData, "postnom": e.target.value }), handlePostnom(e))}
                                style={{ width: '100%' }}
                            />
                            {
                                click === true && (
                                    <>
                                        {isValidPostnom === false ? <span style={validationStyle}>Veuillez renseigner votre postnom svp !</span> : ""}
                                    </>
                                )
                            }
                            <br />

                            <label style={{ marginBottom: '10px' }}>Cotes marquées sur le bulletin:</label> <br />
                            <div className="col-12"
                                style={{ border: "1px solid silver", height: 'auto', padding: '20px', marginLeft: '3px' }}
                            >

                                <div className="row">
                                    <div className="col-sm-6">
                                        <label style={{ marginBottom: '10px' }}>Année:</label> <br />
                                        <input
                                            className="mb-3 form-control"
                                            type="number"
                                            placeholder='Renseigner le cote année'
                                            onChange={handleAnne}
                                            style={{ width: '100%' }}
                                        />
                                        {
                                            click === true && (
                                                <>
                                                    {objChoist ? <span style={validationStyle}>Veuillez renseigner une cote de l'année svp !</span> : ""}
                                                </>
                                            )
                                        }
                                    </div>

                                    <div className="col-sm-6">
                                        <label style={{ marginBottom: '10px' }}>Examen:</label> <br />
                                        <input className='form-control'
                                            type="number"
                                            placeholder='Renseigner le cote examen'
                                            onChange={handleCoteExam}
                                            style={{ width: '100%' }}
                                        />
                                        {
                                            click === true && (
                                                <>
                                                    {objChoist ? <span style={validationStyle}>Veuillez renseigner une cote de l'examen svp !</span> : ""}
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                                <input type="checkbox" onChange={checkBoxFunction} /> <label>Ajouter une preuve sous format image </label>

                                {checked &&
                                    <div className='row' style={{ margin: '0px' }}>
                                        <input type='file' className='col-sm-12 form-control mt-2' onChange={(e) => setUserData({ ...userData, "file": e.target.files[0] })} style={{ width: "100%" }} />
                                    </div>
                                }

                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-12 formB container">
                <div className="row">
                    <div className="col-12">
                        <Button
                            onClick={stepNext}
                            className='mb-3 btn-confirm'
                            style={{ float: "right" }}
                        >
                            Suivant
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Form1