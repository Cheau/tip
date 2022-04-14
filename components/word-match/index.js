import React from 'react'
import dynamic from 'next/dynamic'
import { observer } from 'mobx-react-lite'
import {
    Container,
} from '@nextui-org/react'

import Answer from './Answer'
import FileStore from './FileStore'
import Options from './options'
import Result from './Result'
import Stats from './Stats'
import Subject from './Subject'
import Title from './Title'
import './Controller'

const Block = ({ children }) => (
    <Container gap={0} css={{
        margin: '20px 0',
    }}>
        {children}
    </Container>
)

const WordMatch = observer(function Page({ sheets }) {
    FileStore.setSheets(sheets, false)
    return (
        <>
            <Container display="flex" justify="center" lg>
                <Title />
                <Block>
                    <Subject />
                </Block>
                <Block>
                    <Stats title="统计" />
                </Block>
                <Block>
                    <Answer />
                </Block>
            </Container>
            <Result />
            {/* language=CSS */}
            <style jsx>{`
                .title {
                    height: 150px;
                    padding: 10px;
                    background: black;
                    color: white;
                }
            `}</style>
        </>
    )
})

export default WordMatch

WordMatch.features = {
    layout: {
        options: <Options />,
    }
}
