"use client";
import { observer } from "mobx-react-lite";
import {useEffect, useState} from "react";

import Steps from "@/app/scan/components/Steps";
import {useStores} from "@/hooks/useStores";
import {ISteps} from "@/types/steps";

import Navigation from "./components/Navigation";
import Processor from "./components/Progress";

const steps: ISteps[] = [
    {name: "Step 1", description: "Upload video (photo)."},
    {name: "Step 2", description: "Send to Chat GPT API and receive response."},
    {name: "Step 3", description: "Convert photo to 3D."},
];

const ScanComponent = () => {
    const {scanStore, uploadImgStore} = useStores();
    const {setSteps} = scanStore;

    useEffect(() => {
        setSteps(steps);
    }, [setSteps]);

    return (
        <div className="bg-white min-h-svh flex items-center flex-col">
            <Processor/>
            <Steps/>
            <Navigation/>

            <div>
                <input type="file" onChange={uploadImgStore.setImgFile} />
                <button onClick={uploadImgStore.handleUpload}>Upload Photo</button>
            </div>

            {uploadImgStore.imgUrl && (
                <div>
                    <h2>Uploaded Image:</h2>
                    <img src={uploadImgStore.imgUrl} alt="Uploaded file" style={{width: '300px'}}/>
                    <p>Public URL: <a href={uploadImgStore.imgUrl}>{uploadImgStore.imgUrl}</a></p>
                </div>
            )}

        </div>);
};

export default observer(ScanComponent);
