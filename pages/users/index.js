import React from 'react'
import {
    Table,
} from 'rsuite'

import prisma from 'lib/prisma'

const { Cell, Column, HeaderCell } = Table

const headers = Object.entries({
    name: '用户名',
    email: '电子邮箱',
    createdAt: '创建时间',
    updatedAt: '更新时间',
})

export default function Users({ users }) {
    return (
        <Table data={users}>
            {headers.map(([key, name]) => (
                <Column key={key} width={200}>
                    <HeaderCell>{name}</HeaderCell>
                    <Cell dataKey={key} />
                </Column>
            ))}
        </Table>
    )
}

export const getStaticProps = async () => {
    const res = await prisma.user.findMany()
    const users = res.map(({
           createdAt, updatedAt, password, ...rest
   }) => ({
        ...rest,
        createdAt: createdAt.toJSON(),
        updatedAt: updatedAt.toJSON(),
    }))
    return { props: { users } }
}
