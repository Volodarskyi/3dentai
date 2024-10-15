import {React} from 'react';
import {observer} from 'mobx-react';
import {configClient} from "../../configClient/configClient";

import './UserStatistics.Styles.scss';
import {UiProgressBar} from "../UI/UiProgressBar/UiProgressBar";
import {useRootStore} from "../../stores";

const UserStatisticsComponent = ({id,coverUrl,title,cards,know,repeat}) => {
    const {userStore} = useRootStore();
    const currentCover = coverUrl || configClient.DEFAULT_COVER_URL;

    const moreDetails =()=>{
        console.log('more details id:', id)
        userStore.showStatisticsDetail({processTitle:title,cards,know,repeat})
    }

    return (
        <div>
            <div className="user-statistics"
                 style={{background: `url(${currentCover}) center/cover no-repeat`}}
                 onClick={moreDetails}
            >
                <div className="user-statistics__title">{title}</div>
                <div className="user-statistics__line">
                    <UiProgressBar total={cards.length} know={know.length} repeat={repeat.length}/>
                </div>
            </div>

        </div>
    );
};

export const UserStatistics = observer(UserStatisticsComponent)
