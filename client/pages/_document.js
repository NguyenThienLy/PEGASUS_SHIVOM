import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="vi">
        <Head>
          <style>{`body { margin: 0 } /* custom! */`}</style>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-80582137-5"
          ></script>
          <script
            src="https://code.jquery.com/jquery-3.4.1.js"
            integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
            crossorigin="anonymous"></script>
          <script src="https://cdn.tiny.cloud/1/tlt647bhgwv17djd3zlimks0k38mgbeuhppgf1uz2wjiwjdi/tinymce/5/tinymce.min.js"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments); }
                        gtag('js', new Date());
                      
                        gtag('config', 'UA-80582137-5');`
            }}
          />
          <script src="https://js.api.here.com/v3/3.1/mapsjs-core.js"
            type="text/javascript" charset="utf-8"></script>
          <script src="https://js.api.here.com/v3/3.1/mapsjs-service.js"
            type="text/javascript" charset="utf-8"></script>
          <script type="text/javascript" src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js"></script>
          <script type="text/javascript" src="https://js.api.here.com/v3/3.1/mapsjs-ui.js"></script>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/bookFeeling.jpg" />
          <link rel="stylesheet" type="text/css" href="/css/nprogress.css" />
          <link rel="stylesheet" type="text/css" href="/css/tippy.css" />
          <link rel="stylesheet" type="text/css" href="/css/dayPicker.css" />
          <link
            rel="https://fonts.googleapis.com/css?family=Merriweather:400,700"
            media="screen"
          />

          <link
            href="https://fonts.googleapis.com/css?family=Merriweather|Montserrat"
            rel="stylesheet"
            media="screen"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
            integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay"
            crossorigin="anonymous"
            media="screen"
          />

          <link
            href="https://fonts.googleapis.com/css?family=Roboto"
            rel="stylesheet"
            media="screen"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.min.css"
          ></link>
          {/* <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          /> */}
        </Head>
        <body className="custom_class">
          <script
            src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
            integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
            crossOrigin="anonymous"
          />
          <script
            src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.min.js"
            type="text/javascript"
          ></script>
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
            integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
            crossOrigin="anonymous"
          />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0/dist/Chart.min.js"></script>
          <script src="https://cloud.tinymce.com/5/tinymce.min.js?apiKey=nxw3p5ckcu5jx187f8q2w3ysytehc7mdor1gcic8zu1iq5pv"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js"></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
