import React from 'react'
import { observer } from 'mobx-react-lite'
import {
    Button,
    ButtonToolbar,
    Checkbox,
    CheckboxGroup,
    Divider,
    Drawer,
    Form,
    IconButton,
    InputNumber,
    Slider,
    Uploader,
} from 'rsuite'
import { Icon, Gear } from '@rsuite/icons'
import { SiMicrosoftexcel } from 'react-icons/si'

import Actions from './Actions'
import FileStore from './FileStore'
import OptionStore from './OptionStore'

const setFile = (files) => {
    FileStore.setFile(files)
}

export default observer(function OptionPanel() {
    const {
        files,
    } = FileStore
    const {
        count, fontSize, open, sheets,
        setCount, setFontSize, setOpen, setSheets,
    } = OptionStore
    return (
        <>
            <div className="gear">
                <IconButton
                    appearance="primary"
                    circle
                    color="blue"
                    icon={<Gear />}
                    onClick={() => setOpen(true)}
                    size="lg"
                />
            </div>
            <Drawer open={open} size="xs" onClose={() => setOpen(false)}>
                <Drawer.Header>
                    <Drawer.Title>设置</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body style={{ padding: '30px' }}>
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
                    </Form>
                    <Actions />
                    <Divider />
                    <Form fluid>
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
                </Drawer.Body>
            </Drawer>
            {/* language=CSS */}
            <style jsx>{`
                .gear {
                    display: inline-block;
                    position: fixed;
                    right: 40px;
                    bottom: 40px;
                }
            `}</style>
        </>
    )
})
