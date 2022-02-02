import React from 'react';

interface PrimaryButton {
    kind: 'primary'
    specialPrimaryMethod: () => void
}
interface SecondaryButton {
    kind: "secondary"
}

type Button = PrimaryButton | SecondaryButton
type Props = React.ComponentPropsWithoutRef<'button'> & Button

export const Button = ({children, onClick, type}: Props) => {
    return (
        <button onClick={onClick} type={type}>
            {children}
        </button>
    )
}
