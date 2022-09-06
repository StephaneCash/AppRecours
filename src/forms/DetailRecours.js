import { Modal } from "react-bootstrap";
import "../css/DetailRecoursModal.css"
import ReactToPrint from 'react-to-print';
import React, { useRef } from 'react'


const DetailRecours = (props) => {

    const componentRef = useRef();
    const closeModal = props.closeModal;
    const data = props.data;

    const dataPropsRecours = data.nomCompletProf;
    const tab = [];
    tab.push(data.nomCompletProf);
    //console.log('ARRAY :: ', tab)
    const postnomProf = dataPropsRecours;
    const styleBtn = { border: "1px solid silver" }

    return (
        <Modal show={props.show} style={{ marginTop: "50px" }} id='modal'>
            <Modal.Header style={{ backgroundColor: '#162349', color: '#fff' }}>
                Detail Recours
            </Modal.Header>
            <Modal.Body>
                <div ref={componentRef}>
                    <div className="d-flex">
                        <div className="col-sm-6">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td className='text-center' colSpan='2px'>CASE RESERVEE A L'ETUDIANT</td>
                                    </tr>
                                    <tr>
                                        <td>Nom : </td> <td>{data ? data.nomEtudiant : ""}</td>
                                    </tr>
                                    <tr>
                                        <td>Postnom : </td> <td>{data ? data.postnomEtudiant : ""}</td>
                                    </tr>
                                    <tr>
                                        <td>Promotion : </td> <td>{data ? data.promotion : ""}</td>
                                    </tr>
                                </tbody>

                            </table>
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td className='text-center' colSpan="2px">OBJET DU RECOURS</td>
                                    </tr>
                                    <tr>
                                        <td>Object : </td> <td>{data ? data.objetRecours : ""}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>Cote marquée sur le bulletin</td>

                                        <td>
                                            Année: <hr />
                                            {data ? data.coteAnnee : ""}
                                        </td>
                                        <td>
                                            Examen <hr />
                                            {data ? data.coteExamen : ""}
                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-sm-6">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td className='text-center' colSpan="2px">IDENTITE DE L'ENSEIGNANT CONCERNE</td>
                                    </tr>
                                    <tr>
                                        <td>Nom</td> <td>{data ? postnomProf : ""}</td>
                                    </tr>
                                    <tr>
                                        <td>Postnom : </td> <td>{ data ? postnomProf : ""}</td>
                                    </tr>
                                    <tr>
                                        <td>Cours : </td> <td>{data ? data.cours : ""}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td className="text-center" colSpan="4px">AVIS DE L'ENSEIGNANT</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3px">Statut Recours </td> 
                                        <td>{ data  ? data.statut === 0 ? <>En cours... <i className="fa fa-spinner fa-spin"></i></> : "" : ""}</td>
                                    </tr>
                                    <tr>
                                        <th colSpan="4px" className="text-center">Cotes réelles</th>
                                    </tr>
                                    <tr>
                                        <td colSpan='2px'>
                                            Année: <hr />

                                        </td>
                                        <td colSpan='2px'>
                                            Examen <hr />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer style={{ paddingRight: "30px" }}>
                <ReactToPrint
                    trigger={() => <button className='btn' style={styleBtn}>Imprimer <i className="fa fa-print"></i></button>
                    }
                    content={() => componentRef.current}
                />
                <button className='btn' style={styleBtn} onClick={closeModal}>Fermer <i className="fa fa-close"></i></button>
            </Modal.Footer>
        </Modal>
    )
}
export default DetailRecours;