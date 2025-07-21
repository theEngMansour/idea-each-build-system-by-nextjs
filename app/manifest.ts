import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Next.js PWA",
        short_name: "NextPWA",
        description: "A Progressive Web App built with Next.js",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
            {
                src: "/web-app-manifest-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icon512_maskable.png",
                sizes: "512x512",
                type: "image/png",
            },

        ],
        screenshots: [
            {
                "src": "screenshot1.jpg",
                "type": "image/jpg",
                "sizes": "1080x1920",
                "form_factor": "narrow"
            },
            {
                "src": "screenshot2.jpg",
                "type": "image/jpg",
                "sizes": "1080x1920",
                "form_factor": "narrow"
            },
            {
                "src": "screenshot3.jpg",
                "type": "image/jpg",
                "sizes": "1080x1920",
                "form_factor": "wide"
            }
        ]
    }
}