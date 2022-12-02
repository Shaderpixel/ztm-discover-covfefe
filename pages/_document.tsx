import Document, {Html, Main, NextScript, Head} from 'next/document'

class MyDocument extends Document {
  render() {
    return <Html lang="en">
      <Head>
        <link rel='preload' href="/fonts/Roboto-Regular.woff2" as='font/woff2' crossOrigin='anonymous' fetchpriority="high" />
        <link rel='preload' href="/fonts/Roboto-Medium.woff2" as='font/woff2' crossOrigin='anonymous' />
        <link rel='preload' href="/fonts/Roboto-Bold.woff2" as='font/woff2' crossOrigin='anonymous' />
        <link rel='preload' href="/fonts/Roboto-Italic.woff2" as='font/woff2' crossOrigin='anonymous' />
      </Head>
      <body>
        <Main></Main>
        <NextScript />
      </body>
    </Html>;
  }
}

export default MyDocument;