"use client";
import {observer} from "mobx-react-lite";
import {FC} from "react";
import {IDentistData} from "@/types/dentistTypes";
import {useStores} from "@/hooks/useStores";
import {EResponseResult} from "@/types/enums/apiEnums";
import {EScanStatus} from "@/types/enums/scanEnums";
import {prepareErrorMessage} from "@/utils/apiUtils";
import {useRouter} from "next/navigation";

import './scanComplete.Styles.scss';

interface IScanInvestigationMessageComponent {
    dentist: IDentistData | null;
}

const ScanInvestigationMessageComponent : FC<IScanInvestigationMessageComponent> = ({ dentist }) => {
    const { scanStore, dialogStore } = useStores();
    const router = useRouter();

    const onCloseSuccessFn = ()=>{
        router.push("/user");
        dialogStore.closeAll()
    }

    const handleSubmit = async () => {
        try {
            dialogStore.showLoader()

            // Save scan
            const saveScanRes = await scanStore.submitScan(EScanStatus.IN_REVIEW);
            console.log('saveScanRes:', saveScanRes);

            if(saveScanRes.result  === EResponseResult.ERROR){
                throw new Error('save scan to db error')
            }

            // send first message to dentist
            const sendMessageRes = await scanStore.sendMessageDentist(saveScanRes.data.newScan._id, scanStore.scanData.resultAI);
            console.log('sendMessageRes:', sendMessageRes);

            dialogStore.showSuccess('Save scan & send message',onCloseSuccessFn)

        } catch (error) {
            console.error("Submission failed:", error);
            const message = prepareErrorMessage(error)
            dialogStore.showError(message)
        }
    };

    if (!dentist) return null;

    return (
        <div className="scanComplete__investigation">
            <h2 className="scanComplete__investigation-title">INVESTIGATION</h2>
            <div className="scanComplete__investigation-subtitle">Next Actions:</div>
            <div className="mt-025">Save Scan to history</div>
            <div className="mt-025">Message to dentist</div>
            <div className="mt-2">
                <div className="scanComplete__investigation-subtitle">Dentist Details:</div>
                <div className="mt-025 scanComplete__investigation-content"><strong>{dentist.firstName} {dentist.lastName}</strong></div>
                <div className="mt-025 scanComplete__investigation-content">672-555-5555</div>
                <div className="mt-025 scanComplete__investigation-content">{dentist.email}</div>
            </div>

            <button className="scanComplete__investigation-btn-confirm" onClick={handleSubmit} disabled={status === "loading"}>
                {/*{status === "loading" ? "Submitting..." : "Submit"}*/}
                CONFIRM
            </button>
        </div>
    );
};

export const ScanInvestigationMessage  = observer(ScanInvestigationMessageComponent);
