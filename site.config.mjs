// 站点级共享配置：GitHub Pages 部署的 basePath 与静态资源前缀。
// next.config.mjs 与 app/ 下的代码共用同一份定义，避免两处硬编码路径不同步。
const isProd = process.env.NODE_ENV === 'production'

export const BASE_PATH = isProd ? '/zyrresume' : ''

// 注意：images.unoptimized === true 时，next/image 不会自动为本地 src
// 拼接 basePath（它只原样透传 src），所以这里需要手动带上 BASE_PATH。
export const ASSET_PREFIX = `${BASE_PATH}/assets/`
