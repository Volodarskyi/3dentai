"use client";
import React, {FC} from "react";
import {observer} from "mobx-react-lite";

import '../DisplayQuestions.Styles.scss';

interface IDisplayAnswerTrue {
    answerLabel: string;
}

const DisplayAnswerTrueComponent : FC<IDisplayAnswerTrue> = ({answerLabel}) => {

    return (
        <div className="display-questions__answer-true">
            {answerLabel}
        </div>
    );
};

export const DisplayAnswerTrue = observer(DisplayAnswerTrueComponent);
