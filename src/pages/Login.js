import React, { useEffect, useContext } from 'react'
import '../css/Login.css';
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import { multiStepContext } from "../StepContext";

function Login() {

    const [btnState, setBtnState] = useState(false);

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [err, setErr] = useState({});

    const { setUserLoggedIn, userLoggedIn } = useContext(multiStepContext);

    // Is Valids Inputs
    const [isValidEmail, setIsValidEmail] = useState(false);

    const handleEmail = (e) => {
        if (e.target.value === "") {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false);
            setErr("")
        }
    }

    const handlePwd = (e) => {
        setPwd(e.target.value);
    }

    useEffect(() => {
        setErr("")
    }, [])

    let navigate = useNavigate();

    const connecter = () => {
        setBtnState(true);

        const url = 'http://localhost:5000/api/user/login';

        axios.post(url, { email, password: pwd }).then(res => {
            console.log(res)
            setUserLoggedIn(res.data);
            setErr("")
            if (res.data.jeton) {
                localStorage.setItem('user', JSON.stringify(res.data))
            }

            if (res.data.role === "admin") {

            }
            navigate('/dashboard');
            setBtnState(false);
        }).catch(erreur => {
            console.log(erreur)
            setErr(erreur.response.data.message)
            setBtnState(false);
        })
    };

    console.log(userLoggedIn, " DATA LOGGED")

    return (
        <div className='col-sm-4 mt-3 container'>
            <div className='card'>
                <div className='card-header'>
                    <h3 className='mt-4 text-center' style={{ with: '20px !important' }}> Connexion
                        <br />
                        <i className='fa fa-user-circle'></i>
                    </h3>
                </div>
                <div className='card-body'>
                    <div className='mb-3'>
                        <label className='mb-1 text-dark'>Entrer votre username ou votre email</label>
                        <input type="email" className='form-control' placeholder='Email ou Username' onChange={(e) => (handleEmail, setEmail(e.target.value))} required />
                        <span>
                            {
                                btnState && isValidEmail ? <span className='text-danger'>Veuillez entrer une adresse email svp.</span> : ""
                            }
                        </span>
                    </div>

                    <div className='mt-3 mb-2'>
                        <label className='mb-1 text-dark' >Entrer votre mot de passe</label>
                        <input type="password" className='form-control' placeholder='Password' onChange={handlePwd} />
                    </div>


                    {err.length > 0 ? <span className='text-danger text-center'>{err}.</span> : ""}
                </div>
                <div className='card-footer text-center '>
                    {
                        pwd === "" || email === "" ?
                            <button
                                disabled style={{ width: "100%" }}
                                className='btnConnect'>Se connecter</button> :

                            <button
                                onClick={connecter}
                                type='button'
                                className='btn' style={{ border: "1px solid silver", width: "100%" }}>{btnState ? <i className="fa fa-spinner fa-spin"></i> : 'Se connecter'}</button>
                    }
                    <br />

                    <h6 className='mt-2'>Pas de compte ?  <NavLink to='/inscription'>créer un</NavLink></h6>
                </div>
            </div>
        </div>
    )
}

export default Login