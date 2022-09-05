import { Modal } from "react-bootstrap";
import "../css/DetailRecoursModal.css"
const DetailRecours = (props) => {

    const closeModal = props.closeModal;

    console.log('CLOSED : ', closeModal)

    const styleBtn = { border: "1px solid silver" }

    return (
        <Modal show={props.show} style={{ marginTop: "50px" }}>
            <Modal.Header style={{ backgroundColor: '#162349', color: '#fff' }}>
                Detail Recours
            </Modal.Header>
            <Modal.Body>
                Body
            </Modal.Body>
            <Modal.Footer style={{ paddingRight: "30px" }}>
                <button className='btn' style={styleBtn} onClick={closeModal}>Fermer <i className="fa fa-close"></i></button>
                <button className='btn' style={styleBtn}>Imprimer <i className="fa fa-print"></i></button>
            </Modal.Footer>
        </Modal>
    )
}
export default DetailRecours;