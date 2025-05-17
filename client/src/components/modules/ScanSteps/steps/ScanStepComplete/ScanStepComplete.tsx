"use client";

import { observer } from "mobx-react-lite";

import { useStores } from "@/hooks/useStores";

const ScanStepCompleteComponent = () => {
    const { scanStore } = useStores();

    return (
        <div>
            <button onClick={scanStore.submitScan}>SUBMIT</button>
        </div>
    );
};

export const ScanStepComplete =  observer(ScanStepCompleteComponent);
