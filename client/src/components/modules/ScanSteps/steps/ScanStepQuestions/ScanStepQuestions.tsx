"use client";

import {observer} from "mobx-react-lite";
import {useStores} from "@/hooks/useStores";
import {DisplayQuestions} from "@/components/DisplayQuestions/DisplayQuestions";

const ScanStepQuestionsComponent = () => {
    const {scanStore} = useStores();

    return (
        <>
            <DisplayQuestions questions={scanStore.scanData.questions}/>
        </>
    );
};

export const ScanStepQuestions = observer(ScanStepQuestionsComponent);
