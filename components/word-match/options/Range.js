import React from 'react'
import { observer } from 'mobx-react-lite'
import {
    Checkbox, Text,
} from '@nextui-org/react'

import FileStore from '../FileStore'
import OptionStore from '../OptionStore'

export default observer(function Range() {
    const { sheets, setSheets } = OptionStore
    return (
        <>
            <Text color="error">出题范围</Text>
            {FileStore.sheets.length > 0 && (
                <Checkbox.Group
                    onChange={(val) => setSheets(val)}
                    size="sm"
                    value={sheets}
                >
                    {FileStore.sheets.map(({ id, name }) => <Checkbox key={id} value={id}>{name}</Checkbox>)}
                </Checkbox.Group>
            )}
        </>
    )
})
