/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
    ],
    // A few insurer/TPA logos in public/images/insurers are SVGs sourced at build time
    // (Wikimedia Commons / official sites), not user-uploaded — safe to optimize, but the
    // CSP is set anyway per Next.js' own recommendation whenever SVG optimization is enabled.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
