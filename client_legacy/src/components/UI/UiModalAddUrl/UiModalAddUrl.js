import {React} from 'react';
import {observer} from 'mobx-react';
import {Form, Button, InputGroup} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import {useRootStore} from "../../../stores";

const UiModalAddUrlComponent = () => {
    const {urlStore} = useRootStore();

    return (
        <>
            <Modal
                className="qcards-modal"
                show={urlStore.isShow}
                onHide={urlStore.closeAddUrl}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Images
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm">Link To Images</InputGroup.Text>
                            <Form.Control
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                                value={urlStore.url}
                                onChange={(event) => urlStore.setUrl(event.target.value)}
                            />
                        </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={urlStore.closeAddUrl}>Cancel</Button>
                    <Button variant="outline-primary"  onClick={urlStore.confirmUrlAction}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export const UiModalAddUrl = observer(UiModalAddUrlComponent)
