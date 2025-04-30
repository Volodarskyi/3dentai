import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import { UiErrorResult } from "@/components/UI/UiDialog/UiErrorResult/UiErrorResult";
import { UiLoader } from "@/components/UI/UiDialog/UiLoader/UiLoader";
import { UiSuccessResult } from "@/components/UI/UiDialog/UiSuccessResult/UiSuccessResult";
import { useStores } from "@/hooks/useStores";
import { EDialogAction } from "@/types/enums/uiDialog";

import "./UiDialog.Styles.scss";

const UiDialogComponent: FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const { dialogStore } = useStores();

  useEffect(() => {
    if (dialogStore.isShowUiDialog) {
      setIsAnimating(true);
    } else {
      setTimeout(() => setIsAnimating(false), 400); // Match transition duration
    }
  }, [dialogStore.isShowUiDialog]);

  if (isAnimating) {
    return (
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
    );
  }
  return null;
};

export const UiDialog = observer(UiDialogComponent);
