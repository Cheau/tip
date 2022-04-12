import Document, {
    Html, Head, Main, NextScript,
} from 'next/document'
import { CssBaseline } from '@nextui-org/react'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const originalRenderPage = ctx.renderPage

        ctx.renderPage = () => originalRenderPage({
            enhanceApp: (App) => App,
            enhanceComponent: (Component) => Component,
        })

        const initialProps = await Document.getInitialProps(ctx)

        return {
            ...initialProps,
            styles: <>{initialProps.styles}</>,
        }
    }
    render() {
        return (
            <Html lang="zh-CN">
                <Head>
                    {CssBaseline.flush()}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument

