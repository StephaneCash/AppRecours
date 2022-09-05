import { Modal } from "react-bootstrap";
import "../css/DetailRecoursModal.css"
import ReactToPrint from 'react-to-print';
import React, { useEffect, useState, useRef } from 'react'


const DetailRecours = (props) => {

    const componentRef = useRef();
    const closeModal = props.closeModal;

    const styleBtn = { border: "1px solid silver" }

    return (
        <Modal show={props.show} style={{ marginTop: "50px" }}>
            <Modal.Header style={{ backgroundColor: '#162349', color: '#fff' }}>
                Detail Recours
            </Modal.Header>
            <Modal.Body>
                <div ref={componentRef}>
                    Body
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