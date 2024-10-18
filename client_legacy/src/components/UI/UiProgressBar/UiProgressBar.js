import {React} from 'react';
import {observer} from 'mobx-react';
import {MarkerPoint} from "./MarkerPoint";

import './UiProgressBar.Styles.scss';
const UiProgressBarComponent = ({total,know,repeat}) => {
    const calculatePercentage = (x, y)=>{
        const percentage = Math.round((x/y)*100);
        return `${percentage}%`
    }

    const knowPr = calculatePercentage(know,total);
    const repeatPr = calculatePercentage(repeat,total);

    return (
        <div className="ui-progress-bar">
            <div className="ui-progress-bar__know" style={{minWidth:knowPr}}></div>
            <MarkerPoint count={know} color={'#7CFF71'}/>
            {repeat > 0 && <div className="ui-progress-bar__repeat" style={{minWidth:repeatPr}}></div>}
            {repeat > 0 && <MarkerPoint count={repeat} color={'#F3FF68'}/>}
            {total !== know+repeat && <div className="ui-progress-bar__label-total">{total}</div>}
        </div>
    );
};

export const UiProgressBar = observer(UiProgressBarComponent)
