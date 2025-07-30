import process from "node:process"
import type { VitePWAOptions } from "vite-plugin-pwa"
import { VitePWA } from "vite-plugin-pwa"

const pwaOption: Partial<VitePWAOptions> = {
  base: '/news/',
  includeAssets: ["icon.svg", "apple-touch-icon.png"],
  filename: "swx.js",
  manifest: {
    name: "NewsNow",
    short_name: "NewsNow",
    description: "Elegant reading of real-time and hottest news",
    theme_color: "#F14D42",
    start_url: "/news/",
    // 设置正确的 scope
    scope: "/news/",
    icons: [
      {
        src: "/news/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/news/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/news/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/news/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  },
  workbox: {
    navigateFallbackDenylist: [/^\/api/, /^\/news\/api/],
  },
  devOptions: {
    enabled: process.env.SW_DEV === "true",
    type: "module",
    navigateFallback: "/news/index.html",
  },
}

export default function pwa() {
  return VitePWA(pwaOption)
}
