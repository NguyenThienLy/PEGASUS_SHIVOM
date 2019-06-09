import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="vi">
                <Head>
                    <style>{`body { margin: 0 } /* custom! */`}</style>
                    <script src="https://cdn.lr-ingest.io/LogRocket.min.js" crossorigin="anonymous"></script>
                    <script>window.LogRocket && window.LogRocket.init('jdlvjk/book_review');</script>
                    <link href="https://fonts.googleapis.com/css?family=Merriweather|Montserrat" rel="stylesheet" media="screen" disabled />
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous" media="screen" disabled />
                    <link
                        rel="stylesheet"
                        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
                        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
                        crossorigin="anonymous"
                        media="screen" disabled
                    />
                    <link
                        href="https://fonts.googleapis.com/css?family=Roboto"
                        rel="stylesheet"
                        media="screen" disabled
                    />
                    <meta
                        name="viewport"
                        content="initial-scale=1.0, width=device-width"
                    />
                </Head>
                <body className="custom_class">
                    <script
                        src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
                        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
                        crossOrigin="anonymous"
                    />
                    <script
                        src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
                        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
                        crossOrigin="anonymous"
                    />

                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument