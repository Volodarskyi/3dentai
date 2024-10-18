import {React} from 'react';
import {observer} from 'mobx-react';
import {Spinner} from 'react-bootstrap';
import {useRootStore} from "../../stores";
import {ResultShower} from "./ResultShower/ResultShower";

import './Dialog.Styles.scss';


const DialogComponent = () => {

    const {dialogStore} = useRootStore()

    return (
        <div className={dialogStore.isShow ? "dialog" : "dialog-hide"}>
            {dialogStore.isLoading && <Spinner animation="border" variant="primary"/>}
            {dialogStore.methodResult && <ResultShower methodResult={dialogStore.methodResult}/>}
        </div>
    );
};

export const Dialog = observer(DialogComponent)
