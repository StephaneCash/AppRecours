import React from 'react'
import '../css/Login.css';
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
 
function Login() {

    const [btnState, setBtnState] = useState(false);
 
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [err, setErr] = useState({});

    // Is Valids Inputs
    const [isValidEmail, setIsValidEmail] = useState(false);

    const handleEmail = (e) => { 
        if (e.target.value === "") {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false);
        }
    }

    const handlePwd = (e) => {
        setPwd(e.target.value);
    } 

    let navigate = useNavigate();

    const connecter = () => {
        setBtnState(true);

        axios.post(`http://localhost:5000/api/user/login`, { email, password: pwd }).then(res => {
            console.log(res)
            if(res.data.jeton){
                localStorage.setItem('user', JSON.stringify(res.data))
            }
            setBtnState(false);
        }).catch(err => {
            console.log(err)
            setErr(err)
            setBtnState(false);
        })
    }

    return (
        <div className='login container'>
            <div className='card'>
                <div className='card-header'>
                    <h3 className='mt-4' style={{ with: '20px !important' }}> Se connecter</h3>
                </div>
                <div className='card-body'>
                    <div className='mb-3'>
                        <label className='mb-1'>Entrer votre username ou votre email</label>
                        <input type="text" className='form-control' placeholder='Email ou Username' onChange={(e) => (handleEmail, setEmail(e.target.value))} />
                        <span>
                            {
                                btnState && isValidEmail ? <span className='text-danger'>Veuillez entrer une adresse email svp.</span> : ""
                            }
                        </span>
                    </div>

                    <div className='mt-3'>
                        <label className='mb-1'>Entrer votre mot de passe</label>
                        <input type="password" className='form-control' placeholder='Password' onChange={handlePwd} />
                    </div>
                </div>
                <div className='card-footer '>
                    {
                        pwd === "" || email === "" ?
                            <button
                                disabled
                                className='btnConnect'>Se connecter</button> :

                            <button
                                onClick={connecter}
                                type='button'
                                className='btnConnexion'>{btnState ? 'Connexion...' : 'Se connecter'}</button>
                    }
                </div>
                <br />
                <h5>Pas de compte ? créer un <NavLink to='inscription'></NavLink></h5>
            </div>
        </div>
    )
}

export default Login