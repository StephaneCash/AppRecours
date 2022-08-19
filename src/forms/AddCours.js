import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import SideBar from '../components/SideBar'

function AddCours() {

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    const initialiseValues = { id: "", nom: "", postnom: "" };
    const [formData, setFormData] = useState(initialiseValues);

    const [profs, setProfs] = useState([]);

    const changeValue = (e) => {
        const { value, id } = e.target;
        setFormData({ ...formData, [id]: value });
        console.log(id, value)
    };

    const getAllProfs = () => {
        axios.get(`http://localhost:5000/api/profs`).then(resp => {
            setProfs(resp.data);
            console.log(resp.data);
        }).catch(err => {
            console.log(err)
        });
    };

    useEffect(() => {
        getAllProfs();
    }, []);

    const submitData = () => {
        
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
                                    <label> {state ? "Editer " : "Ajouter"} une cours</label> <br /><br />
                                    <h6>
                                        <NavLink to="/cours"><i className='fa fa-angle-left'></i> Retour</NavLink>
                                    </h6><br />
                                    <div className='row'>
                                        <div className="col-sm-6">
                                            <label>Nom du cours</label>
                                            <input type="text" className="form-control mt-1" id="nom" onChange={changeValue} />

                                            <label>Pondération</label>
                                            <input type="number" className="form-control mt-1" id="ponderation" onChange={changeValue} />

                                            <label>Sélectionne un professeur</label>
                                            <select className="form-control mt-1" id="professeurId" onChange={changeValue}>
                                                {profs.data ? profs.data.map((val, index) => {
                                                    return <option key={index} value={val.id}>{val.nom}</option>
                                                }) : 'Aucune donnée.'}
                                            </select>

                                            <button type='button' style={{
                                                marginTop: "10px",
                                                padding: '4px', borderRadius: '5px', color: 'white', backgroundColor: '#14234a'
                                            }} onClick={submitData}>
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

export default AddCours