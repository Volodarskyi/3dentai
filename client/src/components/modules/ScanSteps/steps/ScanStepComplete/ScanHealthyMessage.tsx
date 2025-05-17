"use client";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useStores } from "@/hooks/useStores";

import './scanComplete.Styles.scss';

const ScanHealthyMessageComponent = () => {
    const { scanStore } = useStores();
    const [status, setStatus] = useState<"success" | "error" | "loading" | null>(null);

    const nextScanDate = new Date();
    nextScanDate.setDate(nextScanDate.getDate() + 14);
    const formattedDate = nextScanDate.toLocaleDateString("en-CA");

    const handleSubmit = async () => {
        try {
            setStatus("loading");

            // Save scan (you can extend to also save nextScanDate if backend supports)
            await scanStore.submitScan();

            // Simulate delay or handle backend response
            setTimeout(() => setStatus("success"), 500);
        } catch (error) {
            console.error("Submission failed:", error);
            setStatus("error");
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
                <div className="mt-025 scanComplete__healthy-content">Date:<strong className="ml-0.5"> {formattedDate}</strong></div>
                <div className="mt-025 scanComplete__healthy-content">Time: <strong className="ml-0.5">10:00AM</strong></div>
            </div>

            <button className="scanComplete__healthy-btn-confirm" onClick={handleSubmit} disabled={status === "loading"}>
                CONFIRM
            </button>
        </div>
    );
};

export const ScanHealthyMessage = observer(ScanHealthyMessageComponent);