import React from 'react'

import Count from './Count'
import Lexicon from './Lexicon'
import Range from './Range'
import Size from './Size'

export default function Options() {
    return (
        <>
            <Lexicon />
            <Count />
            <Size />
        </>
    )
}

export function Required() {
    return (
        <>
            <Range />
        </>
    )
}
