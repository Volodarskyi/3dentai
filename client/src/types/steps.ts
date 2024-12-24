import { ReactElement } from "react";

export interface ISteps {
  id: string;
  title: string;
  description: string;
  content: ReactElement<any, any>;
}
