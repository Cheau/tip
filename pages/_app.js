import 'rsuite/dist/rsuite.min.css'

import 'styles/globals.css'

import withLayout from 'features/layout'

function MyApp({ Component, pageProps }) {
  const page = <Component {...pageProps} />
  const { features = {} } = Component
  const { layout = {} } = features
  return withLayout(page, layout)
}

export default MyApp
