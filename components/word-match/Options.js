import React from 'react'
import { observer } from 'mobx-react-lite'
import {
    Checkbox,
    CheckboxGroup,
    Divider,
    Form,
    InputNumber,
    Slider,
    Uploader,
} from 'rsuite'
import { Icon } from '@rsuite/icons'
import { SiMicrosoftexcel } from 'react-icons/si'

import Actions from './Actions'
import FileStore from './FileStore'
import OptionStore from './OptionStore'

const setFile = (files) => {
    FileStore.setFile(files)
}

export default observer(function Options() {
    const { files } = FileStore
    const {
        count, fontSize, sheets,
        setCount, setFontSize, setSheets,
    } = OptionStore
    return (
        <Form fluid>
            <Form.Group>
                <Uploader
                    accept=".xls,.xlsx"
                    action="/"
                    autoUpload={false}
                    fileList={files}
                    listType="picture-text"
                    multiple={false}
                    onChange={setFile}
                >
                    <button>
                        <Icon as={SiMicrosoftexcel} size="3em" style={{ color: '#1D6F42' }} /> 导入词库
                    </button>
                </Uploader>
            </Form.Group>
            {FileStore.sheets.length > 0 && (
                <Form.Group>
                    <Form.ControlLabel>出题范围</Form.ControlLabel>
                    <Form.Control
                        accepter={CheckboxGroup}
                        name="sheets"
                        onChange={(val) => setSheets(val)}
                        value={sheets}
                    >
                        {FileStore.sheets.map(({ id, name }) => <Checkbox key={id} value={id}>{name}</Checkbox>)}
                    </Form.Control>
                </Form.Group>
            )}
            <Actions />
            <Divider />
            <Form.Group>
                <Form.ControlLabel>单词数</Form.ControlLabel>
                <Form.Control
                    accepter={InputNumber}
                    min={1}
                    name="count"
                    onChange={(val) => setCount(val)}
                    value={count}
                />
            </Form.Group>
            <Form.Group>
                <Form.ControlLabel>单词字号</Form.ControlLabel>
                <Form.Control
                    accepter={Slider}
                    graduated={true}
                    max={36}
                    min={16}
                    name="fs"
                    onChange={(val) => setFontSize(val)}
                    progress
                    renderMark={(mark) => mark}
                    step={2}
                    value={Number(fontSize.slice(0, fontSize.length - 2))}
                />
            </Form.Group>
        </Form>
    )
})
