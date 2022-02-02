import React, {KeyboardEvent, ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react';
import s from './SuperInput.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type SuperInputTextPropsType = DefaultInputPropsType & {
    /**
     * @param value (string) callback function - fired when the text changes
     */
    onChangeText?: (value: string) => void
    /**
     * Callback function - fired when pressing enter
     */
    onEnter?: () => void
    /**
     * On error, an error string is sent
     */
    error?: string
    /**
     * Styles for the field with an error
     */
    spanClassName?: string
}

const SuperInputText: React.FC<SuperInputTextPropsType> = (
    {
        type,
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,

        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange
        && onChange(e)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter
        && e.key === 'Enter'
        && onEnter()
    }

    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = error && className ? `${s.errorInput} ${className}` : className ? `${className}` : `${s.default}`

    return (
        <div className={s.superInput}>
            <input
                type={'text'}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}

                {...restProps}
            />
            {error && <span className={finalSpanClassName}>{error}</span>}
        </div>
    )
}

export default SuperInputText
