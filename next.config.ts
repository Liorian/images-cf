import type {NextConfig} from "next";

// Next.js 配置对象
const nextConfig: NextConfig = {
    // 图片相关配置
    images: {
        // 远程图片域名白名单配置
        remotePatterns: [
            {
                protocol: 'https', // 允许的协议
                hostname: 'api.dicebear.com', // 允许的域名
                pathname: '/9.x/**', // 允许的路径模式 (** 表示任意路径)
            },
            {
                protocol: 'https',
                hostname: 'cdn.lhao.org',
                pathname: '/images/**',
            },
        ],
        // 允许使用 SVG 图片 (默认情况下 Next.js 会阻止 SVG 以防止 XSS 攻击)
        dangerouslyAllowSVG: true,
        // 设置 Content-Disposition 响应头为 attachment
        // 这表示浏览器会将图片作为附件处理而不是直接显示
        // contentDispositionType: 'attachment',
        // 设置内容安全策略 (CSP)
        // default-src 'self': 只允许加载来自同源的资源
        // script-src 'none': 禁止执行任何脚本
        // sandbox: 启用最严格的沙箱限制
        // contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
};

export default nextConfig;
