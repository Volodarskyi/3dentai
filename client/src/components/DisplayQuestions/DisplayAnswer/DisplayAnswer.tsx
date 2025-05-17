"use client";
import React, {FC, useState} from "react";
import {observer} from "mobx-react-lite";

import '../DisplayQuestions.Styles.scss';

interface IDisplayAnswer {
    answerItem: any;
}

const DisplayAnswerComponent : FC<IDisplayAnswer> = ({answerItem}) => {
    const[isTrue, setIsTrue] =useState(false);

    const handlerAnswer = ()=>{
        setIsTrue(!isTrue)
    }

    return (
        <div className={isTrue ? "display-questions__answer-true" : "display-questions__answer-false"} onClick={handlerAnswer}>
            {answerItem.label}
        </div>
    );
};

export const DisplayAnswer = observer(DisplayAnswerComponent);
