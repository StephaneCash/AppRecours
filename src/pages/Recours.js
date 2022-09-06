import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import SideBar from '../components/SideBar';
import axios from "axios";
import swal from "sweetalert"
import DetailRecours from "../forms/DetailRecours";

function Recours() {

    const [recours, setRecours] = useState([]);

    const [showModalDetailRecours, setShowModalDetailRecours] = useState(false);
    const [valRecours, setValRecours] = useState([]);

    const showModalDetailRecoursFunction = (val) => {
        setShowModalDetailRecours(true);
        setValRecours(val);
    };
    const closeModalDetailRecours = () => {
        setShowModalDetailRecours(false);
    };

    const getAllRecours = () => {
        axios.get(`http://localhost:5000/api/recours`)
            .then(resp => {
                setRecours(resp.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        getAllRecours();
    }, []);

    useEffect(() => {
        if (recours.taille === 0) {
            getAllRecours()
        }
    }, [recours]);

    const deleteRecours = (id) => {
        swal({
            title: "Avertissement.",
            text: "Etes-vous sûr de vouloir supprimer ce recours ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:5000/api/recours/${id}`)
                    .then(resp => {
                        getAllRecours();
                        swal(resp.data.message, {
                            icon: "success",
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }).catch((error) => {
            console.log(error);
        });
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
                                <h4>Liste de recours</h4>
                                <div className='col-md-12'>
                                    <div className="card">
                                        <div className='card-header'>
                                            <div className='d-flex'>
                                                <div className="col-2"> {recours.taille && recours.taille} Recours</div>
                                                <div className='col-10'>
                                                    <NavLink to='addRecours' style={{ textAlign: 'right' }}>
                                                        <button style={{ flex: '1', float: 'right', textAlign: 'right', padding: '4px', borderRadius: '5px', color: 'white', backgroundColor: '#14234a', border: "1px solid #fff" }}>Créer un recours</button>
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='card-body'>
                                            <table className="table table-striped table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>N°</th>
                                                        <th>Nom Etudiant </th>
                                                        <th>Promotion</th>
                                                        <th>Object Recours</th>
                                                        <th>Cours</th>
                                                        <th>Professeur</th>
                                                        <th style={{ width: '130px' }}>Statut</th>
                                                        <th style={{ width: '160px' }}>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {recours.data ?
                                                        recours.taille >= 1 ?
                                                            recours.data.map((val, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{val.nomEtudiant} {val.postnomEtudiant}</td>
                                                                        <td>{val.promotion}</td>
                                                                        <td>{val.objetRecours}</td>
                                                                        <td>{val.cours}</td>
                                                                        <td>{val.nomCompletProf}</td>
                                                                        <td>
                                                                            {val.statut === 0 ? <><i className='fa fa-spinner fa-spin'></i> En attente...</> : "Répondu"}
                                                                        </td>
                                                                        <td>
                                                                            <button style={{
                                                                                flex: '1', float: 'right', textAlign: 'right', marginLeft: '5px',
                                                                                padding: '4px', borderRadius: '5px', color: 'white', backgroundColor: '#14234a'
                                                                            }} onClick={() => deleteRecours(val.id)}>Supprimer</button>

                                                                            <button onClick={() => showModalDetailRecoursFunction(val)} style={{
                                                                                flex: '1', float: 'right', textAlign: 'right',
                                                                                padding: '4px', borderRadius: '5px', color: 'white', backgroundColor: '#14234a'
                                                                            }}>Détail</button>

                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                            :
                                                            <tr>
                                                                <td colSpan='8px' className='text-center'>Aucune donnée enregistrée.</td>
                                                            </tr>
                                                        :
                                                        <tr>
                                                            <td colSpan='8px' className='text-center'><i className='fa fa-spinner fa-spin fa-2x'></i></td>
                                                        </tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </main>
                    </div>
                </div>
            </div>
            <DetailRecours
                show={showModalDetailRecours}
                closeModal={closeModalDetailRecours}
                data={valRecours}
            />
        </div>
    )
}

export default Recours