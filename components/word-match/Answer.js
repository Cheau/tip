import React from 'react'
import { observer } from 'mobx-react-lite'

import OptionStore from './OptionStore'
import WordStore from './WordStore'

export default observer(function Answer() {
    const { fontSize } = OptionStore
    const { result } = WordStore
    return (
        <div className="result">
            <h2 className="header">答案</h2>
            {result.map((item) => (
                <div key={item.id} className="item">{item.text}: {item.meaning}</div>
            ))}
            {/* language=CSS */}
            <style jsx>{`
                .result {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .result :global(.item) {
                    width: 90%;
                    margin-top: 10px;
                    padding: 10px;
                    background: rgba(0, 128, 0, 0.2);
                    border: 1px solid green;
                    font-size: ${fontSize};
                }
            `}</style>
        </div>
    )
})