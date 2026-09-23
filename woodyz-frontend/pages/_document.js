import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Woodyz Design Fonts */}
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,900&f[]=satoshi@400,500,700&display=swap"
        />
        {/* Iconify for Icons */}
        <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js" defer></script>
        <meta name="theme-color" content="#3A322B" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
