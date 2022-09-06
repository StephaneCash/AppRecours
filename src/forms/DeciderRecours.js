import React, { useState } from 'react'
import { Modal } from "react-bootstrap";
import axios from "axios";

function DeciderRecours(props) {
    const data = props.data;
    const close = props.close;
    const [etatForm, setEtatForm] = useState(false);
   // console.log(data)

    const styleBtn = { border: "1px solid silver" };

    const showForm = () => {
        setEtatForm(!etatForm);
    };

    const saveData = () =>{

    };

    const rejectRecours = () =>{
        axios.put(`http://localhost:5000/api/recours/${data.id}`, {statut: 1})
        .then(resp=>{
            console.log(resp.data)
        })
        .catch(err=>{
            console.log(err.response)
        })
    };
    return (

        <Modal show={props.show} style={{ marginTop: "20px" }} >
            <Modal.Header style={{ backgroundColor: '#162349', color: '#fff' }}>
                Répondre au recours
            </Modal.Header>
            <Modal.Body>
                <div className="alert alert-success">
                    <h5>Idéntité de l'étudian</h5>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Postnom</th>
                                <th>Promotion</th>
                                <th>Cours</th>
                                <th>Cote Année</th>
                                <th>Cote Examen</th>
                                <th>Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data ? data.nomEtudiant : ""}</td>
                                <td>{data ? data.postnomEtudiant : ""}</td>
                                <td>{data ? data.promotion : ""}</td>
                                <td>{data ? data.cours : ""}</td>
                                <td>{data ? data.coteAnnee : ""}</td>
                                <td>{data ? data.coteExamen : ""}</td>
                                <td>{data ? data.statut === 0 ? <>En cours... <i className="fa fa-spinner fa-spin"></i></> : "" : ""}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    Professeur : {data ? data.nomCompletProf : ""}
                </div>
                {etatForm ?
                    <div className="row">
                        <div className="col-sm-6">
                            <form>
                                <label>Entrer la cote de l'année</label>
                                <input type="text" className="form-control" placeholder='Cote année' />
                                <label>Entrer la cote de l'examen</label>
                                <input type="text" className="form-control" placeholder='Cote examen' /> <br />
                            </form>
                            <button type="button" onClick={saveData} style={styleBtn} className='btn'>Valider <i className="fa fa-save"></i></button>
                        </div>
                    </div>
                    :
                    ""}

            </Modal.Body>
            <Modal.Footer style={{ paddingRight: "30px" }}>
                <button style={styleBtn} className='btn' onClick={showForm}>
                    {etatForm ? "Cacher le formulaire" : "Répondre"}
                    <i className="fa fa-graduat"></i></button>
                <button style={styleBtn} className='btn' onClick={rejectRecours}>Rejeter <i className="fa fa-close"></i></button>
                <button style={styleBtn} className='btn' onClick={close}>Fermer <i className="fa fa-close"></i></button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeciderRecours