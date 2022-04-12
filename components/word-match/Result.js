import React from 'react'
import { observer } from 'mobx-react-lite'
import {
    Container, Modal, Text, Progress,
} from '@nextui-org/react'

import Stats from './Stats'
import WordStore from './WordStore'

const Chart = ({ text, title, value }) => (
    <Container gap={0} css={{
        marginTop: '20px',
        marginBottom: '20px',
    }}>
        <Text b>{title}: {text || `${value}%`}</Text>
        {value && <Progress value={value} />}
    </Container>
)

export default observer(function Result() {
    const { subject: {
        setShow, show,
    } } = WordStore
    const close = () => setShow(false)
    return (
        <Modal
            closeButton
            onClose={close}
            open={show}
            css={{
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '80%',
            }}
        >
            <Modal.Header>
                <Text h3>我的成绩</Text>
            </Modal.Header>
            <Modal.Body>
                <Stats />
            </Modal.Body>
            <Modal.Footer />
        </Modal>
    )
})
