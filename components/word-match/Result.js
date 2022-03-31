import React from 'react'
import { observer } from 'mobx-react-lite'
import {
    Button, Col, Divider, Modal, Panel, Progress, Row,
} from 'rsuite'

import TimerStore from './TimerStore'
import WordStore from './WordStore'

const Chart = ({ percent, text, title }) => (
    <div className="chart">
        <Panel bordered shaded>
            <div className="title">{title}</div>
            {percent && <Progress.Circle percent={percent} />}
            {text && <div className="text">{text}</div>}
        </Panel>
        {/* language=CSS */}
        <style jsx>{`
            .chart {
                display: inline-block;
                width: 150px;
            }
            .title {
                margin-bottom: 10px;
                font-size: 20px;
                font-weight: bold;
                text-align: center;
            }
        `}</style>
    </div>
)

export default observer(function Result() {
    const { text } = TimerStore
    const { subject: {
        accuracy, result, setShow, show,
    } } = WordStore
    return (
        <Modal open={show}>
            <Modal.Header>
                <Modal.Title>我的成绩<Divider vertical />词数：{result.length}，用时：{text}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xs={24} style={{ textAlign: 'center' }}>
                        <Chart percent={accuracy} title="准确率" />
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setShow(false)} appearance="primary">
                    好
                </Button>
            </Modal.Footer>
        </Modal>
    )
})
