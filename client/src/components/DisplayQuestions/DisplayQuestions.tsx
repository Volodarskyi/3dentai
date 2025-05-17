"use client";
import React from "react";
import {observer} from "mobx-react-lite";
import {useStores} from "@/hooks/useStores";
import {DisplayQuestionItem} from "@/components/DisplayQuestions/DisplayQuestionItem/DisplayQuestionItem";

import './DisplayQuestions.Styles.scss';


const DisplayQuestionsComponent = () => {
    const {scanStore} = useStores()

    // @ts-ignore
    return (
        <div className="display-questions">
            <h2 className="display-questions__title">Please, answer the questions:</h2>
            <div className="display-questions__list">
                {scanStore.scanData.questions.map((questionItem, i) =>
                    <DisplayQuestionItem key={i} questionItemData={questionItem} />)}
            </div>
        </div>
    );
};

export const DisplayQuestions = observer(DisplayQuestionsComponent);
