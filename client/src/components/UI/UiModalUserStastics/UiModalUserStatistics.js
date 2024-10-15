import {React, useEffect} from 'react';
import {observer} from 'mobx-react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useRootStore} from "../../../stores";
import {UiProgressBar} from "../UiProgressBar/UiProgressBar";

const UiModalUserStatisticsComponent = () => {
    const {userStore} = useRootStore();

    useEffect(() => {
        if (userStore.isShow) {
            userStore.displayGroupResults()
        }
    }, [userStore.isShow])

    return (
        <>
            <Modal
                show={userStore.isShow}
                onHide={userStore.closeStatisticsDetail}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Statistic for {userStore.processTitle}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {userStore.preparedGroups.map(item =>
                        <div key={item.groupName} className="mg-top-15 mg-bottom-1">
                            {item.groupName}<UiProgressBar total={item.total} know={item.know} repeat={item.repeat}/>
                        </div>)}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={userStore.closeStatisticsDetail}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export const UiModalUserStatistics = observer(UiModalUserStatisticsComponent)
