/**
 * fork 补丁：让演示站在任意子路径（如 GitHub Pages 的 /file-viewer/）下也能加载文件。
 *
 * 上游默认部署在域名根路径，示例与资源地址多为 `/example/...` 这类根绝对路径；
 * 子路径部署时浏览器会请求到域名根导致 404。这里把同站根绝对路径改写为相对路径，
 * 由浏览器按页面所在目录解析；在根路径部署时行为不变。
 * 非浏览器环境（Node 单测）保持原样，避免影响上游测试。
 */
const ABSOLUTE_URL_RE = /^[a-z][a-z\d+\-.]*:/i

export const resolveDemoPublicUrl = (target: string): string => {
  if (!target || typeof document === 'undefined') return target
  if (ABSOLUTE_URL_RE.test(target) || target.startsWith('//') || target.startsWith('#')) {
    return target
  }
  if (!target.startsWith('/')) return target
  const cut = target.search(/[?#]/)
  const path = cut < 0 ? target : target.slice(0, cut)
  const suffix = cut < 0 ? '' : target.slice(cut)
  return `${path.slice(1)}${suffix}`
}
