import {React} from 'react';
import {observer} from 'mobx-react';
import {Form, Button, InputGroup} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import {useRootStore} from "../../../stores";

const UiModalConfirmComponent = () => {
    const {modalStore} = useRootStore();

    return (
        <>
            <Modal
                className="qcards-modal"
                show={modalStore.isShow}
                onHide={modalStore.closeModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {modalStore.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{modalStore.head}</h4>
                    <p>
                        {modalStore.body}
                    </p>
                    {modalStore.withPass &&
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm">PASSWORD</InputGroup.Text>
                            <Form.Control
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                                placeholder={'access pass'}
                                value={modalStore.password}
                                onChange={(event) => modalStore.setPassword(event.target.value)}
                            />
                        </InputGroup>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={modalStore.closeModal}>Cancel</Button>
                    <Button variant="outline-primary"  onClick={modalStore.confirmModalAction}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export const UiModalConfirm = observer(UiModalConfirmComponent)
