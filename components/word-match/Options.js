import React from 'react'
import { observer } from 'mobx-react-lite'
import {
    Checkbox, Radio, Text,
} from '@nextui-org/react'
import {
    Uploader,
} from 'rsuite'
import { Icon } from '@rsuite/icons'
import { SiMicrosoftexcel } from 'react-icons/si'

import Actions from './Actions'
import FileStore from './FileStore'
import OptionStore from './OptionStore'

const radioCss = {
    alignItems: 'center',
    flexWrap: 'wrap',
}

const setFile = (files) => {
    FileStore.setFile(files)
}

const ImportLexicon = () => (
    <div className="import">
        <Uploader
            accept=".xls,.xlsx"
            action="/"
            autoUpload={false}
            fileList={FileStore.files}
            listType="text"
            multiple={false}
            onChange={setFile}
        >
            <button>
                <Icon as={SiMicrosoftexcel} size="3em" style={{ color: '#1D6F42' }} /> 导入词库
            </button>
        </Uploader>
        {/* language=CSS */}
        <style jsx>{`
            .import :global(.rs-uploader input) {
                width: 0;
            }
        `}</style>
    </div>
)

export default observer(function Options() {
    const {
        count, size, sheets,
        setCount, setSize, setSheets,
    } = OptionStore
    return (
        <>
            <ImportLexicon />
            <Text color="error">请选择出题范围</Text>
            {FileStore.sheets.length > 0 && (
                <Checkbox.Group
                    onChange={(val) => setSheets(val)}
                    size="sm"
                    value={sheets}
                >
                    {FileStore.sheets.map(({ id, name }) => <Checkbox key={id} value={id}>{name}</Checkbox>)}
                </Checkbox.Group>
            )}
            <Actions />
            <Text>单词数</Text>
            <Radio.Group
                onChange={(val) => setCount(val)}
                row
                value={count}
                css={radioCss}
            >
                <Radio value={3}>3</Radio>
                <Radio value={5}>5</Radio>
                <Radio value={10}>10</Radio>
                <Radio value={15}>15</Radio>
                <Radio value={20}>20</Radio>
            </Radio.Group>
            <Text>单词字号</Text>
            <Radio.Group
                onChange={(val) => setSize(val)}
                row
                value={size}
                css={radioCss}
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
