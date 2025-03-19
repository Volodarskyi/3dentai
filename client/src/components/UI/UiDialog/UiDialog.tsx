import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import { UiErrorResult } from "@/components/UI/UiDialog/UiErrorResult/UiErrorResult";
import { UiLoader } from "@/components/UI/UiDialog/UiLoader/UiLoader";
import { UiSuccessResult } from "@/components/UI/UiDialog/UiSuccessResult/UiSuccessResult";
import dialogStore from "@/store/reducers/dialogStore";
import { EDialogAction } from "@/types/enums/uiDialog";

import "./UiDialog.Styles.scss";

const UiDialogComponent: FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (dialogStore.isShowUiDialog) {
      setIsAnimating(true);
    } else {
      setTimeout(() => setIsAnimating(false), 400); // Match transition duration
    }
  }, [dialogStore.isShowUiDialog]);

  return (
    isAnimating && (
      <div
        className={`ui-dialog ${dialogStore.isShowUiDialog ? "ui-dialog-show" : "ui-dialog-hide"}`}
      >
        {dialogStore.currentDialogAction === EDialogAction.SHOW_LOADER && (
          <UiLoader />
        )}
        {dialogStore.currentDialogAction ===
          EDialogAction.SHOW_SUCCESS_RESULT && <UiSuccessResult />}
        {dialogStore.currentDialogAction ===
          EDialogAction.SHOW_ERROR_RESULT && <UiErrorResult />}
      </div>
    )
  );
};

export const UiDialog = observer(UiDialogComponent);
