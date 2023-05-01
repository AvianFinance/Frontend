/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	productionBrowserSourceMaps: true,
	experimental: {
		outputStandalone: true,
	},	
};

module.exports = nextConfig;
