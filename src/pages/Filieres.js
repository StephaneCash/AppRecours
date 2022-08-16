import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
//import addFiliere from '../forms/addFiliere';
import axios from "axios";

function Filieres() {

    const [nomFiliere, setNomFiliere] = useState("");
    const [showF, setShowF] = useState(false);
    const [clicAdd, setClickAdd] = useState(false);
    const [dataFilieres, setDataFilieres] = useState([]);

    const showFormAddFiliere = () => {
        setShowF(true);
    };

    const closeFormAdd = () => {
        setShowF(false);
    };

    const submitData = () => {
        setClickAdd(true);
        if (nomFiliere === "") {
            alert("Veuillez entrer le nom d'une filière svp !");
        }
        axios.post(`http://localhost:5000/api/filieres`, { nom: nomFiliere })
            .then(resp => {
                console.log(resp);
                const filiereInput = document.getElementById('text');
                filiereInput.value = '';
                setClickAdd(false);
                getAllFilieres();
            })
            .catch(err => {
                console.log(err);
                setClickAdd(false);
            })
    }

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
                                {
                                    showF &&
                                    <div className="col-sm-12">

                                        <label>Ajouter une filière</label> <br />
                                        <div className='row'>
                                            <div className="col-sm-6">
                                                <input id="text" type="text" className='form-control' onChange={(e) => setNomFiliere(e.target.value)}
                                                    placeholder="Entrer le nom de la filière" /> <br /><br />
                                            </div>
                                            <div className="col-sm-4">
                                        
                                                <button type='button' style={{ marginLeft:'65px',
                                                    float: 'right', padding: '4px', borderRadius: '5px', color: 'white', backgroundColor: '#14234a'
                                                }} onClick={closeFormAdd}>
                                                    Fermer le formulaire d'ajout
                                                </button>

                                                <button type='button' style={{ 
                                                    float: 'right', padding: '4px', borderRadius: '5px', color: 'white', backgroundColor: '#14234a'
                                                }} onClick={submitData}>
                                                    {clicAdd ? "Ajout en cours..." : "Ajouter"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className='d-flex'>
                                    <div className="col-2">Filière</div>

                                    <div className='col-10'>
                                        <div style={{ textAlign: 'right' }}>
                                            <button style={{
                                                flex: '1', float: 'right', textAlign: 'right',
                                                padding: '4px', borderRadius: '5px', color: 'white', backgroundColor: '#14234a'
                                            }} onClick={showFormAddFiliere}>Ajouter une filière</button>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm-12'>
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th>N°</th>
                                                <th>Nom</th>
                                                <th>Options</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataFilieres.data ? dataFilieres.data.map((val, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{val.nom}</td>
                                                        <td>Supprimer</td>
                                                    </tr>
                                                )
                                            }) : "Pas de data."}
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

export default Filieres