import React from 'react'
import { observer } from 'mobx-react-lite'
import {
    Modal, Text
} from '@nextui-org/react'

import Store from './Store'

export default observer(function OptionPanel({ children }) {
    const { open, setOpen } = Store
    return (
        <Modal
            blur
            closeButton
            open={open}
            onClose={() => setOpen(false)}
            width="80%"
        >
            <Modal.Header>
                <Text h3>设置</Text>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer />
        </Modal>
    )
})
