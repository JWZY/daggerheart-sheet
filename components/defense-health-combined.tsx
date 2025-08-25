import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, X } from "lucide-react"
import type { CharacterData } from "./daggerheart-character-sheet"

interface DefenseHealthProps {
  character: CharacterData
  updateCharacter: (updates: Partial<CharacterData>) => void
  updateHP: (value: number) => void
  updateStress: (value: number) => void
  setCharacter: React.Dispatch<React.SetStateAction<CharacterData>>
  isEditMode: boolean
}

export function DefenseHealthCombined({
  character,
  updateCharacter,
  updateHP,
  updateStress,
  setCharacter,
  isEditMode,
}: DefenseHealthProps) {
  return (
    <Card className="cyber-border bg-gradient-to-r from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 font-mono tracking-wide text-[#00ffff]">
          <Shield className="cyber-glow-magenta h-6 w-6" />
          DEFENSES & HEALTH
        </CardTitle>
      </CardHeader>
      <CardContent className={isEditMode ? "space-y-4" : "space-y-6"}>
        {isEditMode ? (
          // Edit Mode: Clean 3-row layout
          <div className="space-y-4">
            {/* Row 1: Evasion & Armor */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-mono text-xs text-[#00ffff]">
                  EVASION
                </Label>
                <Input
                  type="number"
                  value={character.evasion}
                  onChange={(e) =>
                    updateCharacter({
                      evasion: Number.parseInt(e.target.value) || 0,
                    })
                  }
                  className="cyber-input text-center font-sans text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-mono text-xs text-[#00ffff]">
                  ARMOR
                </Label>
                <Input
                  type="number"
                  value={character.armorSlots}
                  onChange={(e) =>
                    updateCharacter({
                      armorSlots: Number.parseInt(e.target.value) || 0,
                    })
                  }
                  className="cyber-input text-center font-sans text-sm"
                />
              </div>
            </div>

            {/* Row 2: Max HP & Max Stress */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-mono text-xs text-[#ff0040]">
                  MAX HP
                </Label>
                <Input
                  type="number"
                  value={character.hp.max}
                  onChange={(e) =>
                    setCharacter((prev) => ({
                      ...prev,
                      hp: {
                        ...prev.hp,
                        max: Number.parseInt(e.target.value) || 1,
                      },
                    }))
                  }
                  className="cyber-input text-center font-sans text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-mono text-xs text-[#ff8000]">
                  MAX STRESS
                </Label>
                <Input
                  type="number"
                  value={character.stress.max}
                  onChange={(e) =>
                    setCharacter((prev) => ({
                      ...prev,
                      stress: {
                        ...prev.stress,
                        max: Number.parseInt(e.target.value) || 1,
                      },
                    }))
                  }
                  className="cyber-input text-center font-sans text-sm"
                />
              </div>
            </div>

            {/* Row 3: Minor & Major Thresholds */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-mono text-xs text-[#ff8000]">
                  MINOR THRESHOLD
                </Label>
                <Input
                  type="number"
                  value={character.damageThresholds.minor}
                  onChange={(e) =>
                    updateCharacter({
                      damageThresholds: {
                        ...character.damageThresholds,
                        minor: Number.parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  className="cyber-input text-center font-sans text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-mono text-xs text-[#ff0040]">
                  MAJOR THRESHOLD
                </Label>
                <Input
                  type="number"
                  value={character.damageThresholds.major}
                  onChange={(e) =>
                    updateCharacter({
                      damageThresholds: {
                        ...character.damageThresholds,
                        major: Number.parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  className="cyber-input text-center font-sans text-sm"
                />
              </div>
            </div>
          </div>
        ) : (
          // View Mode
          <>
            {/* Defense Section */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Evasion & Armor */}
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="mb-2 text-xs text-[#00ffff]/70">EVASION</div>
                  <div className="cyber-text font-sans text-3xl font-bold text-[#00ffff]">
                    {character.evasion}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#00ffff]/70">ARMOR</span>
                    <span className="text-sm font-bold text-[#00ffff]">
                      {character.armor}/{character.armorSlots}
                    </span>
                  </div>
                  <div className="flex justify-center gap-1">
                    {Array.from(
                      { length: Math.max(5, character.armorSlots) },
                      (_, i) => {
                        const isActive = i < character.armor
                        const exists = i < character.armorSlots
                        if (!exists) return <div key={i} className="h-6 w-6" />
                        return (
                          <div
                            key={i}
                            className="relative cursor-pointer"
                            onClick={() => {
                              // If clicking the last filled pip, decrease by 1
                              // Otherwise, set to clicked position
                              if (i + 1 === character.armor) {
                                updateCharacter({ armor: i })
                              } else {
                                updateCharacter({ armor: i + 1 })
                              }
                            }}
                          >
                            <Shield
                              className={`h-6 w-6 transition-all ${
                                isActive
                                  ? "text-[#00ffff] drop-shadow-[0_0_4px_rgba(0,255,255,0.8)]"
                                  : "text-gray-600"
                              }`}
                            />
                            {!isActive && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <X className="h-4 w-4 text-red-500" />
                              </div>
                            )}
                          </div>
                        )
                      }
                    )}
                  </div>
                </div>
              </div>

              {/* HP & Stress Pips */}
              <div className="space-y-4">
                {/* HP Pips */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-[#ff0040]">HP</span>
                    <span className="text-xs text-[#ff0040]/70">
                      {character.hp.current}/{character.hp.max}
                    </span>
                  </div>
                  <div
                    className={`grid gap-0.5 ${
                      character.hp.max <= 10
                        ? "grid-cols-10"
                        : character.hp.max <= 15
                          ? "grid-cols-[repeat(15,minmax(0,1fr))]"
                          : character.hp.max <= 20
                            ? "grid-cols-[repeat(20,minmax(0,1fr))]"
                            : "grid-cols-[repeat(auto-fit,minmax(1rem,1fr))]"
                    }`}
                  >
                    {Array.from({ length: character.hp.max }, (_, i) => {
                      const isFilled = i < character.hp.current
                      return (
                        <div
                          key={i}
                          onClick={() => {
                            // If clicking the last filled pip, decrease by 1
                            // Otherwise, set to clicked position
                            if (i + 1 === character.hp.current) {
                              updateHP(i)
                            } else {
                              updateHP(i + 1)
                            }
                          }}
                          className={`h-5 w-5 cursor-pointer rounded-sm border transition-all ${
                            isFilled
                              ? "border-[#ff0040] bg-[#ff0040] hover:bg-[#ff0040]/80"
                              : "border-[#ff0040] bg-transparent hover:bg-[#ff0040]/20"
                          }`}
                        />
                      )
                    })}
                  </div>
                </div>

                {/* Stress Pips */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-[#ff8000]">STRESS</span>
                    <span className="text-xs text-[#ff8000]/70">
                      {character.stress.current}/{character.stress.max}
                    </span>
                  </div>
                  <div
                    className={`grid gap-0.5 ${
                      character.stress.max <= 10
                        ? "grid-cols-10"
                        : character.stress.max <= 15
                          ? "grid-cols-[repeat(15,minmax(0,1fr))]"
                          : character.stress.max <= 20
                            ? "grid-cols-[repeat(20,minmax(0,1fr))]"
                            : "grid-cols-[repeat(auto-fit,minmax(1rem,1fr))]"
                    }`}
                  >
                    {Array.from({ length: character.stress.max }, (_, i) => {
                      const isFilled = i < character.stress.current
                      return (
                        <div
                          key={i}
                          onClick={() => {
                            // If clicking the last filled pip, decrease by 1
                            // Otherwise, set to clicked position
                            if (i + 1 === character.stress.current) {
                              updateStress(i)
                            } else {
                              updateStress(i + 1)
                            }
                          }}
                          className={`h-5 w-5 cursor-pointer rounded-sm border transition-all ${
                            isFilled
                              ? "border-[#ff8000] bg-[#ff8000] hover:bg-[#ff8000]/80"
                              : "border-[#ff8000] bg-transparent hover:bg-[#ff8000]/20"
                          }`}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Damage Thresholds */}
            <div className="space-y-3">
              <div className="h-16 overflow-hidden rounded-lg border border-[#00ffff]/30 bg-black/50">
                <div className="flex h-full">
                  <div className="flex flex-1 flex-col items-center justify-center border-r-2 border-orange-500 bg-gradient-to-r from-yellow-500/20 to-yellow-500/30">
                    <span className="text-xs font-bold text-yellow-400">
                      MINOR
                    </span>
                    <span className="text-xs text-yellow-400">
                      1-{character.damageThresholds.minor - 1}
                    </span>
                    <span className="text-sm font-bold text-white">
                      Mark 1 HP
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col items-center justify-center border-r-2 border-red-500 bg-gradient-to-r from-orange-500/20 to-orange-500/30">
                    <span className="text-xs font-bold text-orange-400">
                      MAJOR
                    </span>
                    <span className="text-xs text-orange-400">
                      {character.damageThresholds.minor}-
                      {character.damageThresholds.major - 1}
                    </span>
                    <span className="text-sm font-bold text-white">
                      Mark 2 HP
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-r from-red-500/20 to-red-700/30">
                    <span className="text-xs font-bold text-red-500">
                      SEVERE
                    </span>
                    <span className="text-xs text-red-500">
                      {character.damageThresholds.major}+
                    </span>
                    <span className="text-sm font-bold text-white">
                      Mark 3 HP
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
