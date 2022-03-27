import React from 'react'
import '../css/Login.css';
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Login() {

    const [btnState, setBtnState] = useState(true);

    let navigate = useNavigate();

    const connecter = () =>{
        setBtnState(!btnState);

        setTimeout(()=>{
            navigate('/dashboard');
        }, 1000);
    }

    return (
        <div className='login container'>
            <div className='card'>
                <div className='card-header'>
                    <h3 className='mt-4' style={{with:'20px !important'}}> Se connecter</h3>
                </div>
                <div className='card-body'>
                    <div className='mb-3'>
                        <label className='mb-1'>Entrer votre username ou votre email</label>
                        <input type="text" className='form-control' placeholder='Email ou Username' />
                    </div>

                    <div className='mt-3'>
                        <label className='mb-1'>Entrer votre mot de passe</label>
                        <input type="password" className='form-control' placeholder='Password' />
                    </div>
                </div>
                <div className='card-footer '>
                    <button 
                        onClick={connecter}
                        type='submit' 
                        className='btnConnexion'>{btnState ? 'Se connecter' : 'Connexion...'}</button>
                </div>
            </div>
        </div>
    )
}

export default Login