import React from 'react'
import { observer } from 'mobx-react-lite'

import {
    Button,
    ButtonToolbar,
} from 'rsuite'

import OptionStore from './OptionStore'
import WordStore from './WordStore'

export default observer(function Actions() {
    const { sheets } = OptionStore
    if (!sheets.length) return null
    const { roll, rollback } = WordStore
    return (
        <ButtonToolbar>
            <Button onClick={roll} size="lg">出题</Button>
            <Button onClick={rollback} size="lg">重做</Button>
        </ButtonToolbar>
    )
})
