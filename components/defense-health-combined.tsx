import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, X } from "lucide-react"

interface DefenseHealthProps {
  character: {
    evasion: number
    armor: number
    armorSlots: number
    hp: { current: number; max: number }
    stress: { current: number; max: number }
    damageThresholds: { minor: number; major: number }
  }
  updateCharacter: (updates: any) => void
  updateHP: (value: number) => void
  updateStress: (value: number) => void
  setCharacter: (fn: any) => void
  isEditMode: boolean
}

export function DefenseHealthCombined({
  character,
  updateCharacter,
  updateHP,
  updateStress,
  setCharacter,
  isEditMode
}: DefenseHealthProps) {
  return (
    <Card className="cyber-border bg-gradient-to-r from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 font-mono tracking-wide text-[#ff00ff]">
          <Shield className="cyber-glow-magenta h-6 w-6" />
          DEFENSES & HEALTH
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Defense Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Evasion & Armor */}
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="mb-2 text-xs text-[#ff00ff]/70">EVASION</div>
              <Input
                type="number"
                value={character.evasion}
                onChange={(e) => updateCharacter({ evasion: Number.parseInt(e.target.value) || 0 })}
                className="cyber-input font-sans text-center text-3xl w-20 h-16 p-0"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#00ffff]/70">ARMOR</span>
                <span className="text-sm font-bold text-[#00ffff]">{character.armor}/{character.armorSlots}</span>
              </div>
              <div className="flex justify-center gap-2">
                {Array.from({ length: Math.max(5, character.armorSlots) }, (_, i) => {
                  const isActive = i < character.armor;
                  const exists = i < character.armorSlots;
                  if (!exists) return <div key={i} className="w-10 h-10" />;
                  return (
                    <div key={i} className="relative cursor-pointer"
                      onClick={() => {
                        if (isActive) {
                          updateCharacter({ armor: Math.max(0, i) });
                        } else {
                          updateCharacter({ armor: Math.min(character.armorSlots, i + 1) });
                        }
                      }}
                    >
                      <Shield
                        className={`h-10 w-10 transition-all ${
                          isActive
                            ? "text-[#00ffff] drop-shadow-[0_0_6px_rgba(0,255,255,0.8)]"
                            : "text-gray-600"
                        }`}
                      />
                      {!isActive && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <X className="h-6 w-6 text-red-500" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* HP & Stress Pips */}
          <div className="space-y-4">
            {/* HP Pips */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-[#ff0040]">HP</span>
                <span className="text-xs text-[#ff0040]/70">{character.hp.current}/{character.hp.max}</span>
              </div>
              <div className="grid grid-cols-12 gap-1">
                {Array.from({ length: Math.max(12, character.hp.max) }, (_, i) => {
                  const isFilled = i < character.hp.current;
                  const isValid = i < character.hp.max;
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        if (i < character.hp.max) {
                          const newValue = isFilled ? i : i + 1;
                          updateHP(newValue);
                        }
                      }}
                      className={`aspect-square rounded-sm border cursor-pointer transition-all ${
                        isFilled
                          ? "border-[#ff0040] bg-[#ff0040] hover:bg-[#ff0040]/80"
                          : isValid
                          ? "border-[#ff0040] bg-transparent hover:bg-[#ff0040]/20"
                          : "border-gray-600 bg-transparent cursor-not-allowed"
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Stress Pips */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-[#ff8000]">STRESS</span>
                <span className="text-xs text-[#ff8000]/70">{character.stress.current}/{character.stress.max}</span>
              </div>
              <div className="grid grid-cols-12 gap-1">
                {Array.from({ length: Math.max(12, character.stress.max) }, (_, i) => {
                  const isFilled = i < character.stress.current;
                  const isValid = i < character.stress.max;
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        if (i < character.stress.max) {
                          const newValue = isFilled ? i : i + 1;
                          updateStress(newValue);
                        }
                      }}
                      className={`aspect-square rounded-sm border cursor-pointer transition-all ${
                        isFilled
                          ? "border-[#ff8000] bg-[#ff8000] hover:bg-[#ff8000]/80"
                          : isValid
                          ? "border-[#ff8000] bg-transparent hover:bg-[#ff8000]/20"
                          : "border-gray-600 bg-transparent cursor-not-allowed"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Damage Thresholds */}
        <div className="space-y-3">
          <Label className="font-mono text-sm font-bold text-[#00ffff]">DAMAGE THRESHOLDS</Label>
          <div className="h-16 overflow-hidden rounded-lg border border-[#00ffff]/30 bg-black/50">
            <div className="flex h-full">
              <div className="flex flex-1 flex-col items-center justify-center border-r-2 border-orange-500 bg-gradient-to-r from-yellow-500/20 to-yellow-500/30">
                <span className="text-xs font-bold text-yellow-400">MINOR</span>
                <span className="text-xs text-yellow-400">1-{character.damageThresholds.minor - 1}</span>
                <span className="text-sm font-bold text-white">Mark 1 HP</span>
              </div>
              <div className="flex flex-1 flex-col items-center justify-center border-r-2 border-red-500 bg-gradient-to-r from-orange-500/20 to-orange-500/30">
                <span className="text-xs font-bold text-orange-400">MAJOR</span>
                <span className="text-xs text-orange-400">{character.damageThresholds.minor}-{character.damageThresholds.major - 1}</span>
                <span className="text-sm font-bold text-white">Mark 2 HP</span>
              </div>
              <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-r from-red-500/20 to-red-700/30">
                <span className="text-xs font-bold text-red-500">SEVERE</span>
                <span className="text-xs text-red-500">{character.damageThresholds.major}+</span>
                <span className="text-sm font-bold text-white">Mark 3 HP</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="minorThreshold" className="text-[#ff8000] font-mono text-xs">
                Minor Threshold
              </Label>
              <Input
                id="minorThreshold"
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
                className="cyber-input font-sans text-center text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="majorThreshold" className="text-[#ff0040] font-mono text-xs">
                Major Threshold
              </Label>
              <Input
                id="majorThreshold"
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
                className="cyber-input font-sans text-center text-sm"
              />
            </div>
          </div>
        </div>

        {/* Max HP/Stress Edit Controls */}
        {isEditMode && (
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#00ffff]/20">
            <div className="space-y-1">
              <Label className="text-[#ff0040] font-mono text-xs">Max HP</Label>
              <Input
                type="number"
                value={character.hp.max}
                onChange={(e) =>
                  setCharacter((prev: any) => ({
                    ...prev,
                    hp: { ...prev.hp, max: Number.parseInt(e.target.value) || 1 },
                  }))
                }
                className="cyber-input font-sans text-center text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[#ff8000] font-mono text-xs">Max Stress</Label>
              <Input
                type="number"
                value={character.stress.max}
                onChange={(e) =>
                  setCharacter((prev: any) => ({
                    ...prev,
                    stress: { ...prev.stress, max: Number.parseInt(e.target.value) || 1 },
                  }))
                }
                className="cyber-input font-sans text-center text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[#00ffff] font-mono text-xs">Armor Slots</Label>
              <Input
                type="number"
                value={character.armorSlots}
                onChange={(e) =>
                  updateCharacter({ armorSlots: Number.parseInt(e.target.value) || 0 })
                }
                className="cyber-input font-sans text-center text-sm"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
