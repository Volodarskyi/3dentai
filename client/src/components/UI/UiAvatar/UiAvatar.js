import {React} from 'react';
import {observer} from 'mobx-react';

import  './UiAvatar.Styles.scss';
import {configClient} from "../../../configClient/configClient";
export const UiAvatarComponent = ({avatarUrl = null}) => {
    const currentAvatar = avatarUrl || configClient.DEFAULT_USER_AVATAR;
    return (
        <div className="ui-avatar"
             style={{background: `url(${currentAvatar}) center/cover no-repeat`}}>
        </div>
    );
};

export const UiAvatar = observer(UiAvatarComponent)
