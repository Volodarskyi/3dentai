"use client";
import {observer} from "mobx-react-lite";
import {useStores} from "@/hooks/useStores";

import {EResponseResult} from "@/types/enums/apiEnums";
import dialogStore from "@/store/reducers/dialogStore";

import './scanComplete.Styles.scss';
import {EScanStatus} from "@/types/enums/scanEnums";

const ScanHealthyMessageComponent = () => {
    const {scanStore} = useStores();

    // check date today
    const now = new Date();
    const formattedDateToday = now.toLocaleDateString(); // e.g., "5/21/2025"


    // next scan date
    const nextScanDate = new Date();
    nextScanDate.setDate(nextScanDate.getDate() + 14);
    const formattedDateNext = nextScanDate.toLocaleDateString("en-CA");

    const onCloseSuccessFn = () => {
        console.log('TODO redirect to /user')
        dialogStore.closeAll()
    }

    const handleSubmit = async () => {
        try {
            dialogStore.showLoader()

            // Save scan
            const saveScanRes = await scanStore.submitScan(EScanStatus.HEALTHY);
            console.log('saveScanRes:', saveScanRes);

            if (saveScanRes.result === EResponseResult.ERROR) {
                throw new Error('save scan to db error')
            }

            // send first message to dentist
            const sendMessageRes = await scanStore.sendMessageDentist(saveScanRes.data.newScan._id, `HEALTHY | checked ${formattedDateToday}  next scan ${formattedDateNext}`);
            console.log('sendMessageRes:', sendMessageRes);

            dialogStore.showSuccess('Save scan & send message', onCloseSuccessFn)

        } catch (error) {
            console.error("Submission failed:", error);
            const message = error instanceof Error ? error.message : 'Unknown error';
            dialogStore.showError(message)
        }
    };

    return (
        <div className="scanComplete__healthy">
            <h2 className="scanComplete__healthy-title">HEALTHY</h2>
            <div className="scanComplete__healthy-subtitle">Next Actions:</div>
            <div className="mt-025">Save scan to history</div>
            <div className="mt-025">Set next scan</div>

            <div className="mt-2">
                <div className="scanComplete__healthy-subtitle">Next Scan Details:</div>
                <div className="mt-025 scanComplete__healthy-content">Date:<strong
                    className="ml-0.5"> {formattedDateNext}</strong></div>
                <div className="mt-025 scanComplete__healthy-content">Time: <strong className="ml-0.5">10:00AM</strong>
                </div>
            </div>

            <button className="scanComplete__healthy-btn-confirm" onClick={handleSubmit}>
                CONFIRM
            </button>
        </div>
    );
};

export const ScanHealthyMessage = observer(ScanHealthyMessageComponent);