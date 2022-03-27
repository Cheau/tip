import React from 'react'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'

import Actions from './Actions'
import Timer from './Timer'
import OptionStore from './OptionStore'
import WordStore from './WordStore'

const itemNames = (item, field, errors, anchor = {}) => {
    const { id } = item
    return classNames('item', {
        anchor: field === anchor.field && id === anchor.id,
        error: errors.has(id) && field === errors.get(id).field
    })
}

const List = observer(({ words, field = 'text' }) => {
    const { pick, subject: { anchor, errors } } = WordStore
    return words.map((item) => (
        <div key={item.id} className={itemNames(item, field, errors, anchor)} onClick={() => pick(item, field)}>
            {item[field]}
        </div>
    ))
})

export default observer(function Subject() {
    const { fontSize } = OptionStore
    const { source, target } = WordStore
    return (
        <div className="subject">
            <h3>题目</h3>
            <div className="timer"><Timer /></div>
            <div className="lists">
                <div className="list source">
                    <List words={source} />
                </div>
                <div className="list target">
                    <List words={target} field="meaning" />
                </div>
            </div>
            {source.length === 0 && <Actions />}
            {/* language=CSS */}
            <style jsx>{`
                .subject {
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    align-items: center;
                }
                .timer {
                    position: absolute;
                    top: 0;
                    right: 0;
                    font-size: 28px;
                    height: 42px;
                }
                .lists {
                    display: flex;
                    width: 100%;
                }
                
                .list {
                    display: inline-block;
                    width: 50%;
                    text-align: center;
                }

                .list :global(.item) {
                    margin: 10px;
                    padding: 10px;
                    background: #eaeaea;
                    border: 1px solid transparent;
                    font-size: ${fontSize};
                }

                .list :global(.item:hover) {
                    border-color: #0070f3;
                }

                .list :global(.anchor) {
                    background: rgba(0, 112, 243, 0.2);
                    border-color: #0070f3;
                }

                .list :global(.error), .list :global(.error:hover) {
                    background: rgba(255, 0, 0, 0.2);
                    border-color: #ff0000;
                }
            `}</style>
        </div>
    )
})
