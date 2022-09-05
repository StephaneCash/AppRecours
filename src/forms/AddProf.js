import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import SideBar from '../components/SideBar';
import axios from "axios";
import swal from "sweetalert";

function AddProf() {

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    const initialiseValues = { id: "", nom: "", postnom: "" };
    const [formData, setFormData] = useState(initialiseValues);

    const { id, nom, postnom } = formData;
    const [errs, setErr] = useState({});

    const submitData = () => {
        if (state) {
            axios.put(`http://localhost:5000/api/profs/${id}`, formData)
                .then(resp => {
                    swal({ title: "Succès", icon: "success", text: resp.data.msg });
                    navigate('/professeurs');
                })
                .catch(err => {
                    swal({ title: "Attention", icon: "warning", text: err.response.data.data.errors[0].message ? err.response.data.data.errors[0].message : err.response.data.data.errors[1].message })
                })
        } else {
            axios.post(`http://localhost:5000/api/profs`, formData)
                .then(resp => {
                    swal({ title: "Succès", icon: "success", text: resp.data.msg });
                    navigate('/professeurs');
                })
                .catch(err => {
                    console.log(err)
                    setErr(err.response)
                    swal({ title: "Attention !", icon: "warning", text: errs.data.err.errors[0].message ? errs.data.err.errors[0].message : errs.data.err.errors[1].message })
                });
        }
    };

    const changeValue = (e) => {
        const { value, id } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    useEffect(() => {
        if (state) {
            setFormData(state.val)
        }
    }, []);

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
                                    <label> {state ? "Editer " : "Ajouter"} un professeur</label> <br /><br />
                                    <h6>
                                        <NavLink to="/professeurs"><i className='fa fa-angle-left'></i> Retour</NavLink>
                                    </h6><br />
                                    <div className='row'>
                                        <div className="col-sm-6">
                                            <label>Nom du professeur</label>
                                            <input id="nom" type="text" value={nom} placeholder="Entrer le nom d'un professeur" className="form-control mt-1" onChange={changeValue} />
                                            <label className='mt-1'>Postnom</label>
                                            <input id="postnom" type="text" value={postnom} placeholder="Entre un postnom" className='form-control' onChange={changeValue} />
                                            <button type='button' style={{
                                                marginTop: '10px',
                                                padding: '4px', borderRadius: '5px', color: 'white', backgroundColor: '#14234a'
                                            }} onClick={submitData}
                                            >
                                                {state ? "Editer" : "Ajouter"}
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

export default AddProf