import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from "axios";

function Register() {

    const [pwd, setPwd] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const [pseudo, setPseudo] = useState('');
    const [passRepete, setPassRepete] = useState('');

    const [btnState, setBtnState] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);

    console.log(role)

    const registerFunction = () => {
        axios.post(`http://localhost:5000/api/users`, {
            pseudo: pseudo, 
            email: email,
            password: pwd,
            role: role
        })
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err.response);
        });
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
                    <div className='row'>
                        <div className='col-sm-6'>
                            <label className='mb-1 text-dark'>Entrer un username</label>
                            <input type="text" className='form-control' placeholder='Email ou Username' onChange={(e) => (setPseudo(e.target.value))} required />
                        </div>
                        <div className='col-sm-6'>
                            <label className='mb-1 text-dark'>Entrer une adresse email</label>
                            <input type="email" className='form-control' placeholder='Email ou Username' onChange={(e) => (setEmail(e.target.value))} required />
                        </div>
                    </div>

                    <div className='row mt-3'>
                        <div className='col-sm-6'>
                            <label className='mb-1 text-dark'>Créer votre mot de passe</label>
                            <input type="password" className='form-control' placeholder='Password' onChange={(e)=>setPwd(e.target.value)} />
                        </div>
                        <div className='col-sm-6'>
                            <label className='mb-1 text-dark' >Répéter le mot de passe</label>
                            <input type="password" className='form-control' placeholder='Password' onChange={(e)=>setPassRepete(e.target.value)} />
                        </div>
                    </div>

                    <div className='row mt-3'>
                        <label>Choisir votre statut</label>
                        <div className='col-sm-12'>
                            <select className='form-control' onChange={(e)=>setRole(e.target.value)}>
                                <option>Etudiant</option>
                                <option>Professeur</option>
                            </select>
                        </div>
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