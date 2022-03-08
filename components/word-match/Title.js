import React from 'react'

export default function Title() {
    return (
        <div className="title">
            <h1>单词连连看</h1>
            <h4>请点击题目下的单词及对应含义来进行关联</h4>
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
