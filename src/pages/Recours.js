import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import SideBar from '../components/SideBar';
import axios from "axios";

function Recours() {

    const [recours, setRecours] = useState([]);

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
        getAllRecours()
    }, []);

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
                        getAllFilieres();
                        console.log(resp.data);
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
                                                <div className="col-2">Recours</div>
                                                <div className='col-10'>
                                                    <NavLink to='addRecours' style={{ textAlign: 'right' }}>
                                                        <button style={{ flex: '1', float: 'right', textAlign: 'right', padding: '4px', borderRadius: '5px', color: 'white', backgroundColor: '#14234a' }}>Créer un recours</button>
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='card-body'>
                                            <table className="table table-striped table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>N°</th>
                                                        <th>Nom complet Etudiant </th>
                                                        <th>Promotion</th>
                                                        <th>Object Recours</th>
                                                        <th>Cours</th>
                                                        <th>Professeur</th>
                                                        <th>Statut</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {recours.data ?
                                                        recours.taille >= 1 ?
                                                            recours.data.map((val, index) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{index + 1}</td>
                                                                        <td>{val.nomEtudiant} {val.postnomEtudiant}</td>
                                                                        <td>{val.promotion}</td>
                                                                        <td>{val.objetRecours}</td>
                                                                        <td>{val.cours}</td>
                                                                        <td>{val.nomCompletProf}</td>
                                                                        <td>
                                                                            {val.statut === 0 ? 'En cours' : "Répondu"}
                                                                        </td>
                                                                        <td>
                                                                            <button style={{
                                                                                flex: '1', float: 'right', textAlign: 'right', marginLeft: '5px',
                                                                                padding: '4px', borderRadius: '5px', color: 'white', backgroundColor: '#14234a'
                                                                            }} onClick={() => deleteRecours(val.id)}>Supprimer</button>

                                                                            <NavLink to={{ pathname: "add-filiere" }} state={{ val: val }}>
                                                                                <button style={{
                                                                                    flex: '1', float: 'right', textAlign: 'right',
                                                                                    padding: '4px', borderRadius: '5px', color: 'white', backgroundColor: '#14234a'
                                                                                }}>Détail</button>
                                                                            </NavLink>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                            :
                                                            <tr>
                                                                <td colSpan='5px' className='text-center'>Aucune donnée enregistrée.</td>
                                                            </tr>
                                                        :
                                                        <tr>
                                                            <td colSpan='5px' className='text-center'><i className='fa fa-spinner fa-spin fa-2x'></i></td>
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
        </div>
    )
}

export default Recours