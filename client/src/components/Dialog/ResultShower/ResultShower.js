import {React} from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import {ResultSuccess} from "../ResultSuccess/ResultSuccess";
import {ResultError} from "../ResultError/ResultError";

import '../Dialog.Styles.scss';

const ResultShowerComponent = ({methodResult}) => {
    const res = toJS(methodResult)

    return (
        <div style={{width:"70%"}}>
            {res.result === "SUCCESS"  ?
                <ResultSuccess message={res.message} details={res.details} />
                : <ResultError message={res.message} details={res.details}/>}
        </div>
    );
};

export const ResultShower = observer(ResultShowerComponent)
