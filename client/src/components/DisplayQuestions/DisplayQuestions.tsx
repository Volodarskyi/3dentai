"use client";
import React, {FC} from "react";
import {observer} from "mobx-react-lite";
import {useStores} from "@/hooks/useStores";
import {DisplayQuestionItem} from "@/components/DisplayQuestions/DisplayQuestionItem/DisplayQuestionItem";
import {IQuestionDataItem} from "@/types/scanTypes";
import './DisplayQuestions.Styles.scss';


interface IDisplayQuestions {
    questions: IQuestionDataItem[]
}


const DisplayQuestionsComponent :FC<IDisplayQuestions> = ({questions}) => {
    // const {scanStore} = useStores()

    // @ts-ignore
    return (
        <div className="display-questions">
            <h2 className="display-questions__title">Please, answer the questions:</h2>
            <div className="display-questions__list">
                {/*{scanStore.scanData.questions.map((questionItem, i) =>*/}
                {/*    <DisplayQuestionItem key={i} questionItemData={questionItem}/>)}*/}

                {questions.map((questionItem, i) =>
                    <DisplayQuestionItem key={i} questionItemData={questionItem}/>)}
            </div>
        </div>
    );
};

export const DisplayQuestions = observer(DisplayQuestionsComponent);
