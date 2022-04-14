import React from 'react'
import { observer } from 'mobx-react-lite'
import {
    Avatar, Collapse, Container,
} from '@nextui-org/react'

import { Required } from './options'
import OptionStore from './OptionStore'
import { GiAbstract089 } from 'react-icons/gi'

const logo = <Avatar icon={<GiAbstract089 style={{ fontSize: '2em' }} />} size="lg" squared />

export default observer(function Title() {
    return (
        <>
            <Collapse
                contentLeft={logo}
                expanded={OptionStore.showRange}
                shadow
                subtitle="请选择范围后在题目下点击出题"
                title="单词消消乐"
                css={{ width: '100%' }}
            >
                <Container fluid gap={1}>
                    <Required />
                </Container>
            </Collapse>
        </>
    )
})
