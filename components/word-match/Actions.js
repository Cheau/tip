import React from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Container, Spacer } from '@nextui-org/react'

import OptionStore from './OptionStore'
import WordStore from './WordStore'

export default observer(function Actions() {
    const { sheets } = OptionStore
    if (!sheets.length) return null
    const { roll, rollback } = WordStore
    return (
        <Container
            display="flex"
            fluid
            justify="center"
            responsive={false}
            css={{
                margin: '10px 0',
        }}>
            <Button auto onClick={roll} rounded>出题</Button>
            <Spacer x={1} />
            <Button auto bordered onClick={rollback} rounded>重做</Button>
        </Container>
    )
})
