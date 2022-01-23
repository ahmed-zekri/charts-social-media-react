import {Modal, Button} from "react-bootstrap";


const ErrorDataAlert = ({ show, hideAlert}) => {


    return (
        <>


            <Modal show={show}>
                <Modal.Header closeButton onClick={hideAlert}>
                    <Modal.Title>Error path</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    This path does not exist.
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={hideAlert} variant="secondary">
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ErrorDataAlert;