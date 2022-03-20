import React from 'react'
import { observer } from 'mobx-react-lite'
import { Drawer } from 'rsuite'

import Store from './Store'

export default observer(function OptionPanel({ children }) {
    const { open, setOpen } = Store
    return (
        <Drawer open={open} size="xs" onClose={() => setOpen(false)}>
            <Drawer.Header>
                <Drawer.Title>设置</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body style={{ padding: '30px' }}>
                {children}
            </Drawer.Body>
        </Drawer>
    )
})
