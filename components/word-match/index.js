import React from 'react'
import { observer } from 'mobx-react-lite'

import Answer from './Answer'
import FileStore from './FileStore'
import OptionPanel from './OptionPanel'
import Subject from './Subject'
import Title from './Title'
import './Controller'

export default observer(function WordMatch({ sheets }) {
    FileStore.setSheets(sheets, false)
    return (
        <>
            <div className="title"><Title /></div>
            <div className="main">
                <div className="subject"><Subject /></div>
                <div className="answer"><Answer /></div>
            </div>
            <OptionPanel />
            {/* language=CSS */}
            <style jsx global>{`
                html, body, #__next {
                    height: 100%;
                }
            `}</style>
            {/* language=CSS */}
            <style jsx>{`
                .title {
                    height: 120px;
                    margin: 10px;
                }
                .main {
                    display: flex;
                    height: calc(100% - 150px);
                }
                .subject, .answer {
                    display: inline-block;
                    height: 100%;
                    padding: 10px;
                }
                .subject {
                    width: 60%;
                }
                .answer {
                    width: 40%;
                    border-left: 1px solid #ccc;
                }
                @media screen and (max-width: 767px) {
                    .main {
                        flex-direction: column;
                    }
                    .subject, .answer {
                        display: block;
                        height: unset;
                    }
                    .subject {
                        width: 100%;
                    }
                    .answer {
                        width: 100%;
                        border-top: 1px solid #ccc;
                        border-left: none;
                    }
                }
            `}</style>
        </>
    )
})
