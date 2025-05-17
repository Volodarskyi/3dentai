export interface IQuestionDataItem {
    type: "radio" | "checkbox";
    question: string;
    answers: { label: string; value: boolean }[];
    active: boolean;
}
