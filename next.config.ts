import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				hostname: "source.unsplash.com",
			},
			{
				hostname: "images.pexels.com",
			},
		],
	},
};

export default nextConfig;
