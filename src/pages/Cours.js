import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import SideBar from '../components/SideBar';
import axios from "axios";
import swal from "sweetalert";

function Cours() {

    const [dataCours, setDataCours] = useState([]);

    const deleteCours = (id) => {
        swal({
            title: "Avertissement.",
            text: "Etes-vous sûr de vouloir supprimer ce cours ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:5000/api/cours/${id}`)
                    .then(resp => {
                        getAllCours();
                        swal(resp.data.message, {
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
    };

    const getAllCours = () => {
        axios.get(`http://localhost:5000/api/cours`)
            .then(resp => {
                setDataCours(resp.data)
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        getAllCours();
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
                                <h4>Liste de cours</h4>
                                <div className='card'>
                                    <div className='d-flex card-header'>
                                        <div className="col-2">{dataCours.taille && dataCours.taille} Cours</div>

                                        <div className='col-10'>
                                            <NavLink to='add-cours' style={{ textAlign: 'right' }}>
                                                <button style={{
                                                    border: "1px solid #fff",
                                                    flex: '1', float: 'right', textAlign: 'right', marginBottom: '10px',
                                                    padding: '4px', borderRadius: '5px', color: 'white', backgroundColor: '#14234a'
                                                }} >Ajouter un cours</button>
                                            </NavLink>
                                        </div>
                                    </div>
                                    <div className='col-sm-12 card-body'>
                                        <table className="table table-striped table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>N°</th>
                                                    <th>Nom</th>
                                                    <th>Pondération</th>
                                                    <th style={{ width: '230px' }}>Date de création</th>
                                                    <th style={{ width: '230px' }}>Date de modification</th>
                                                    <th style={{ width: "200px" }}>Options</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataCours.data ?
                                                    dataCours.taille >= 1 ?
                                                        dataCours.data.map((val, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{val.nom}</td>
                                                                    <td>{val.ponderation}</td>
                                                                    <td>Le {val.createdAt.substring(0, 10)}, à {val.createdAt.substring(11, 20)}</td>
                                                                    <td>Le {val.updatedAt.substring(0, 10)}, à {val.updatedAt.substring(11, 20)}</td>
                                                                    <td>

                                                                        <button style={{
                                                                            flex: '1', float: 'right', textAlign: 'right', marginLeft: '5px',
                                                                            padding: '4px', borderRadius: '5px', color: 'white', backgroundColor: '#14234a'
                                                                        }} onClick={() => deleteCours(val.id)}>Supprimer</button>

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

export default Cours