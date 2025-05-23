import { FC } from "react";
import { observer } from "mobx-react-lite";

import { useStores } from "@/hooks/useStores";

import "../UiDialog.Styles.scss";

const UiSuccessResultComponent: FC = () => {
  const { dialogStore } = useStores();
  return (
    <div className="ui-success-res">
      <div className="ui-success-res__success">SUCCESS</div>
      <div className="ui-success-res__success-message">
        {dialogStore.successMessage}
      </div>
    </div>
  );
};

export const UiSuccessResult = observer(UiSuccessResultComponent);
