import {toJS} from 'mobx'
export const logJs =(description,proxyValue)=>{
    if(Array.isArray(proxyValue)){
        const jsArr = proxyValue.map(item=>toJS(item))
        console.log(description, jsArr);
    }else {
        console.log(description, toJS(proxyValue));
    }
}
