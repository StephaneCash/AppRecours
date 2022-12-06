import { Modal } from "react-bootstrap";
import "../css/DetailRecoursModal.css"
import React from 'react'
import { dateParserFunction } from "../utils/Util";


const DetailRecours = (props) => {
    const closeModal = props.closeModal;
    const data = props.data;

    const dataPropsRecours = data.nomCompletProf;
    const tab = [];
    tab.push(data.nomCompletProf);
    //console.log('ARRAY :: ', tab)
    const postnomProf = dataPropsRecours;
    const styleBtn = { border: "1px solid silver" }

    return (
        <Modal show={props.show} id='modal'>
            <Modal.Header style={{ backgroundColor: '#162349', color: '#fff' }}>
                Detail Recours
            </Modal.Header>
            <Modal.Body>
                <div className="col-sm-12">
                    <h6 className="">Créé depuis {dateParserFunction(data && data.createdAt)}
                        <br /> Répondu depuis {dateParserFunction(data && data.updatedAt)}
                    </h6>
                    <hr />
                    <div className="alert alert-success">
                        <table className="table table-bordeless">
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Postnom</th>
                                    <th>Promotion</th>
                                    <th>Objet recours</th>
                                    <th>Cotes marquées sur le bulletin</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{data ? data.nomEtudiant : ""}</td>
                                    <td>{data ? data.postnomEtudiant : ""}</td>
                                    <td>{data ? data.promotion : ""}</td>
                                    <td>{data ? data.objetRecours : ""}</td>
                                    <td>
                                        Année : {data ? data.coteAnnee : ""}<br />
                                        Examen : {data ? data.coteExamen : ""}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-sm-12 alert alert-success">
                        <h6 className="">Décision du professeur</h6>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nom complet</th>
                                    <th>Cours</th>
                                    <th>Status</th>
                                    <th>Cotes réelles</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{data ? postnomProf : ""}</td>

                                    <td className="p-2">
                                        Pondération : {data ? data.ponderationCours : ""} <br />
                                        Cours : {data ? data.cours : ""}</td>

                                    <td>
                                        {data.statut === 0 ? <><i className='fa fa-spinner fa-spin'></i> En attente...</> :
                                            data.statut === 1 ? <span className="text-danger">Rejeté <i className='fa fa-close'></i></span> :
                                                data.statut === 2 ? <span className="text-success">Répondu <i className='fa fa-check'></i></span> : ""
                                        }
                                    </td>
                                    <td>
                                        Année : {data ? data.coteAnneeRepondu : ""}<br />
                                        Examen : {data ? data.coteExamRepondu : ""}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer style={{ paddingRight: "30px" }}>
                <button className='btn' style={styleBtn} onClick={closeModal}>Fermer <i className="fa fa-close"></i></button>
            </Modal.Footer>
        </Modal>
    )
}
export default DetailRecours;