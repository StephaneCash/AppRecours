import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import "../css/Register.css";

function Register() {

    const [pwd, setPwd] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const [pseudo, setPseudo] = useState('');
    const [passRepete, setPassRepete] = useState('');

    const [btnState, setBtnState] = useState(true);
    const [err, setErr] = useState({});
    const [clic, setClic] = useState(true);

    const navigate = useNavigate();

    const registerFunction = () => {
        setBtnState(true);
        if (pwd.length < 6) {
            swal({
                title: 'Avertissement',
                icon: 'warning',
                text: "Votre mot de passe doit avoir au moins 6 caractères"
            });
            setBtnState(false);
        } else if (pwd !== passRepete) {
            swal({
                title: 'Avertissement',
                icon: 'warning',
                text: "Les deux mots de passe ne correspondent pas."
            });
            setBtnState(false);
        } else {
            axios.post(`http://localhost:5000/api/users`, {
                pseudo: pseudo,
                email: email,
                password: pwd,
                role: role
            })
                .then(res => {
                    swal({
                        title: 'Succès',
                        icon: 'success',
                        text: `${res.data.message} vous serez redirectionné vers la page de connexion dans 3s`
                    })
                    setTimeout(() => {
                        navigate('/');
                    }, 3000)
                    setBtnState(false);
                })
                .catch(err => {
                    console.log(err.response);
                    setErr(err.response)
                    setBtnState(false);
                });
        }
    };

    const showPassFunction = () => {
        setClic(!clic);

        if (clic) {
            const inputPass = document.getElementById('refPass')
            inputPass.type = "text";
        } else {
            const inputPass = document.getElementById('refPass')
            inputPass.type = "password";
        }
    };

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
                            <input type="password" className='form-control' placeholder='Password' id="refPass" onChange={(e) => setPwd(e.target.value)} />
                            Voir le mot de passe <i className="fa fa-eye showPass" id='showPass' onClick={showPassFunction}></i>
                        </div>
                        <div className='col-sm-6'>
                            <label className='mb-1 text-dark' >Répéter le mot de passe</label>
                            <input type="password" className='form-control' placeholder='Password' onChange={(e) => setPassRepete(e.target.value)} />
                        </div>
                    </div>

                    <div className='row mt-3'>
                        <label>Choisir votre statut</label>
                        <div className='col-sm-12'>
                            <select className='form-control' onChange={(e) => setRole(e.target.value)}>
                                <option>--Role--</option>
                                <option>Etudiant</option>
                                <option>Professeur</option>
                            </select>
                        </div>
                    </div>

                    <div className='row'>
                        <div className="col-sm-12">
                            {err ? <span className="text-danger">{err.data}</span> : ""}
                        </div>
                    </div>
                </div>

                <div className='card-footer text-center '>
                    {
                        pwd === "" || email === "" || pseudo === "" || passRepete === "" || role === "" ?
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