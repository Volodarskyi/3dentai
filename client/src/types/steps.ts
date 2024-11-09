import { ReactElement } from "react";

export interface ISteps {
  title: string;
  description: string;
  content: ReactElement<any, any>;
}
