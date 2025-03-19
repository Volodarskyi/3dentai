import { FC } from "react";
import { observer } from "mobx-react-lite";

import { UiLoader } from "@/components/UI/UiDialog/UiLoader/UiLoader";

import "./UiDialog.Styles.scss";

// interface IUiDialogProps {}

const UiDialogComponent: FC = () => {
  return (
    <div className="ui-dialog">
      <UiLoader />
    </div>
  );
};

export const UiDialog = observer(UiDialogComponent);
