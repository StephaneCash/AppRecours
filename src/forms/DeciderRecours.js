import React, { useEffect, useState } from 'react'
import { Modal } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

function DeciderRecours(props) {
    const data = props.data;
    const close = props.close;
    const [etatForm, setEtatForm] = useState(false);
    const [etat, setEtat] = useState();

    const [cAnnee, setCAnnee] = useState("");
    const [cExamen, setCExamen] = useState("");

    useEffect(() => {
        setEtat(data.statut)
    }, [data]);

    const styleBtn = { border: "1px solid silver" };

    const showForm = () => {
        setEtatForm(!etatForm);
    };

    const saveData = () => {
        if (data.ponderationCours < parseFloat(cAnnee) || data.ponderationCours < parseFloat(cExamen)) {
            swal({
                title: "Avertissement",
                icon: "error",
                text: `Vos cotes doivent être inférieures ou égales à la pondération qui est de ${data.ponderationCours}`
            })
        } else {
            axios.put(`http://localhost:5000/api/recours/${data.id}`, { statut: 2, coteAnneeRepondu: cAnnee, coteExamRepondu: cExamen })
                .then(resp => {
                    setEtat(2);
                    setCAnnee("")
                    setCExamen("");
                    swal({
                        title: "Succès",
                        icon: "success",
                        text: "Vous venez de répondre au recours."
                    });
                    setEtatForm(false);
                })
                .catch(err => {
                    console.log(err.response)
                })
        }
    };

    const rejectRecours = () => {
        axios.put(`http://localhost:5000/api/recours/${data.id}`, { statut: 1 })
            .then(resp => {
                swal({
                    title: "Rejet",
                    icon: "success",
                    text: "Vous venez de rejeter ce recours"
                });
                setEtat(1);
            })
            .catch(err => {
                console.log(err.response)
            })
    };
    return (

        <Modal show={props.show} >
            <Modal.Header style={{ backgroundColor: '#162349', color: '#fff' }}>
                Répondre au recours
            </Modal.Header>
            <Modal.Body>
                <div className="alert alert-success">
                    <h5>Idéntité de l'étudian</h5>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Noms</th>
                                <th>Promotion</th>
                                <th>Cours</th>
                                <th>Cotes</th>
                                <th>Objet recours</th>
                                <th>Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data ? data.nomEtudiant + ' ' + data.postnomEtudiant : ""}</td>
                                <td>{data ? data.promotion : ""}</td>
                                <td>{data ? data.cours : ""}</td>
                                <td>
                                    <tr>
                                        <td style={{ border: "1px solid silver", padding: '5px' }}>Année : {data ? data.coteAnnee : ""}</td>
                                        <td style={{ border: "1px solid silver", padding: '5px' }}>Examen : {data ? data.coteExamen : ""}</td>
                                    </tr>
                                </td>
                                <td>{data ? data.objetRecours : ""}</td>
                                <td>
                                    {
                                        etat === 0 ? <><i className='fa fa-spinner fa-spin'></i> En attente...</> :
                                            etat === 1 ? <span className="text-danger">Rejeté <i className='fa fa-close'></i></span> :
                                                etat === 2 ? "Répondu" : ""
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    Pondération Cours : {data ? data.ponderationCours : ""}<br />
                    Professeur : {data ? data.nomCompletProf : ""}
                </div>
                {etatForm ?
                    <div className="row">
                        <div className="col-sm-6">
                            <form>
                                <label>Entrer la cote de l'année</label>
                                <input type="number" className="form-control" placeholder='Cote année' onChange={(e) => setCAnnee(e.target.value)} />
                                <label>Entrer la cote de l'examen</label>
                                <input type="number" className="form-control" placeholder='Cote examen' onChange={(e) => setCExamen(e.target.value)} /> <br />
                            </form>
                            {
                                cAnnee !== "" && cExamen !== "" ?
                                    <button type="button" onClick={saveData} style={styleBtn} className='btn'>Valider</button>
                                    :
                                    <button type="button" disabled style={styleBtn} className='btn'>Valider</button>
                            }
                        </div>
                    </div>
                    :
                    ""}

            </Modal.Body>
            <Modal.Footer style={{ paddingRight: "30px" }}>
                <button style={styleBtn} className='btn' onClick={showForm}>
                    {etatForm ? "Cacher le formulaire" : "Répondre"}
                    <i className="fa fa-graduat"></i></button>
                {data ? etat === 1 ? "" :
                    <button style={styleBtn} className='btn' onClick={rejectRecours}>Rejeter <i className="fa fa-close"></i></button>
                    : ""
                }
                <button style={styleBtn} className='btn' onClick={close}>Fermer <i className="fa fa-close"></i></button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeciderRecours