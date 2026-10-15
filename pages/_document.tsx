import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased" id="top">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
