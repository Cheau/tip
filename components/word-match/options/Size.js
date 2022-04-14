import React from 'react'
import { observer } from 'mobx-react-lite'
import {
    Radio, Text,
} from '@nextui-org/react'

import OptionStore from '../OptionStore'

const radioCss = {
    alignItems: 'center',
    flexWrap: 'wrap',
}

export default observer(function Size() {
    const { size, setSize } = OptionStore
    return (
        <>
            <Text>单词字号</Text>
            <Radio.Group
                css={radioCss}
                onChange={(val) => setSize(val)}
                row
                value={size}
            >
                <Radio size="xs" value={14}>14</Radio>
                <Radio size="sm" value={16}>16</Radio>
                <Radio size="md" value={20}>20</Radio>
                <Radio size="lg" value={24}>24</Radio>
                <Radio size="xl" value={28}>28</Radio>
            </Radio.Group>
        </>
    )
})
