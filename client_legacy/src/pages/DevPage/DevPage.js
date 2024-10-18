import {React, useEffect} from 'react';
import {observer} from 'mobx-react';
import {useRootStore} from "../../stores";


const DevPageComponent = () => {
    const { uiStore} = useRootStore();

    useEffect(() => {
        console.log('some download data function')
    }, [])


    return (
        <>
            <div className="main work-area">
               dev page
            </div>
        </>
    );
};

export const DevPage = observer(DevPageComponent)
