import React from 'react'
import { observer } from 'mobx-react-lite'
import { Card, Grid, Text } from '@nextui-org/react'

import OptionStore from './OptionStore'
import WordStore from './WordStore'

const { size } = OptionStore
const size2 = Math.trunc(size * 0.8)

const Word = ({ text, meaning }) => (
    <Grid>
        <Card>
            <Text size={size}>{text}</Text>
            <Text color="#808080" size={size2}>{meaning}</Text>
        </Card>
    </Grid>
)

export default observer(function Answer() {
    const { result } = WordStore
    if (!result.length) return null
    return (
        <div className="result">
            <Text h3>答案</Text>
            <Grid.Container gap={2}>
                {result.map((item) => <Word key={item.id} {...item} />)}
            </Grid.Container>
        </div>
    )
})
