export interface IAnswer {
  label: string;
  value: boolean;
}

export interface IQuestion {
  type: "checkbox" | "radio";
  question: string;
  answers: IAnswer[];
  active?: boolean;
}
