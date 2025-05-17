"use client";
import { observer } from "mobx-react-lite";
import {FC, useState} from "react";
import { IDentistData } from "@/types/dentistTypes";
import { useStores } from "@/hooks/useStores";

import './scanComplete.Styles.scss';

interface IScanInvestigationMessageComponent {
    dentist: IDentistData | null;
}

const ScanInvestigationMessageComponent : FC<IScanInvestigationMessageComponent> = ({ dentist }) => {
    const { scanStore } = useStores();
    const [status, setStatus] = useState<"success" | "error" | "loading" | null>(null);

    const handleSubmit = async () => {
        try {
            setStatus("loading");

            // Save scan
            await scanStore.submitScan();

            // Simulate message to dentist
            // TODO: Replace with API call to notify dentist if available
            console.log("Sending message to dentist:", dentist);

            setTimeout(() => setStatus("success"), 500);
        } catch (error) {
            console.error("Submission failed:", error);
            setStatus("error");
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
