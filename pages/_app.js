import { NextUIProvider } from '@nextui-org/react'
import 'rsuite/dist/rsuite.min.css'

import 'styles/globals.css'

import withLayout from 'features/layout'

function MyApp({ Component, pageProps }) {
  const page = <Component {...pageProps} />
  const { features = {} } = Component
  const { layout = {} } = features
  return (
      <NextUIProvider>
        {withLayout(page, layout)}
      </NextUIProvider>
  )
}

export default MyApp
