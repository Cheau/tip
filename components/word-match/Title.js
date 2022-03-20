import React from 'react'

export default function Title() {
    return (
        <div className="title">
            <h2>单词消消乐</h2>
            <h5>请点击题目下的单词及对应含义来消除</h5>
            {/* language=CSS */}
            <style jsx>{`
                .title {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                }
            `}</style>
        </div>
    )
}
