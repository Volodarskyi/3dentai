import {React, useState} from 'react';
import {Form} from 'react-bootstrap'
import {observer} from 'mobx-react';

import './UiLabelSelector.Styles.scss'

const UiLabelSelectorComponent = ({label,value,setValue,options=[]}) => {
    const handler = (event)=>{
        console.log(event.target.value)
        setValue(event.target.value)
    }

    return (
        <div className='ui-label-selector'>
            <div className='ui-label-selector__label space-r-04'>{label.toLowerCase()}</div>

            <select className='ui-label-selector__selector' value={value} onChange={handler}>
                {options.map(item=><option key={item} className='ui-label-selector__option' value={item}>{item.toUpperCase()}</option>)}
            </select>
        </div>
    );
};

export const UiLabelSelector = observer(UiLabelSelectorComponent)
