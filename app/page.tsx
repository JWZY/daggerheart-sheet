import { DaggerheartCharacterSheet } from "@/components/daggerheart-character-sheet"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#050508] cyber-grid p-4 dark">
      <div className="max-w-7xl mx-auto">
        <DaggerheartCharacterSheet />
      </div>
    </main>
  )
}
