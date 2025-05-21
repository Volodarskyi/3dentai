import {useEffect} from "react";
import {observer} from "mobx-react-lite";

import Loading from "@/components/UI/Loading";
import {useStores} from "@/hooks/useStores";
import {DisplayAiResponse} from "@/components/DisplayAiRespoanse/DisplayAiResponse";

const AnalyzePhoto = () => {
    const {scanStore, dialogStore} = useStores();
    // const {
    //     imgUrl,
    //     imgDescription,
    //     isLoading,
    //     analyzeImage: analyze,
    // } = scanStore;

    // useEffect(() => {
    //     // dialogStore.showLoader()
    //     analyze();
    // }, [analyze, imgUrl]);

    // ✅ analyze image
    useEffect(() => {
        (async () => {
            try {
                dialogStore.showLoader();
                const res = await scanStore.analyzeImage();
                dialogStore.closeAll();
            }catch (error) {
                console.error("Submission failed:", error);
                const message = error instanceof Error ? error.message : 'Unknown error';
                dialogStore.showError(message)
            }
        })();
    }, [scanStore.analyzeImage, scanStore.imgUrl]);

    return (
        <div
            className={
                "flex w-full min-h-96 border border-gray-200 rounded-b-lg p-4 text-white font-medium"
            }
        >
            <div className={"ai_answer__answer"}>
                <DisplayAiResponse aiResponse={scanStore.scanData.resultAI}/>
                {/*{imgDescription}*/}
            </div>
        </div>
    );
};

export default observer(AnalyzePhoto);
