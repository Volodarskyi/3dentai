import {React} from 'react';
import {observer} from 'mobx-react';

import './UiProgressBar.Styles.scss'
const MarkerPointComponent = ({count,color}) => {
    return (
        <div className="ui-progress-bar__marker-point">
            <div className="ui-progress-bar__marker-point-label" style={{color:color}}>{count}</div>
            <div className="ui-progress-bar__marker-point-point" style={{background:color}}></div>
        </div>
    );
};
export const MarkerPoint = observer(MarkerPointComponent)
