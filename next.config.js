// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
        return [
        {
            source: '/api/:path*',
            destination:
            process.env.NODE_ENV === 'development'
                ? 'https://ask-your-dost.vercel.app/api/:path*'
                : '/api/',
        },
        ]
  },
}

module.exports = nextConfig
