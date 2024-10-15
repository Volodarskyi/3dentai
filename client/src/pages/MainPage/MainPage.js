import {React, useEffect} from 'react';
import {observer} from 'mobx-react';
import {Tab} from 'react-bootstrap';
import {Tabs} from 'react-bootstrap';
import {useRootStore} from "../../stores";

import './Main.Styles.scss';

const MainPageComponent = () => {
    const { uiStore} = useRootStore();

    useEffect(() => {
        console.log('some download data function')
    }, [])


    return (
        <>
            <div className="main work-area">
            <Tabs
                id="controlled-tab-example"
                activeKey={uiStore.mainPageTab}
                onSelect={(k) => uiStore.setMainPageTab(k)}
                className="mb-3"
            >
                <Tab eventKey="step1" title="Step 1" className='pd-8'>
                    step 1 upload video (photo)
                </Tab>
                <Tab eventKey="step2" title="Step 2" className='pd-8'>
                    step 2 parse to data (video to photo,photo to data)
                </Tab>
                <Tab eventKey="step3" title="Step 3" className='pd-8'>
                    step 3 send to chat GPT API and response
                </Tab>
                <Tab eventKey="step4" title="Step 4" className='pd-8'>
                    step 4 photo to 3D
                </Tab>
                <Tab eventKey="step5" title="Step 5" className='pd-8'>
                    step 5 analise
                </Tab>
            </Tabs>
        </div>
        </>
    );
};

export const MainPage = observer(MainPageComponent)
