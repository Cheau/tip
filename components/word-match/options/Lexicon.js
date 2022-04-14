import React from 'react'
import { Uploader } from 'rsuite'
import { Icon } from '@rsuite/icons'
import { SiMicrosoftexcel } from 'react-icons/si'

import FileStore from '../FileStore'

const setFile = (files) => {
    FileStore.setFile(files)
}

export default function Lexicon() {
    return (
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
}
