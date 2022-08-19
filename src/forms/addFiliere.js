import React, { useState, useEffect, useRef } from 'react';
import SideBar from '../components/SideBar';
import axios from "axios";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import swal from "sweetalert";

function AddFiliere() {

    const [clicAdd, setClickAdd] = useState(false);

    const initialiseValues = { id: "", nom: "" };
    const [formData, setFormData] = useState(initialiseValues);

    const navigate = useNavigate();

    const { nom, id} = formData;

    console.log(nom, id)

    const valueInput = useRef();

    const location = useLocation();
    const { state } = location;

    useEffect(() => {
        if (state) {
            setFormData(state.val)
        }
    }, []);

    const changeValue = (e) => {
        const { value, id } = e.target;
        setFormData({ ...formData, [id]: value });
        console.log(id, value)
    }

    const editFiliere = () => {
        axios.put(`http://localhost:5000/api/filieres/${id}`, { nom: nom })
            .then(resp => {
                swal({ title: 'Succès', icon: 'success', text: "Filière editée avec succès" });
                navigate('/filieres');
            })
            .catch(err => {
                console.log(err);
                swal({ title: 'Echec', icon: 'error', text: "Filière Non Modifiée" });
            })
    }

    const submitData = () => {
        if (nom === "") {
            alert("Veuillez entrer le nom d'une filière svp !");
        }
        axios.post(`http://localhost:5000/api/filieres`, { nom: nom })
            .then(resp => {
                console.log(resp);
                setClickAdd(false);
                navigate('/filieres');
                swal({ title: "Succès", icon: 'success', text: 'Filière ajoutée avec succès' });
            })
            .catch(err => {
                console.log(err);
                setClickAdd(false);
                swal({ title: "Echec", icon: 'error', text: 'Filière non ajoutée' });
            });
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
                                            <input id="nom" value={nom} type="text" className='form-control' onChange={changeValue}
                                                placeholder="Entrer le nom de la filière" ref={valueInput} /> <br /><br />
                                        </div>
                                        <div className="col-sm-2">

                                            <button type='button' style={{
                                                padding: '4px', borderRadius: '5px', color: 'white', backgroundColor: '#14234a'
                                            }} onClick={state ? editFiliere : submitData}>
                                                {clicAdd ? state ? "Edition en cours..." : "Ajout en cours..." : state ? "Editer" : "Ajouter"}
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