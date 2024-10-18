import {makeAutoObservable,toJS} from 'mobx';

export class UserStore {
    isShow = false;
    processTitle = undefined;
    cards = [];
    know = [];
    repeat = [];
    preparedGroups=[]

    constructor() {
        makeAutoObservable(this)
    }

    setProcessData = (processTitle, cards, know, repeat) => {
        this.processTitle = processTitle;
        this.cards = cards;
        this.know = know;
        this.repeat = repeat;
    }

    clearAll = () => {
        this.processTitle = undefined;
        this.cards = [];
        this.know = [];
        this.repeat = [];
        console.log('Modal user store-clear all')
    }

    setPreparedGroups = (preparedGroups)=>{
        this.preparedGroups = preparedGroups
    }

    showStatisticsDetail = ({processTitle, cards, know, repeat}) => {
        console.log('showStatisticsDetail-title:',toJS(processTitle))
        console.log('showStatisticsDetail-cards:',toJS(cards))
        console.log('showStatisticsDetail-know:',toJS(know))
        console.log('showStatisticsDetail-repeat:',toJS(repeat))
        this.setProcessData(processTitle, cards, know, repeat)
        this.isShow = true;
    }

    displayGroupResults = ()=>{
        const result = [];

        this.cards.map(cardItem=>{
            const isNewGroupIdx = result.findIndex(groupResultItem => groupResultItem.groupName === cardItem.group)

            if(isNewGroupIdx<0){
                result.push({groupName:cardItem.group,know:0,repeat:0,total:0})
            }

            const groupIdx = result.findIndex(groupResultItem => groupResultItem.groupName === cardItem.group)

            const isKnowIdx = this.know.findIndex(knowItem=>knowItem === cardItem._id)

            if(isKnowIdx>-1) {
                result[groupIdx] = {
                    groupName: result[groupIdx].groupName,
                    know: result[groupIdx].know + 1,
                    repeat: result[groupIdx].repeat,
                    total: result[groupIdx].total + 1
                }

                return;
            }

            const isRepeatIdx = this.repeat.findIndex(repeatItem=>repeatItem === cardItem._id)

            if(isRepeatIdx>-1) {
                result[groupIdx] = {
                    groupName: result[groupIdx].groupName,
                    know: result[groupIdx].know ,
                    repeat: result[groupIdx].repeat+ 1,
                    total: result[groupIdx].total + 1
                }

                return;
            }

            result[groupIdx] = {
                groupName: result[groupIdx].groupName,
                know: result[groupIdx].know ,
                repeat: result[groupIdx].repeat,
                total: result[groupIdx].total + 1
            }

        })

        console.log('STORE-USER-result:', result)

        this.setPreparedGroups(result)
    }
    closeStatisticsDetail = () => {
        this.isShow = false;
        this.clearAll();
    }
}
