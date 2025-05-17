"use client";
import React, {FC} from "react";
import {observer} from "mobx-react-lite";
import {IQuestionDataItem} from "@/types/scanTypes";

import '../DisplayQuestions.Styles.scss';
import {DisplayAnswerTrue} from "@/components/DisplayQuestions/DisplayAnswerTrue/DisplayAnswerTrue";

interface IDisplayQuestionItem {
    questionItemData: IQuestionDataItem ;
}

const DisplayQuestionItemComponent : FC<IDisplayQuestionItem> = ({questionItemData}) => {

    return (
        <div
            className="display-questions__item">
            <div className="display-questions__item-top">{questionItemData.question}</div>
            <div className="display-questions__item-bottom">
                {questionItemData.answers.map((answer, i) => <DisplayAnswerTrue answerLabel={answer.label}/>)}
            </div>
        </div>
    );
};

export const DisplayQuestionItem = observer(DisplayQuestionItemComponent);
