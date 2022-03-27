import React from 'react'
import { observer } from 'mobx-react-lite'
import TimeIcon from '@rsuite/icons/Time'

import TimerStore from './TimerStore'

export default observer(function Timer() {
    const { text } = TimerStore
    return (
        <div className="timer">
            <TimeIcon />&nbsp;{text}
            {/* language=CSS */}
            <style jsx>{`
                .timer {
                    display: flex;
                    align-items: center;
                    color: #808080;
                    font-variant-numeric: tabular-nums;
                }
            `}</style>
        </div>
    )
})
