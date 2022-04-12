import React from 'react'
import { observer } from 'mobx-react-lite'
import { IoTimeOutline } from 'react-icons/io5'

import TimerStore from './TimerStore'

export default observer(function Timer() {
    const { pending, text } = TimerStore
    if (pending) return null
    return (
        <div className="timer">
            <IoTimeOutline />&nbsp;{text}
            {/* language=CSS */}
            <style jsx>{`
                .timer {
                    display: flex;
                    align-items: center;
                    height: 100%;
                    line-height: 100%;
                    color: #808080;
                    font-size: 80%;
                    font-variant-numeric: tabular-nums;
                }
            `}</style>
        </div>
    )
})
