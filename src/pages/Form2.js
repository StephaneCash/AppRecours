import React, { useContext, useState, useEffect } from 'react'
import { Button, Card } from "@material-ui/core";
import "../css/Form.css";
import { multiStepContext } from "../StepContext";
import { MenuBook, Person } from '@material-ui/icons';
import axios from 'axios';

function Form2() {

    const { setCurrentStep, userData, setUserData } = useContext(multiStepContext);

    const [click, setClick] = useState(false);
    const [isValidPostnom, setIsValidPostnom] = useState(false);
    const [isValidNom, setIsValidNom] = useState(false);
    const [isValidCours, setIsValidCours] = useState(false);

    const [data, setData] = useState([]);
    const [nomProf, setNomProf] = useState("");
    const [dataProfOne, setDataProfOne] = useState([]);

    const getAllCours = () => {
        axios.get(`http://localhost:5000/api/profs`)
            .then(resp => {
                setData(resp.data);
            })
            .catch(err => {
                console.log(err)
            })
    };

    const getDataProfByName = () => {
        if (nomProf) {
            axios.get(`http://localhost:5000/api/profs?name=${nomProf}`)
                .then(res => {
                    setDataProfOne(res.data);
                })
                .catch(err => {
                    console.log("ERREUR ", err)
                })
        }
    }

    useEffect(() => {
        getAllCours();
    }, []);

    useEffect(() => {
        getDataProfByName();
    }, [nomProf]);

    const handleNom = (e) => {
        if (e.target.value === "") {
            setIsValidNom(false);
        } else {
            setIsValidNom(true);
            setNomProf(e.target.value.split(" ")[0]);
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
        let value = e.target.value
        let valSub = value.split(" ")
        let lenghtValue = valSub.length
        console.log(parseInt(valSub[lenghtValue - 1]))
        setUserData({ ...userData, "cours": valSub[lenghtValue - 2], "ponderation" : parseInt(valSub[lenghtValue - 1]) })

        if (e.target.value === '--Cours--') {
            setIsValidCours(false);
        } else {
            setIsValidCours(true);
        }
    }

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
            <h3 className='text-center'><Person color='primary' /></h3>
            <Card>
                <form onSubmit={nextStep}>
                    <div className="col-10 container form2 mt-3">
                        <div className="row">
                            <div className="col-sm-6">
                                <label style={{ marginBottom: '10px' }}>Choisir le nom du prof:</label> <br />
                                <select
                                    className='form-control' placeholder='Nom du prof.'
                                    style={{ width: '100%' }}
                                    value={userData['nomProf']}
                                    onChange={(e) => (setUserData({ ...userData, "nomProf": e.target.value }), handleNom(e))}
                                >
                                    {data.data && data.data.map((val, index) => {
                                        return (
                                            <option key={index}>{val.nom} {val.postnom}</option>
                                        )
                                    })}
                                </select>
                                {
                                    userData.nomProf ? <>Professeur choisi : <span style={{ color: "green" }}>{userData.nomProf}</span>.</> : ' Aucun cours n\'a été choisi.'
                                }
                                {
                                    click === true &&
                                    <>
                                        {
                                            isValidNom === false ? 'Veuillez renseigner le nom du professeur svp !' : ''
                                        }
                                    </>
                                }
                            </div>
                            <div className="col-sm-6">
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
                                onChange={handleCours}
                                style={{ width: "100%", marginRight: "10px", height: "61px", marginTop: '-5px', boxShadow: "none", border: "1px solid silver" }}
                            >
                                <option>--Cours--</option>
                                {dataProfOne.data && dataProfOne.data.map((val, index) => {
                                    return val.cours.map((val, index) => {
                                        return (
                                            <option key={index}>{val.nom} {val.ponderation}</option>
                                        )
                                    })
                                })}

                            </select>

                            {
                                userData.cours !== "--Cours--" ? <>Cours choisi : <span style={{ color: "green" }}>{userData.cours}</span>.</> : ' Aucun cours n\'a été choisi.'
                            }

                            {
                                click === true && (
                                    <>
                                        {isValidCours === false ? <div className="mt-1">Veuillez choisir le nom du cours svp !</div> : ""}
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