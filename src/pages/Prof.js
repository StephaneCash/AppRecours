import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import SideBar from '../components/SideBar';
import axios from "axios";
import swal from "sweetalert";
import { valueAbsolute } from 'fontawesome';

function Prof() {

    const [profs, setProfs] = useState([]);

    const getAllProfs = () => {
        axios.get(`http://localhost:5000/api/profs`)
            .then(resp => {
                setProfs(resp.data);
            })
            .catch(err => {
                console.log(err)
            })
    };

    useEffect(() => {
        getAllProfs();
    }, []);

    const deleteProf = (id) => {
        swal({
            title: "Avertissement.",
            text: "Etes-vous sûr de vouloir supprimer ce prof ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:5000/api/profs/${id}`)
                    .then(resp => {
                        getAllProfs();
                        swal('Prof supprimé avec succès', {
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

    const tdStyle = { border: "1px solid silver", padding: '3px' }

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
                                <h4>Liste de professeurs</h4>
                                <div className='d-flex'>
                                    <div className="col-2">{profs.taille > 1 ? profs.taille + " Professeurs" : profs.taille + ' Professeur'}</div>

                                    <div className='col-10'>
                                        <NavLink to='add-prof' style={{ textAlign: 'right' }}>
                                            <button style={{
                                                flex: '1', float: 'right', textAlign: 'right', marginBottom: '10px',
                                                padding: '4px', borderRadius: '5px', color: 'white', backgroundColor: '#14234a'
                                            }} >Ajouter un prof</button>
                                        </NavLink>
                                    </div>
                                </div>
                                <div className='col-sm-12'>
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th>N°</th>
                                                <th>Nom</th>
                                                <th>Postnom</th>
                                                <th>Cours</th>
                                                <th style={{ width: '230px' }}>Date de création</th>
                                                <th style={{ width: '230px' }}>Date de modification</th>
                                                <th style={{ width: "320px" }}>Options</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {profs.data ?
                                                profs.taille >= 1 ?
                                                    profs.data.map((val, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{val.nom}</td>
                                                                <td>{val.postnom}</td>
                                                                <td>
                                                                    {
                                                                        val.cours ?
                                                                            val.cours.length ? val.cours.map((cours, i) => {
                                                                                return (
                                                                                    <tr index={i}>
                                                                                        <td style={tdStyle}>{cours.nom}</td>
                                                                                    </tr>
                                                                                )

                                                                            }) : "Aucun cours attribué."
                                                                            : "Il existe aucun cours."
                                                                    }
                                                                </td>
                                                                <td>Le {val.createdAt.substring(0, 10)}, à {val.createdAt.substring(11, 20)}</td>
                                                                <td>Le {val.updatedAt.substring(0, 10)}, à {val.updatedAt.substring(11, 20)}</td>

                                                                <td>
                                                                    <NavLink to={{ pathname: "attribution-cours" }} state={{ val: val }}>
                                                                        <button style={{
                                                                            flex: '1', float: 'right', textAlign: 'right', marginLeft: '5px',
                                                                            padding: '4px', borderRadius: '5px', color: 'white', backgroundColor: '#14234a'
                                                                        }} onClick={() => (val)}>Attribuer de cours</button>
                                                                    </NavLink>

                                                                    <button style={{
                                                                        flex: '1', float: 'right', textAlign: 'right', marginLeft: '5px',
                                                                        padding: '4px', borderRadius: '5px', color: 'white', backgroundColor: '#14234a'
                                                                    }} onClick={() => deleteProf(val.id)}>Supprimer</button>

                                                                    <NavLink to={{ pathname: "add-prof" }} state={{ val: val }}>
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
                                                        <td colSpan='7px' className='text-center'>Aucune donnée enregistrée.</td>
                                                    </tr> :
                                                <tr>
                                                    <td colSpan='7px' className='text-center'><i className='fa fa-spinner fa-spin fa-2x'></i></td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </main>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Prof