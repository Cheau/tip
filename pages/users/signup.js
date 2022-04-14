import React from 'react'

import Signup from 'components/users/signup'

export default function signup() {
    return (
        <div className="page">
            <div className="main">
                <Signup />
            </div>
            {/* language=CSS */}
            <style jsx global>{`
                html, body, #__next {
                    height: 100%;
                    background: #eaeaea;
                }
            `}</style>
            {/* language=CSS */}
            <style jsx>{`
                .page {
                    text-align: center;
                }
                .main {
                    display: inline-block;
                    width: 500px;
                    margin-top: 100px;
                    text-align: left;
                }
                .main :global(.rs-panel) {
                    background: white;
                }
            `}</style>
        </div>
    )
}
