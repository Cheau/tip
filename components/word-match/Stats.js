import React from 'react'
import { observer } from 'mobx-react-lite'
import {
    Container, Grid, Progress, Text,
} from '@nextui-org/react'

import TimerStore from './TimerStore'
import WordStore from './WordStore'

const Chart = ({ text, title, value }) => (
    <Container gap={0}>
        <Text b>{title}: {text || `${value}%`}</Text>
        {value && <Progress value={value} />}
    </Container>
)

const Datapoint = ({ name, value }) => (
    <Container
        direction="column"
        display="flex"
        gap={0}
        justify="center"
    >
        <Text b>{name}</Text>
        <Text color="primary">{value}</Text>
        {/.+%$/.test(value) && <Progress size="xs" value={value.substr(0, value.length - 1)} />}
    </Container>
)

export default observer(function Stats({ title }) {
    const { pending, text } = TimerStore
    const { subject: {
        accuracy, result,
    } } = WordStore
    if (!result.length || !pending) return null
    return (
        <>
            <Text h3>{title}</Text>
            <Grid.Container
                gap={0}
                justify="center"
            >
                <Grid xs={4}>
                    <Datapoint name="词数" value={result.length} />
                </Grid>
                <Grid xs={4}>
                    <Datapoint name="用时" value={text} />
                </Grid>
                <Grid xs={4}>
                    <Datapoint name="准确率" progress value={`${accuracy}%`} />
                </Grid>
            </Grid.Container>
        </>
    )
})
