import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import { NavLink } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function Filieres() {

    const [dataFilieres, setDataFilieres] = useState([]);

    const getAllFilieres = () => {
        axios.get('http://localhost:5000/api/filieres').then(resp => {
            setDataFilieres(resp.data);
        }).catch(err => {
            console.log(err);
        })
    };

    useEffect(() => {
        getAllFilieres();
    }, []);

    const deleteFiliere = (id) => {
        swal({
            title: "Avertissement.",
            text: "Etes-vous sûr de vouloir supprimer cette filière ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:5000/api/filieres/${id}`)
                    .then(resp => {
                        getAllFilieres();
                        console.log(resp.data);
                        swal('Filière supprimée avec succès', {
                            icon: "success",
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    })

            }
        }).catch((error) => {
            console.log(error);
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
                                <h4>Liste de filières</h4>
                                <div className='card'>
                                    <div className='d-flex card-header'>
                                        <div className="col-2">{dataFilieres.taille && dataFilieres.taille} {dataFilieres.taille <= 1 ? 'Filière' : "Filières"}</div>

                                        <div className='col-10'>
                                            <NavLink to='add-filiere' style={{ textAlign: 'right' }}>
                                                <button style={{
                                                    border: "1px solid #fff",
                                                    flex: '1', float: 'right', textAlign: 'right', marginBottom: '10px',
                                                    padding: '4px', borderRadius: '5px', color: 'white', backgroundColor: '#14234a'
                                                }} >Ajouter une filière</button>
                                            </NavLink>
                                        </div>
                                    </div>
                                    <div className='col-sm-12 card-body'>
                                        <table className="table table-striped table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>N°</th>
                                                    <th>Nom</th>
                                                    <th>Niveau</th>
                                                    <th style={{ width: '230px' }}>Date de création</th>
                                                    <th style={{ width: '230px' }}>Date de modification</th>
                                                    <th style={{ width: "200px" }}>Options</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataFilieres.data ?
                                                    dataFilieres.taille >= 1 ?
                                                        dataFilieres.data.map((val, index) => {
                                                            return (
                                                                <tr>
                                                                    <td>{index + 1}</td>
                                                                    <td>{val.nom}</td>
                                                                    <td>{val.niveau}</td>
                                                                    <td>Le {val.createdAt.substring(0, 10)}, à {val.createdAt.substring(11, 20)}</td>
                                                                    <td>Le {val.updatedAt.substring(0, 10)}, à {val.updatedAt.substring(11, 20)}</td>
                                                                    <td>

                                                                        <button style={{
                                                                            flex: '1', float: 'right', textAlign: 'right', marginLeft: '5px',
                                                                            padding: '4px', borderRadius: '5px', color: 'white', backgroundColor: '#14234a'
                                                                        }} onClick={() => deleteFiliere(val.id)}>Supprimer</button>

                                                                        <NavLink to={{ pathname: "add-filiere" }} state={{ val: val }}>
                                                                            <button style={{
                                                                                flex: '1', float: 'right', textAlign: 'right',
                                                                                padding: '4px', borderRadius: '5px', color: 'white', backgroundColor: '#14234a'
                                                                            }}>Modifier</button>
                                                                        </NavLink>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                        :
                                                        <tr>
                                                            <td colSpan='6px' className='text-center'>Aucune donnée enregistrée.</td>
                                                        </tr>
                                                    :
                                                    <tr>
                                                        <td colSpan='6px' className='text-center'><i className='fa fa-spinner fa-spin fa-2x'></i></td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </section>
                        </main>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Filieres