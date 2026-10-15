// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactStrictMode: true,
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true, // genera carpeta/index.html: evita choques trabajo.html vs trabajo/ en GitHub Pages
  images: {
    unoptimized: true // importante si usas <Image />
  },
  eslint: {
    ignoreDuringBuilds: true // opcional, evita errores de lint en producción
  }
}

module.exports = nextConfig