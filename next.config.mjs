import { BASE_PATH } from './site.config.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH ? `${BASE_PATH}/` : '',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
