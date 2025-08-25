import { DaggerheartCharacterSheet } from "@/components/daggerheart-character-sheet"

export default function Home() {
  return (
    <main className="cyber-grid dark min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#050508] p-4">
      <div className="mx-auto max-w-7xl">
        <DaggerheartCharacterSheet />
      </div>
    </main>
  )
}
