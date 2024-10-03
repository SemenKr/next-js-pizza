/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'media.dodostatic.net',
				pathname: '/**', // Это позволяет загружать любые изображения с этого домена
			},
		],
	},
};

export default nextConfig;
