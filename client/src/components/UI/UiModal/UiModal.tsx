import React from 'react';
import {Modal} from 'antd';
import {observer} from "mobx-react-lite";
import {useStores} from "@/hooks/useStores";

import './UiModal.Styles.scss';

const UiModalComponent: React.FC = () => {
    const {modalStore} = useStores()

    const modalStyles = {
        header: {
            backgroundColor: 'rgba(88,211,255,0.0)',
        },
        content: {
            backdropFilter: 'blur(1px)',
            border:'2px solid #43D3FFFF',
            backgroundColor: 'rgba(125,226,255,0.2)',
        },
        mask: {
            backdropFilter: 'blur(3px)',
            backgroundColor: 'rgba(0,7,28,0.85)'
        },
    };

    return (

        <Modal
            className="ui-modal"
            title={<div className="ui-modal__title">{modalStore.titleModal}</div>}
            open={modalStore.isShowUiModal}
            onOk={modalStore.closeUiModal}
            onCancel={modalStore.closeUiModal}
            footer={null}
            styles={modalStyles}>
            {modalStore.windowModal}
        </Modal>
    );
};

export const UiModal = observer(UiModalComponent);
