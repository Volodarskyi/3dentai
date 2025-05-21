import {makeAutoObservable, reaction} from "mobx";

import {apiClient} from "@/api/apiClient";
import {aiApiServices} from "@/api/services/aiApiServices";
import {ISteps} from "@/types/steps";
import {IDentistData} from "@/types/dentistTypes";
import {EScanStatus} from "@/types/enums/scanEnums";
import {EResponseResult} from "@/types/enums/apiEnums";
import {IQuestionDataItem} from "@/types/scanTypes";

class ScanStore {
    steps: ISteps[] = [];
    step: number = 0;
    disabledPrevious: boolean = true;
    disabledNext: boolean = false;

    imgFile: File | undefined = undefined;
    isLoading: boolean = false;
    imgUrl: string = "";
    imgDescription: string = "";

    // SCAN_DATA
    scanData = {
        doctorId: "", // use init function on first step
        teeth: {} as Record<string, string>,
        resultAI: "",
        questions: [] as IQuestionDataItem[],
    };

    dentistData: IDentistData | null = null;

    activeTooth: number = 48;

    isHealthy: boolean | null = null;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.step,
            () => this.validationButton(),
        );
    }

    setSteps = (newSteps: ISteps[]) => {
        this.steps = newSteps;
        this.step = 0;
        this.validationButton();
    };

    nextStep = () => {
        console.log("nextStep")
        this.step = this.step + 1;
    };

    previousStep = () => {
        console.log("previousStep")
        this.step = this.step - 1;
    };

    validationButton = () => {
        this.disabledPrevious = this.step <= 0;
        this.disabledNext = this.steps.length
            ? this.step >= this.steps.length - 1
            : true;
        console.log("this.disabledNext")
    };

    setImgFile = (file: File): void => {
        this.imgFile = file;
    };

    setImgUrl = (value: string) => {
        this.imgUrl = value;
    };

    handleUpload = async (): Promise<void> => {
        if (!this.imgFile) {
            console.error("No file selected.");
            return;
        }

        const formData = new FormData();
        formData.append("photo", this.imgFile);

        try {
            this.isLoading = true;
            const res = await apiClient.postFile("api/photo/upload", formData);
            console.log("RES", res);
            console.log("url", res.data.url);

            // TODO - hot fix. Some time we have answer link, but this image doesn't save
            setTimeout(
                (context) => {
                    context.setImgUrl(res.data.url);
                    // context.scanData.teeth[this.activeTooth] = res.data.url;
                    this.addToothPhotoUrl(res.data.url)
                    context.isLoading = false;
                },
                2000,
                this,
            );
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    checkerIsHealthy = (resultAi: string) => {
        const resultMatch = resultAi.match(/Result:\s*(INVESTIGATION|HEALTHY)/i);
        if (!resultMatch) return null;
        return resultMatch[1].toUpperCase() === "HEALTHY";
    }

    setAiResult = (resultAi: string) => {
        console.log('setAiResult-resultAi:', resultAi);
        const isHealthy = this.checkerIsHealthy(resultAi);
        this.isHealthy = isHealthy;
        console.log('setAiResult-isHealthy:', isHealthy);
        this.scanData.resultAI = resultAi;
    }

    analyzeImage = async () => {
        // this.isLoading = true;
        // this.isLoading = false;
        if (this.imgUrl === "" || this.isLoading) return;

        const aiResult = await aiApiServices.analyzeImage(this.imgUrl);
        this.setAiResult(aiResult);  // <-- use setter with parsing logic

        return aiResult;
    };


    // SET_SCAN_DATA
    setActiveTooth = (activeTooth: number) => {
        console.log("set-activeTooth", activeTooth);
        this.activeTooth = activeTooth;
    }

    addToothPhotoUrl = (toothPhotoUrl: string) => {
        const tootNumber = this.activeTooth;
        console.log("addToothPhotoUrl-tootNumber", tootNumber);
        console.log("addToothPhotoUrl-toothPhotoUrl", toothPhotoUrl);
        const updateTeethObj = {[tootNumber]: toothPhotoUrl};
        console.log("addToothPhotoUrl-toothPhotoUrl", updateTeethObj);
        this.scanData.teeth = updateTeethObj;
        // this.scanData.teeth = { ...this.scanData.teeth, [tootNumber]: toothPhotoUrl }; /// need to finish for all teeth
    }

    setScanDoctorId = async (doctorId: string) => {
        console.log("setScanDoctorId", doctorId);
        this.scanData.doctorId = doctorId;
    }

    getDentistDataByUserId = async (): Promise<void> => {
        try {
            const res = await apiClient.get("/api/patient/doctor");
            console.log("Doctor data:", res.data);

            if (res.data?.dentistData.dentistId) {
                this.dentistData = {
                    dentistId: res.data.dentistData.dentistId,
                    email: res.data.dentistData.email,
                    firstName: res.data.dentistData.firstName,
                    lastName: res.data.dentistData.lastName,
                    phone: res.data.dentistData.phone,
                };

                // Optionally, keep storing only the ID in scanData
                this.scanData.doctorId = res.data.dentistData.dentistId;
            }
        } catch (error) {
            console.error("Failed to get doctor data:", error);
        }
    };

    setQuestions = (questions: {
        type: "radio" | "checkbox";
        question: string;
        answers: { label: string; value: boolean }[];
        active: boolean;
    }[]) => {
        console.log("setQuestions");

        if (!Array.isArray(questions)) {
            return [];
        }

        const questionsReverse = questions.reverse();

        const preparedQuestions = questionsReverse.map((questionObj: any) => ({
            type: questionObj.type,
            question: questionObj.question,
            answers: questionObj.answers.map((a: any) => ({
                label: a.label,
                value: false, // Default value; can be adjusted
            })),
            active: true,
        }));

        this.scanData.questions = preparedQuestions;
    }

    getActiveQuestions = async (): Promise<void> => {
        try {
            const response = await apiClient.get("/api/questions/active");
            console.log("Active questions response:", response.data.questions);

            this.setQuestions(response.data.questions)

            // if (Array.isArray(response.data)) {
            //     this.scanData.questions = response.data.questions.map((question: any) => ({
            //         _id: question._id,
            //         type: question.type,
            //         question: question.text,
            //         answers: question.answers.map((a: any) => ({
            //             label: a.label,
            //             value: false, // Default value; can be adjusted
            //         })),
            //         active: true,
            //     }));
            // }
        } catch (error) {
            console.error("Failed to fetch active questions:", error);
        }
    };

    init = async (): Promise<any> => {
        try {
            await Promise.all([
                this.getDentistDataByUserId(),
                this.getActiveQuestions()
            ]);

            console.log("ScanStore initialized.");
            return {result:EResponseResult.SUCCESS}
        } catch (error) {
            console.error("ScanStore init error:", error);
        }
    };


    submitScan = async (currentStatus:EScanStatus) => {
        const dataToSubmit = {
            doctorId: this.scanData.doctorId,
            teeth: this.scanData.teeth,
            resultAI: this.scanData.resultAI,
            questions: this.scanData.questions,
            status: currentStatus
        };

        console.log("SCAN DATA TO SUBMIT:", JSON.stringify(dataToSubmit, null, 2));

        const requestUrl = "api/scans/add";

        try {
            const res = await apiClient.post(requestUrl,{
                doctorId: this.scanData.doctorId,
                teeth: this.scanData.teeth,
                resultAI: this.scanData.resultAI,
                questions: this.scanData.questions,
                status: currentStatus
            });
            console.log("Add Scan Response 1:", res.data);

            if (res.result !== "SUCCESS") {
                throw new Error(res.message || "Some thing went wrong");
            }

            console.log("Add Scan Response2:", res.data);
            return res;
        } catch (e) {
            console.log("ERROR! api/scans/add", e);
        }
    };

    sendMessageDentist = async (scanId:string , resultAi:string): Promise<void> => {
        const requestUrl = "api/messages/send";
        console.log('sendMessageDentist-reqURL:', requestUrl);

        console.log('sendMessageDentist-scanId:', scanId);


        const firstMessageToDoctor = `Doctor, can you please clarify the result? Here is my response from ai: ${resultAi}`
        console.log('sendMessageDentist-firstMessageToDoctor:', firstMessageToDoctor);

        try {
            const res = await apiClient.post(requestUrl,{
                scanId: scanId,
                message: firstMessageToDoctor
            });

            if (res.result !== "SUCCESS") {
                throw new Error(res.message || "Some thing went wrong");
            }

            console.log("sendMessageDentist RES:", res.data);
            return res;
        } catch (e) {
            console.log("ERROR! sendMessageDentist", e);
        }
    }
}

export default new ScanStore();
