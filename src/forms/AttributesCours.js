import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import SideBar from '../components/SideBar';
import axios from "axios";

function AttributesCours() {

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    const [formData, setFormData] = useState({});

    const [cours, setCours] = useState([]);

    const { id, nom, postnom } = formData;

    const getAllCours = () => {
        axios.get(`http://localhost:5000/api/cours`)
            .then(resp => {
                setCours(resp.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const attributionFunction = (val) => {
        axios.put(`http://localhost:5000/api/cours/${val}`, { professeurId: id })
            .then(resp => {
                console.log(resp.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        if (state) {
            setFormData(state.val)
        }
        getAllCours();
    }, []);

    const styleBtn = {
        border: "1px solid silver", padding: '6px', borderRadius: "4px", boxShadow: "1px 1px 10px silver", marginRight: "5px"
    };

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
                                    <label> Attribuer de cours </label> <br /><br />
                                    <h6>
                                        <NavLink to="/professeurs"><i className='fa fa-angle-left'></i> Retour</NavLink>
                                    </h6><br />
                                    <div className='row'>

                                        <div className="col-sm-6">
                                            <div className="alert alert-success">
                                                Professeur :   {nom + " " + postnom}
                                            </div>
                                        </div>

                                        <div className="col-sm-12">
                                            <p>Cliquer sur un cours pour lui attribuer à un professeur</p>
                                            {
                                                cours.data ? cours.data.map((val, index) => {
                                                    return <button style={styleBtn} key={index} onClick={() => attributionFunction(val.id)}>
                                                        <i className="fa fa-plus"></i> {val.nom}</button>
                                                }) : 'Aucun cours trouvé.'
                                            }
                                        </div>

                                        <div className="col-sm-3 mt-3">
                                            <button type='button' style={{
                                                padding: '4px', borderRadius: '5px', color: 'white', backgroundColor: '#14234a'
                                            }}>
                                                Attributer
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

export default AttributesCours