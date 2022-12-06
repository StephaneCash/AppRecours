import React, { useEffect, useState } from 'react'
import { Modal } from "react-bootstrap";

const ShowImageRecours = (props) => {
    const show = props.show;
    const close = props.close;
    return (
        <Modal show={show} >
            <Modal.Header style={{ backgroundColor: '#162349', color: '#fff' }}>
                Image uploadéé
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer style={{ paddingRight: "30px" }}>
                <button onClick={close} className='btn' >Fermer <i className="fa fa-close"></i></button>
            </Modal.Footer>
        </Modal>
    )
}

export default ShowImageRecours