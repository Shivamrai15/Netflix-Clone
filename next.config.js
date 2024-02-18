/** @type {import('next').NextConfig} */
const nextConfig = {
    images :{
        unoptimized : true,
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'utfs.io',
            },
        ],
    }
}

module.exports = nextConfig
