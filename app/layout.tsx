import type React from "react"
import type { Metadata } from "next"
import { Play, Orbitron } from "next/font/google"
import "./globals.css"

const play = Play({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-play",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
})

export const metadata: Metadata = {
  title: "Daggerheart Character Sheet",
  description: "A cyberpunk-styled character sheet for Daggerheart RPG",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${play.variable} ${orbitron.variable} antialiased`}
    >
      <body className="cyberpunk-grid min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 font-sans">
        {children}
      </body>
    </html>
  )
}
