import { FC } from "react";

// import { observer } from "mobx-react-lite";
import "../UiDialog.Styles.scss";

export const UiLoader: FC = () => {
  return (
    <div className="ui-loader">
      <div className="loads"></div>
      <div className="loads"></div>
      <div className="loads"></div>
      <div className="loads"></div>
      <div className="loads"></div>
      <div className="loads"></div>
    </div>
  );
};
