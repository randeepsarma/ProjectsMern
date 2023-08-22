/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        domains: ['ecommerce-web-project.s3.ap-south-1.amazonaws.com'],
      },
    

}

module.exports = nextConfig
