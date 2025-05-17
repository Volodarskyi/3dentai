"use client";
import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import "./DisplayAiResponse.Styles.scss";

interface IDisplayAiResponse {
    aiResponse: string;
}

const DisplayAiResponseComponent: FC<IDisplayAiResponse> = ({ aiResponse }) => {
    // 1. Extract result
    const resultMatch = aiResponse.match(/Result:\s*(INVESTIGATION|HEALTHY)/i);
    const resultText = resultMatch?.[1]?.toUpperCase() ?? "";
    const resultIndex = resultMatch?.index ?? aiResponse.length;

    // 2. Text before result
    const textBeforeResult = aiResponse.slice(0, resultIndex).trim();

    // 3. Extract intro (before first numbered point)
    // @ts-ignore
    const introMatch = textBeforeResult.match(/^(.*?)\s*(?=\d+\.\s)/s);
    const introText = introMatch?.[1]?.trim() ?? "";

    const bodyAfterIntro = introMatch
        ? textBeforeResult.slice(introMatch[0].length).trim()
        : textBeforeResult;

    // 4. Match all clean numbered points ending with "."
    const pointRegex = /\d+\.\s[^.]+?\./g;
    const points = [...bodyAfterIntro.matchAll(pointRegex)].map((m) =>
        m[0].trim()
    );

    // 5. Find the end of the last point in full text
    let outroText = "";
    if (points.length > 0) {
        const lastPoint = points[points.length - 1];
        const lastPointEndIndex =
            bodyAfterIntro.lastIndexOf(lastPoint) + lastPoint.length;

        outroText = bodyAfterIntro.slice(lastPointEndIndex).trim();
        outroText = outroText.replace(/^\*+|\*+$/g, ""); // remove leading/trailing ***
    }

    return (
        <div className="display-ai-response">
            {introText && (
                <div className="display-ai-response__intro">{introText}</div>
            )}

            {points.map((point, index) => (
                <div key={index} className="display-ai-response__point">
                    {point}
                </div>
            ))}

            {outroText && (
                <div className="display-ai-response__outro">{outroText}</div>
            )}

            {resultText === "INVESTIGATION" && (
                <div className="display-ai-response__investigation">INVESTIGATION</div>
            )}

            {resultText === "HEALTHY" && (
                <div className="display-ai-response__healthy">HEALTHY</div>
            )}
        </div>
    );
};

export const DisplayAiResponse = observer(DisplayAiResponseComponent);
