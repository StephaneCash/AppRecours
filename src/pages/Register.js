import React, { useState } from 'react';
import { NavLink } from "react-router-dom";


function Register() {

    const [pwd, setPwd] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const [btnState, setBtnState] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);

    const handlePwd = (e) => {

    };

    const repetePwd = (e) => {

    };

    const registerFunction = () => {

    };

    const handleEmail = (e) => {

    }

    return (

        <div className='col-sm-4 mt-3 container'>
            <div className='card'>
                <div className='card-header'>
                    <h3 className='mt-4 text-center' style={{ with: '20px !important' }}> Créer un compte
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
                        <label className='mb-1 text-dark' >Créer votre mot de passe</label>
                        <input type="password" className='form-control' placeholder='Password' onChange={handlePwd} />
                    </div>

                    <div className='mt-3 mb-2'>
                        <label className='mb-1 text-dark' >Répéter le mot de passe</label>
                        <input type="password" className='form-control' placeholder='Password' onChange={repetePwd} />
                    </div>

                </div>
                <div className='card-footer text-center '>
                    {
                        pwd === "" || email === "" ?
                            <button
                                disabled style={{ width: "100%" }}
                                className='btnConnect'>Enregister-vous</button> :

                            <button
                                onClick={registerFunction}
                                type='button'
                                className='btn' style={{ border: "1px solid silver", width: "100%" }}>{btnState ? <i className="fa fa-spinner fa-spin"></i> : 'Enregister-vous'}</button>
                    }
                    <br />

                    <h6 className='mt-2'>Vous avez un compte ?  <NavLink to='/'>Connectez-vous un</NavLink></h6>
                </div>
            </div>
        </div>
    )
}

export default Register