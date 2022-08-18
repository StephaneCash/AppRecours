import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
import axios from "axios";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import swal from "sweetalert";

function AddFiliere() {

    const [nomFiliere, setNomFiliere] = useState("");
    const [clicAdd, setClickAdd] = useState(false);
    const [id, setId] = useState(0);
    const [oneFil, setOneFil] = useState([])

    const navigate = useNavigate();

    const location = useLocation();
    const { state } = location;

    const getOneUser = () => {
        if (state) {
            axios.get(`http://localhost:5000/api/filieres/${state.id}`).then(resp => {
                setOneFil(resp.data);
            }).catch((err => {
                console.log(err)
            }))
        }
    }

    useEffect(() => {
        getOneUser();
    }, [id]);

    const submitData = () => {
        if (nomFiliere === "") {
            alert("Veuillez entrer le nom d'une filière svp !");
        }
        axios.post(`http://localhost:5000/api/filieres`, { nom: nomFiliere })
            .then(resp => {
                console.log(resp);
                const filiereInput = document.getElementById('text');
                filiereInput.value = '';
                setClickAdd(false);
                navigate('/filieres');
                swal({ title: "Succès", icon: 'success', text: 'Filière ajoutée avec succès' })
            })
            .catch(err => {
                console.log(err);
                setClickAdd(false);
            })
    }

    return (
        <div className='col-md-12'>
            <div className='d-flex'>
                <div className='col-2'>
                    <SideBar />
                </div>
                <div className='col-10'>
                    <div className='mainRecours container'>
                        <main>
                            <section className="recent">
                                <div className="col-sm-12">
                                    <label> {state ? "Editer " : "Ajouter"} une filière</label> <br /><br />
                                    <h6>
                                        <NavLink to="/filieres"><i className='fa fa-angle-left'></i> Retour</NavLink>
                                    </h6><br />
                                    <div className='row'>
                                        <div className="col-sm-6">
                                            <input id="text" type="text" value={state ? oneFil?.data?.nom : nomFiliere} className='form-control' onChange={(e) => setNomFiliere(e.target.value)}
                                                placeholder="Entrer le nom de la filière" /> <br /><br />
                                        </div>
                                        <div className="col-sm-2">

                                            <button type='button' style={{
                                                padding: '4px', borderRadius: '5px', color: 'white', backgroundColor: '#14234a'
                                            }} onClick={submitData}>
                                                {clicAdd ? "Ajout en cours..." : "Ajouter"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddFiliere