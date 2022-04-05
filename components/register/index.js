import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import {
    Button,
    ButtonToolbar,
    Form,
    Panel,
    Schema,
} from 'rsuite'

const model = Schema.Model({
    email: Schema.Types.StringType().isEmail().isRequired(),
    name: Schema.Types.StringType().isRequired(),
    password: Schema.Types.StringType().isRequired(),
    rePassword: Schema.Types.StringType().isRequired(),
})

const submit = async (form) => {
    const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
    })
    const user = await res.json()
    console.log(user)
}

export default observer(function Register() {
    const [form, setForm] = useState({
        email: '',
        name: '',
        password: '',
        rePassword: '',
    })
    return <Panel header="注册新用户" bordered shaded>
        <Form fluid formValue={form} model={model} onChange={setForm}>
            <Form.Group controlId="name">
                <Form.ControlLabel>用户名</Form.ControlLabel>
                <Form.Control name="name" autoComplete="off" />
            </Form.Group>
            <Form.Group controlId="email">
                <Form.ControlLabel>电子邮箱</Form.ControlLabel>
                <Form.Control name="email" />
            </Form.Group>
            <Form.Group controlId="password">
                <Form.ControlLabel>密码</Form.ControlLabel>
                <Form.Control name="password" type="password" autoComplete="off" />
            </Form.Group>
            <Form.Group controlId="rePassword">
                <Form.ControlLabel>再次输入密码</Form.ControlLabel>
                <Form.Control name="rePassword" type="password" autoComplete="off" />
            </Form.Group>
            <Form.Group>
                <ButtonToolbar>
                    <Button appearance="primary" onClick={() => submit(form)}>提交</Button>
                    <Button appearance="default">重置</Button>
                </ButtonToolbar>
            </Form.Group>
        </Form>
    </Panel>
})
