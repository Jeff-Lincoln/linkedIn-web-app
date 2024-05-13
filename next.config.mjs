/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'links.papareact.com',
            },
            {
                protocol: 'https',
                hostname: 'linkedinClone.blob.core.windows.net',
                port: '443',
                pathname: '/api/links',
            }
        ]
    }
};

export default nextConfig;
