import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

const appUrl = `https://eden-foundation.vercel.app/`;
const title = `Eden protocol`;
const description = `Together, let's build the perfect breeding ground for everyone to do work they love. Eden's talent coordination protocol is how.`;

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="apple-touch-icon" sizes="192x192" href="/icon192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/logo32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/logo16.png" />
          <meta property="og:url" content={appUrl} />
          <meta property="og:site_name" content={`Eden protocol`} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta
            property="og:image"
            content={`https://twitter.com/edenprotocolxyz/photo`}
          />
          <meta property="og:image:width" content="400" />
          <meta property="og:image:height" content="400" />

          <meta property="twitter:card" content="summary" />
          <meta property="twitter:site" content={`Eden protocol`} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
          <meta
            property="twitter:image:src"
            content={`https://twitter.com/edenprotocolxyz/photo`}
          />
          <meta property="twitter:image:width" content="400" />
          <meta property="twitter:image:height" content="400" />
          <meta property="twitter:creator" content={`Eden protocol`} />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins&display=optional"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
