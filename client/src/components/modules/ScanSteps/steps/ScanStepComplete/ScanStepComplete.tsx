"use client";

import { observer } from "mobx-react-lite";
import { useStores } from "@/hooks/useStores";
import {ScanInvestigationMessage} from "@/components/modules/ScanSteps/steps/ScanStepComplete/ScanInvestigationMessage";
import {ScanHealthyMessage} from "@/components/modules/ScanSteps/steps/ScanStepComplete/ScanHealthyMessage";

const ScanStepCompleteComponent = () => {
    const { scanStore } = useStores();
    const { isHealthy, dentistData } = scanStore;

    return (
        <div>
            {isHealthy === true && <ScanHealthyMessage/>}
            {isHealthy === false && <ScanInvestigationMessage dentist={dentistData}/> }
        </div>
    );
};

export const ScanStepComplete = observer(ScanStepCompleteComponent);
