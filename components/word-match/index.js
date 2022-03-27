import React from 'react'
import { observer } from 'mobx-react-lite'

import Answer from './Answer'
import FileStore from './FileStore'
import Options from './Options'
import Subject from './Subject'
import Title from './Title'
import './Controller'

const WordMatch = observer(function Page({ sheets }) {
    FileStore.setSheets(sheets, false)
    return (
        <>
            <div className="title"><Title /></div>
            <div className="main">
                <div className="subject"><Subject /></div>
                <div className="answer"><Answer /></div>
            </div>
            {/* language=CSS */}
            <style jsx global>{`
                html, body, #__next {
                    height: 100%;
                }
            `}</style>
            {/* language=CSS */}
            <style jsx>{`
                .title {
                    height: 150px;
                    padding: 10px;
                    background: black;
                    color: white;
                }
                .main {
                    display: flex;
                    flex-direction: column;
                    height: calc(100% - 150px);
                }
                .subject, .answer {
                    padding: 10px;
                }
                .answer {
                    border-top: 1px solid #ccc;
                }
            `}</style>
        </>
    )
})

export default WordMatch

WordMatch.features = {
    layout: {
        options: <Options />,
    }
}
