import React from 'react'

type Props = React.PropsWithChildren<{
    as: 'div' | 'section' | 'aside'
}>

export const Container = ({as: Component = 'div', children}: Props) => {
    return <Component>{children}</Component>
}
