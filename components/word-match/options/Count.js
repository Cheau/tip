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

export default observer(function Count() {
    const { count, setCount } = OptionStore
    return (
        <>
            <Text>单词数</Text>
            <Radio.Group
                css={radioCss}
                onChange={(val) => setCount(val)}
                row
                value={count}
            >
                <Radio value={3}>3</Radio>
                <Radio value={5}>5</Radio>
                <Radio value={10}>10</Radio>
                <Radio value={15}>15</Radio>
                <Radio value={20}>20</Radio>
            </Radio.Group>
        </>
    )
})
