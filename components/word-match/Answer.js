import React from 'react'
import { observer } from 'mobx-react-lite'
import {
    Col, Panel, Row,
} from 'rsuite'

import OptionStore from './OptionStore'
import WordStore from './WordStore'

const Word = ({ text, meaning }) => (
    <Panel bordered header={text} shaded>
        {meaning}
    </Panel>
)

export default observer(function Answer() {
    const { fontSize } = OptionStore
    const { result } = WordStore
    return (
        <div className="result">
            <h3 className="header">答案</h3>
            <Row gutter={10}>
                {result.map((item) => <Col key={item.id} lg={8} md={12} sm={24}><Word {...item} /></Col>)}
            </Row>
            {/* language=CSS */}
            <style jsx>{`
                .result {
                    margin: 10px;
                    margin-top: 0;
                }
                .header {
                    text-align: center;
                }
                .result :global(.rs-col) {
                    padding: 10px;
                }
                .result :global(.rs-panel-header) {
                    font-size: ${fontSize};
                }
            `}</style>
        </div>
    )
})
