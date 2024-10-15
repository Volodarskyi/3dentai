import {React} from 'react';
import { observer } from 'mobx-react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import {useRootStore} from "../../../stores";

const ResultErrorComponent = ({message, details=''}) => {
    const{dialogStore} = useRootStore();

    return (
        <Alert show={true} variant="danger">
            <Alert.Heading>Error</Alert.Heading>
            <div className="font-main-white">
                {message}
            </div>
            <div className="font-main-white">{details}</div>
            <hr />
            <div className="d-flex justify-content-end">
                <Button onClick={dialogStore.closeResult} variant="outline-danger">
                    Close
                </Button>
            </div>
        </Alert>
    );
};

export const ResultError = observer(ResultErrorComponent)
