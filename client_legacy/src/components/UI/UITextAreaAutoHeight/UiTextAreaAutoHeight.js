import React, { useRef, useEffect } from 'react';
import {observer} from 'mobx-react';
const UiTextAreaAutoHeightComponent = ({ defaultValue, onChange, ...props })=> {
    const textareaRef = useRef(null);

    // Resize the textarea based on content
    const resizeTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    useEffect(() => {
        resizeTextarea();
    }, [textareaRef.current && textareaRef.current.value]);

    // Override the default onFocus behavior
    const handleFocus = (e) => {
        e.target.selectionStart = e.target.selectionEnd; // This ensures no text is selected when the textarea is focused
    };

    return (
        <textarea
            {...props}
            ref={textareaRef}
            value={defaultValue}
            readOnly={true}
            onFocus={handleFocus}
            style={{ overflow: 'hidden', resize: 'none' }}
        />
    );
}

export const UiTextAreaAutoHeight = observer(UiTextAreaAutoHeightComponent);
