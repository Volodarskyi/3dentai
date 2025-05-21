import {FC} from "react";
import {observer} from "mobx-react-lite";

import {useStores} from "@/hooks/useStores";

import "../UiDialog.Styles.scss";

const UiErrorResultComponent: FC = () => {
    const {dialogStore} = useStores();
    return (
        <div className="ui-error-res">
            <div className="ui-error-res__error">ERROR</div>
            <div className="ui-error-res__error-message">
                {dialogStore.errorMessage}
            </div>
            <button className='ui-error-res__error-btn-close' onClick={dialogStore.closeAll}>
                Close
            </button>
        </div>
    );
};

export const UiErrorResult = observer(UiErrorResultComponent);
