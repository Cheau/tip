import { observer } from 'mobx-react-lite'
import {
    Nav,
    Navbar,
} from 'rsuite'
import { Gear } from '@rsuite/icons'

import OptionPanel from './OptionPanel'
import Store from './Store'

const Layout = observer(function Component({ layout, page }) {
    const { options } = layout
    const { setOpen } = Store
    return (
        <div className="layout">
            <Navbar style={{ background: 'white' }}>
                <Navbar.Brand href="/">TIP</Navbar.Brand>
                <Nav pullRight>
                    {options && <Nav.Item icon={<Gear />} onClick={() => setOpen(true)}>设置</Nav.Item>}
                </Nav>
            </Navbar>
            {page}
            <OptionPanel>{options}</OptionPanel>
        </div>
    )
})

const withLayout = (page, layout) => <Layout layout={layout} page={page} />

export default withLayout
