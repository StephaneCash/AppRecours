import React, { useContext, useState, useEffect } from 'react'
import { Button, TextField, Card } from "@material-ui/core";
import "../css/Form.css";
import { multiStepContext } from "../StepContext";
import InputAdornment from '@mui/material/InputAdornment';
import { MenuBook } from '@material-ui/icons';


function Form2() {

    const { setCurrentStep, userData, setUserData } = useContext(multiStepContext);

    const [pays, setPays] = useState([]);

    const [click, setClick] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [msgEmail, setMsgEmail] = useState("");
    const [isValidNumber, setIsValidNumber] = useState(false);
    const [msgNumPhone, setMsgNumPhone] = useState("");
    const [isValidPays, setIsValidPays] = useState(false);
    const [isValidNationalite, setIsValidNationalite] = useState(false);

    const handleEamil = (e) => {
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (e.target.value === "") {
            setIsValidEmail(false);
            setMsgEmail("Veuillez renseigner une adresse email svp !")
        }
        else if (e.target.value.match(pattern)) {
            setIsValidEmail(true);
            setMsgEmail("Votre adresse email est valide.")
        } else {
            setIsValidEmail(false);
            setMsgEmail("Veuillez renseigner une adresse email valide svp !")
        }
    };

    const handleNumPhone = (e) => {
        if (e.target.value === "") {
            setIsValidNumber(false);
            setMsgNumPhone("Veuillez renseigner un numéro de téléphone svp !");
        } else if (e.target.value.match(/[0-9]/)) {
            setMsgNumPhone("Veuillez renseigner un numéro de téléphone valide svp !");
            setIsValidNumber(false);
            if (e.target.value.length > 9) {
                setMsgNumPhone("Numéro de téléphone valide.");
                setIsValidNumber(true);
            }
        }
    };

    const handlePays = (e) => {
        if (e.target.value === "--Pays--") {
            setIsValidPays(false);
        } else {
            setIsValidPays(true);
        };
    };

    const handleNationalite = (e) => {
        if (e.target.value === "--Nationalité--") {
            setIsValidNationalite(false);
        } else {
            setIsValidNationalite(true);
        };
    };

    const getPays = () => {
        
    }

    useEffect(() => {
        getPays();
    }, []);

    useEffect(() => {
        if (userData.email) {
            if (userData.email.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)) {
                setIsValidEmail(true);
            } else {
                setIsValidEmail(false);
            };
        };

        if (userData.numroPhone) {
            if (userData.numroPhone.match(/[0-9]/) && userData.numroPhone.length > 9) {
                setIsValidNumber(true);
            } else {
                setIsValidNumber(false);
            }
        }
        if (userData.pays) {
            setIsValidPays(true);
        }
        if (userData.nationalite) {
            setIsValidNationalite(true);
        }
    }, [isValidEmail, isValidNumber, isValidPays, isValidNationalite]);

    let paysRempli = "";
    let phoneCodePays = ""
    let codeFormat = ""

    if (userData.pays) {
        paysRempli = userData.pays;
    };

    for (let i = 0; i < pays.length; i++) {
        if (pays[i].name === paysRempli) {
            phoneCodePays = pays[i].phonecode;
        };
    };

    if (phoneCodePays.charAt(0) === "+") {
        codeFormat = phoneCodePays.replace(phoneCodePays.charAt(0), "");
    } else {
        codeFormat = phoneCodePays;
    }

    const nextStep = (e) => {
        e.preventDefault();
        setClick(true);

        if (isValidEmail === false || isValidNumber === false || isValidPays === false || isValidNationalite === false) {
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
                                <label style={{ marginBottom: '10px' }}>Adresse email:</label> <br />
                                <TextField
                                    helperText={
                                        click === true &&
                                        <>
                                            {
                                                isValidEmail === false ?
                                                    <>
                                                        {msgEmail !== "" ? msgEmail : "Veuillez renseigner une adresse email svp !"}
                                                    </>
                                                    : <span style={{ color: "green" }}>{msgEmail} Fai</span>
                                            }
                                        </>
                                    }
                                    label="Adresse email"
                                    variant="outlined"
                                    style={{ width: '100%' }}
                                    value={userData['email']}
                                    onChange={(e) => (setUserData({ ...userData, "email": e.target.value }), handleEamil(e))}
                                /> <br /> <br />

                                <label style={{ marginBottom: '10px' }}>Numéro de téléphone:</label> <br />
                                <TextField
                                    type="number"
                                    helperText={
                                        click === true &&
                                        <>
                                            {
                                                isValidNumber === false ?
                                                    <>
                                                        {msgNumPhone !== "" ? msgNumPhone : "Veuillez renseigner un numéro de téléphone svp !"}
                                                    </>
                                                    : <span style={{ color: "green" }}>{msgNumPhone} 'kk'</span>
                                            }
                                        </>
                                    }
                                    label="Numéro de téléphone"
                                    id="outlined-start-adornment"
                                    variant="outlined"
                                    value={userData['numroPhone']}
                                    style={{ width: '100%' }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">
                                            {phoneCodePays ? "+" + codeFormat : 'CODE'}
                                        </InputAdornment>,
                                    }}
                                    onChange={(e) => (setUserData({ ...userData, "numroPhone": e.target.value }), handleNumPhone(e))}
                                />
                            </div>

                            <div className="col-6">
                                <label style={{ marginBottom: '10px' }}>Choisir votre pays:</label> <br />
                                <select
                                    className="form-control"
                                    value={userData["pays"]}
                                    onChange={(e) => (setUserData({ ...userData, "pays": e.target.value }), handlePays(e))}
                                    style={{ width: "100%", marginRight: "10px", height: "61px", marginTop: '-5px', boxShadow: "none", border: "1px solid silver" }}
                                >
                                    {
                                        userData.pays ?
                                            <>
                                                {
                                                    pays.map((val, index) => {
                                                        return (
                                                            <>
                                                                <option key={index}>{val.name}</option>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </> :
                                            <>
                                                <option>--Pays--</option>
                                                {
                                                    pays.map((val, index) => {
                                                        return (
                                                            <>
                                                                <option key={index}>{val.name}</option>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </>
                                    }

                                </select>
                                <br />

                                {
                                    click === true && (
                                        <>
                                            {isValidPays === false ? <div className="sexeObligatoire">Veuillez choisir un pays svp ! <br /><br /></div> : ""}
                                        </>
                                    )
                                }

                                <label style={{ marginBottom: '10px' }}>Votre nationalité:</label> <br />
                                <select
                                    className="form-control"
                                    value={userData['nationalite']}
                                    onChange={(e) => (setUserData({ ...userData, "nationalite": e.target.value }), handleNationalite(e))}
                                    style={{ width: "100%", marginRight: "10px", height: "61px", marginTop: '-5px', boxShadow: "none", border: "1px solid silver" }}
                                >

                                    {
                                        userData.nationalite ?
                                            <>
                                                {
                                                    pays.map((val, index) => {
                                                        return <option key={index}>{val.currency}</option>
                                                    })
                                                }
                                            </> :
                                            <>
                                                <option>--Nationalité--</option>
                                                {
                                                    pays.map((val, index) => {
                                                        return <option key={index}>{val.currency}</option>
                                                    })
                                                }
                                            </>
                                    }
                                </select>
                                <br />
                                {
                                    click === true && (
                                        <>
                                            {isValidNationalite === false ? <div className="sexeObligatoire">Veuillez choisir une nationalité svp ! <br /><br /></div> : ""}
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-12 container">
                        <div className="row">
                            <div className="col-12">

                                <Button
                                    className='mb-3 btn-confirm'
                                    type="submit"
                                    style={{ marginLeft: "10px", float: "right" }}
                                >
                                    Suivant
                                </Button>
                                <Button
                                    className='mb-3 btn-back'
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