"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  Heart,
  Shield,
  Plus,
  Minus,
  Activity,
  User,
  Brain,
  Star,
  Sword,
  Scroll,
  Clock,
  Trash2,
  Triangle,
  X,
} from "lucide-react"
import { DAGGERHEART_CLASSES } from "@/data/classes"
import { DAGGERHEART_ANCESTRIES } from "@/data/ancestries"
import { DAGGERHEART_WEAPONS } from "@/data/weapons"
import { DAGGERHEART_ARMOR } from "@/data/armor"
import { SearchableSelect } from "./searchable-select"

interface CharacterData {
  name: string
  pronouns: string
  heritage: string
  subclass: string
  class: string
  level: number
  evasion: number
  armor: number
  armorSlots: number
  traits: {
    agility: number
    strength: number
    finesse: number
    instinct: number
    presence: number
    knowledge: number
  }
  hp: { current: number; max: number }
  stress: { current: number; max: number }
  hope: number
  damageThresholds: {
    minor: number
    major: number
  }
  ancestry: {
    name: string
    topFeature: string
    bottomFeature: string
  }
  weapons: Array<{
    id: string
    type: "existing" | "custom"
    name: string
    trait: keyof CharacterData["traits"]
    damage: string
    ranges?: string[]
    hands?: string
    description?: string
  }>
  experiences: Array<{
    id: string
    name: string
    modifier: number
  }>
  activeArmor: Array<{
    id: string
    type: "existing" | "custom"
    name: string
    baseThresholds: string
    baseScore: string
    feature: string
    armorScore?: number
    evasionModifier?: number
  }>
}

interface RollHistory {
  id: string
  timestamp: Date
  type: string
  hopeDie: number
  fearDie: number
  modifier: number
  total: number
  outcome: string
}

const TRAIT_DESCRIPTIONS = {
  agility: "Sprint, Leap, Maneuver",
  strength: "Lift, Smash, Grapple",
  finesse: "Control, Hide, Tinker",
  instinct: "Perceive, Sense, Navigate",
  presence: "Charm, Perform, Deceive",
  knowledge: "Recall, Analyze, Comprehend",
}

// Helper function to determine appropriate trait for a weapon
const getWeaponDefaultTrait = (weapon: typeof DAGGERHEART_WEAPONS[0]): keyof CharacterData["traits"] => {
  // Check weapon name for special cases
  const name = weapon.name.toLowerCase()
  if (name.includes("staff") || name.includes("wand") || name.includes("rune")) {
    return "knowledge"
  }
  if (name.includes("bow") || name.includes("crossbow")) {
    return "agility"
  }
  if (name.includes("dagger") || name.includes("rapier")) {
    return "finesse"
  }
  
  // Check if it's primarily ranged
  if (weapon.ranges?.some(r => ["Far", "Very Far"].includes(r)) && !weapon.ranges?.includes("Melee")) {
    return "agility"
  }
  
  // Default melee weapons to strength
  return "strength"
}

export function DaggerheartCharacterSheet() {
  const [character, setCharacter] = useState<CharacterData>({
    name: "",
    pronouns: "",
    heritage: "",
    subclass: "",
    class: "",
    level: 1,
    evasion: 10,
    armor: 0,
    armorSlots: 3,
    traits: {
      agility: 0,
      strength: 0,
      finesse: 0,
      instinct: 0,
      presence: 0,
      knowledge: 0,
    },
    hp: { current: 20, max: 20 },
    stress: { current: 0, max: 5 },
    hope: 0,
    damageThresholds: {
      minor: 0,
      major: 0,
    },
    ancestry: {
      name: "",
      topFeature: "",
      bottomFeature: "",
    },
    weapons: [],
    experiences: [],
    activeArmor: [],
  })

  const [rollResult, setRollResult] = useState<{
    hopeDie: number
    fearDie: number
    total: number
    modifier: number
    outcome: string
  } | null>(null)

  const [rollHistory, setRollHistory] = useState<RollHistory[]>([])
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("daggerheart-character")
    if (saved) {
      try {
        const loadedCharacter = JSON.parse(saved)
        setCharacter({
          ...loadedCharacter,
          damageThresholds: loadedCharacter.damageThresholds || {
            minor: loadedCharacter.damageThreshold || 0,
            major: loadedCharacter.damageThreshold || 0,
          },
          ancestry: loadedCharacter.ancestry || { name: "", topFeature: "", bottomFeature: "" },
          experiences: loadedCharacter.experiences || [],
          activeArmor: loadedCharacter.activeArmor || [],
        })
      } catch (e) {
        console.error("Failed to load character data:", e)
      }
    }

    const savedHistory = localStorage.getItem("daggerheart-roll-history")
    if (savedHistory) {
      try {
        const loadedHistory = JSON.parse(savedHistory).map((roll: any) => ({
          ...roll,
          timestamp: new Date(roll.timestamp),
        }))
        setRollHistory(loadedHistory)
      } catch (e) {
        console.error("Failed to load roll history:", e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("daggerheart-character", JSON.stringify(character))
  }, [character])

  useEffect(() => {
    localStorage.setItem("daggerheart-roll-history", JSON.stringify(rollHistory))
  }, [rollHistory])

  const updateCharacter = (updates: Partial<CharacterData>) => {
    setCharacter((prev) => ({ ...prev, ...updates }))
  }

  const handleClassChange = (className: string) => {
    const selectedClass = DAGGERHEART_CLASSES.find((c) => c.name === className)
    if (selectedClass) {
      setCharacter((prev) => ({
        ...prev,
        class: className,
        evasion: selectedClass.baseEvasion,
        armor: selectedClass.baseArmor,
        hp: {
          current: selectedClass.baseHP,
          max: selectedClass.baseHP,
        },
        stress: {
          current: 0,
          max: selectedClass.baseStress,
        },
      }))
    } else {
      // Handle custom class or empty selection
      setCharacter((prev) => ({ ...prev, class: className }))
    }
  }

  const handleAncestryChange = (ancestryName: string) => {
    if (ancestryName === "Mixed ancestry") {
      setCharacter((prev) => ({
        ...prev,
        ancestry: {
          name: ancestryName,
          topFeature: "",
          bottomFeature: "",
        },
      }))
    } else {
      const selectedAncestry = DAGGERHEART_ANCESTRIES.find((a) => a.name === ancestryName)
      if (selectedAncestry) {
        setCharacter((prev) => ({
          ...prev,
          ancestry: {
            name: ancestryName,
            topFeature: selectedAncestry.topFeature.name,
            bottomFeature: selectedAncestry.bottomFeature.name,
          },
        }))
      } else {
        setCharacter((prev) => ({
          ...prev,
          ancestry: { name: ancestryName, topFeature: "", bottomFeature: "" },
        }))
      }
    }
  }

  const updateTrait = (trait: keyof CharacterData["traits"], value: number) => {
    setCharacter((prev) => ({
      ...prev,
      traits: { ...prev.traits, [trait]: Math.max(-3, Math.min(5, value)) },
    }))
  }

  const updateHP = (current: number) => {
    setCharacter((prev) => ({
      ...prev,
      hp: { ...prev.hp, current: Math.max(0, Math.min(prev.hp.max, current)) },
    }))
  }

  const updateStress = (current: number) => {
    setCharacter((prev) => ({
      ...prev,
      stress: { ...prev.stress, current: Math.max(0, Math.min(prev.stress.max, current)) },
    }))
  }

  const updateHope = (value: number) => {
    setCharacter((prev) => ({
      ...prev,
      hope: Math.max(0, Math.min(6, value)),
    }))
  }

  const addWeapon = () => {
    const newWeapon = {
      id: Date.now().toString(),
      type: "custom" as const,
      name: "New Weapon",
      trait: "strength" as keyof CharacterData["traits"],
      damage: "1d6",
    }
    setCharacter((prev) => ({
      ...prev,
      weapons: [...prev.weapons, newWeapon],
    }))
  }

  const updateWeapon = (id: string, updates: Partial<(typeof character.weapons)[0]>) => {
    setCharacter((prev) => ({
      ...prev,
      weapons: prev.weapons.map((w) => (w.id === id ? { ...w, ...updates } : w)),
    }))
  }

  const removeWeapon = (id: string) => {
    setCharacter((prev) => ({
      ...prev,
      weapons: prev.weapons.filter((w) => w.id !== id),
    }))
  }

  const addActiveArmor = () => {
    const newArmor = {
      id: Date.now().toString(),
      type: "custom" as const,
      name: "New Armor",
      baseThresholds: "0",
      baseScore: "0",
      feature: "",
    }
    setCharacter((prev) => ({
      ...prev,
      activeArmor: [...prev.activeArmor, newArmor],
    }))
  }

  const updateActiveArmor = (id: string, updates: Partial<(typeof character.activeArmor)[0]>) => {
    setCharacter((prev) => ({
      ...prev,
      activeArmor: prev.activeArmor.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    }))
  }

  const removeActiveArmor = (id: string) => {
    setCharacter((prev) => {
      const armorToRemove = prev.activeArmor.find(a => a.id === id)
      let newEvasion = prev.evasion
      
      // If removing existing armor, revert evasion modifier
      if (armorToRemove?.type === "existing" && armorToRemove.evasionModifier !== undefined) {
        newEvasion = prev.evasion - armorToRemove.evasionModifier
      }
      
      return {
        ...prev,
        evasion: newEvasion,
        activeArmor: prev.activeArmor.filter((a) => a.id !== id),
      }
    })
  }

  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      name: "New Experience",
      modifier: 1,
    }
    setCharacter((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newExperience],
    }))
  }

  const updateExperience = (id: string, updates: Partial<(typeof character.experiences)[0]>) => {
    setCharacter((prev) => ({
      ...prev,
      experiences: prev.experiences.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    }))
  }

  const removeExperience = (id: string) => {
    setCharacter((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id),
    }))
  }

  const rollDualityDice = (modifier = 0, rollType = "General", experienceId?: string) => {
    const hopeDie = Math.floor(Math.random() * 12) + 1
    const fearDie = Math.floor(Math.random() * 12) + 1

    let totalModifier = modifier
    if (experienceId) {
      const experience = character.experiences.find((e) => e.id === experienceId)
      if (experience) {
        totalModifier += experience.modifier
        rollType += ` + ${experience.name}`
      }
    }

    const total = hopeDie + fearDie + totalModifier

    let outcome = ""
    if (hopeDie === fearDie) {
      outcome = "Critical Success! Gain Hope, clear Stress"
    } else if (hopeDie > fearDie) {
      outcome = "Hope dominates - Gain Hope token"
    } else {
      outcome = "Fear dominates - GM gains Fear token"
    }

    const result = { hopeDie, fearDie, total, modifier: totalModifier, outcome }
    setRollResult(result)

    const historyEntry: RollHistory = {
      id: Date.now().toString(),
      timestamp: new Date(),
      type: rollType,
      hopeDie,
      fearDie,
      modifier: totalModifier,
      total,
      outcome,
    }
    setRollHistory((prev) => [historyEntry, ...prev.slice(0, 19)])
    // Automatically open history panel on new roll
    setIsHistoryOpen(true)
  }

  const clearRollHistory = () => {
    setRollHistory([])
  }

  const getDiceIcon = (value: number) => {
    const icons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6]
    const Icon = icons[Math.min(value - 1, 5)] || Dice6
    return <Icon className="w-4 h-4" />
  }

  const getSelectedAncestry = () => {
    return DAGGERHEART_ANCESTRIES.find((a) => a.name === character.ancestry.name)
  }

  const classes = DAGGERHEART_CLASSES

  return (
    <div className="relative w-full">
      {/* Main Content - Centered */}
      <div className="max-w-4xl mx-auto space-y-6 pb-20">
        {/* Character Header */}
        <Card className="cyber-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-[#00ffff] font-mono text-xl tracking-wider flex items-center gap-2">
              <Triangle className="w-5 h-5 text-[#00ffff] drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
              DAGGERHEART CHARACTER SHEET
              <Triangle className="w-5 h-5 text-[#00ffff] drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] rotate-180" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Character Portrait - stacked on top for mobile, left side for desktop */}
              <div className="flex-shrink-0">
                <div className="w-full lg:w-24 h-24 bg-gradient-to-r from-[#00ffff]/20 to-[#ff00ff]/20 rounded-lg border border-[#00ffff]/30 flex items-center justify-center">
                  <span className="text-[#00ffff]/70 font-sans text-xs text-center">
                    CHARACTER
                    <br />
                    PORTRAIT
                  </span>
                </div>
              </div>

              {/* Character Info Fields */}
              <div className="flex-1 space-y-4">
                {/* Name - full width on mobile */}
                <div className="space-y-2">
                  <Label 
                    htmlFor="name" 
                    className={`font-mono text-sm tracking-wide font-bold ${
                      character.name ? "text-[#00ffff]" : "text-[#ffff00]"
                    }`}
                  >
                    NAME *
                  </Label>
                  <Input
                    id="name"
                    value={character.name}
                    onChange={(e) => updateCharacter({ name: e.target.value })}
                    placeholder="Enter name"
                    className={`cyber-input font-sans placeholder:text-[#00ffff]/50 ${
                      character.name 
                        ? "border-[#00ffff] border" 
                        : "border-[#ffff00] border-2 shadow-[0_0_10px_rgba(255,255,0,0.3)]"
                    }`}
                  />
                </div>

                {/* Class - full width on mobile */}
                <div className="space-y-2">
                  <Label 
                    htmlFor="class" 
                    className={`font-mono text-sm tracking-wide font-bold ${
                      character.class ? "text-[#00ffff]" : "text-[#ffff00]"
                    }`}
                  >
                    CLASS *
                  </Label>
                  <SearchableSelect
                    id="class"
                    value={character.class}
                    onChange={handleClassChange}
                    options={[
                      { value: "", label: "Select Class" },
                      ...DAGGERHEART_CLASSES.map((classData) => ({
                        value: classData.name,
                        label: classData.name,
                        description: classData.description,
                      })),
                    ]}
                    placeholder="Select Class"
                    className={`bg-black/70 text-[#00ffff] ${
                      character.class 
                        ? "border border-[#00ffff]" 
                        : "border-2 border-[#ffff00] shadow-[0_0_10px_rgba(255,255,0,0.3)]"
                    }`}
                    required
                  />
                </div>

                {/* Subclass and Level - share row on mobile and desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subclass" className="text-[#00ffff] font-mono text-sm tracking-wide">
                      SUBCLASS
                    </Label>
                    <Input
                      id="subclass"
                      value={character.subclass || ""}
                      onChange={(e) => updateCharacter({ subclass: e.target.value })}
                      placeholder="Enter subclass"
                      className="cyber-input font-sans placeholder:text-[#00ffff]/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level" className="text-[#00ffff] font-mono text-sm tracking-wide">
                      LEVEL
                    </Label>
                    <div className="relative">
                      <Input
                        id="level"
                        type="number"
                        value={character.level}
                        onChange={(e) => updateCharacter({ level: Number.parseInt(e.target.value) || 1 })}
                        min="1"
                        className="cyber-input font-sans text-center text-2xl font-bold"
                      />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-[#00ffff] to-[#ff00ff] rounded-full flex items-center justify-center">
                        <span className="text-black font-sans text-xs font-bold">{character.level}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="cyber-border bg-gradient-to-r from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#ff00ff] font-mono tracking-wide">
                <Shield className="w-6 h-6 cyber-glow-magenta" />
                DEFENSES
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="evasion" className="text-[#ff00ff] font-mono text-sm">
                  EVASION
                </Label>
                <Input
                  id="evasion"
                  type="number"
                  value={character.evasion}
                  onChange={(e) => updateCharacter({ evasion: Number.parseInt(e.target.value) || 0 })}
                  className="cyber-input font-sans text-center text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="armor" className="text-[#ff00ff] font-mono text-sm">
                  ARMOR
                </Label>
                <Input
                  id="armor"
                  type="number"
                  value={character.armor}
                  onChange={(e) => updateCharacter({ armor: Number.parseInt(e.target.value) || 0 })}
                  className="cyber-input font-sans text-center text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="armorSlots" className="text-[#ff00ff] font-mono text-sm">
                  ARMOR SLOTS
                </Label>
                <Input
                  id="armorSlots"
                  type="number"
                  value={character.armorSlots}
                  onChange={(e) => updateCharacter({ armorSlots: Number.parseInt(e.target.value) || 0 })}
                  className="cyber-input font-sans text-center text-lg"
                />
              </div>
              <div className="space-y-3 col-span-2">
                <Label className="text-[#ff00ff] font-mono text-sm font-bold">DAMAGE THRESHOLDS</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minorThreshold" className="text-[#ff8000] font-mono text-xs">
                      MINOR DAMAGE
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
                    <div className="text-xs text-[#ff8000]/70 font-sans text-center">Mark 1 HP</div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="majorThreshold" className="text-[#ff0040] font-mono text-xs">
                      MAJOR DAMAGE
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
                    <div className="text-xs text-[#ff0040]/70 font-sans text-center">Mark 2 HP</div>
                  </div>
                </div>
                <div className="relative h-4 bg-black/50 rounded-lg overflow-hidden border border-[#ff00ff]/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00ff00] via-[#ff8000] to-[#ff0040]"></div>
                  <div className="absolute inset-0 flex items-center justify-between px-2">
                    <span className="text-black font-sans text-xs font-bold">0</span>
                    {character.damageThresholds.minor > 0 && (
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-black"
                        style={{ left: `${Math.min((character.damageThresholds.minor / 30) * 100, 100)}%` }}
                      />
                    )}
                    {character.damageThresholds.major > 0 && (
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-black"
                        style={{ left: `${Math.min((character.damageThresholds.major / 30) * 100, 100)}%` }}
                      />
                    )}
                    <span className="text-black font-sans text-xs font-bold">30+</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cyber-border bg-gradient-to-r from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#00ffff] font-mono tracking-wide">
                <User className="w-6 h-6 cyber-glow" />
                ANCESTRY
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label 
                  htmlFor="ancestryName" 
                  className={`font-mono text-sm font-bold ${
                    character.ancestry.name ? "text-[#00ffff]" : "text-[#ffff00]"
                  }`}
                >
                  ANCESTRY *
                </Label>
                <SearchableSelect
                  id="ancestryName"
                  value={character.ancestry.name}
                  onChange={handleAncestryChange}
                  options={[
                    { value: "", label: "Select Ancestry" },
                    {
                      value: "Mixed ancestry",
                      label: "Mixed ancestry",
                      description: "Choose any top and bottom features from all ancestries",
                    },
                    ...DAGGERHEART_ANCESTRIES.map((ancestry) => ({
                      value: ancestry.name,
                      label: ancestry.name,
                      description: ancestry.description,
                    })),
                  ]}
                  placeholder="Select Ancestry"
                  className={`bg-black/70 text-[#00ffff] ${
                    character.ancestry.name 
                      ? "border border-[#00ffff]" 
                      : "border-2 border-[#ffff00] shadow-[0_0_10px_rgba(255,255,0,0.3)]"
                  }`}
                  required
                />
              </div>
              {character.ancestry.name && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="topFeature" className="text-[#ff00ff] font-mono text-sm">
                      TOP FEATURE
                    </Label>
                    <SearchableSelect
                      id="topFeature"
                      value={character.ancestry.topFeature}
                      onChange={(value) =>
                        setCharacter((prev) => ({
                          ...prev,
                          ancestry: { ...prev.ancestry, topFeature: value },
                        }))
                      }
                      options={[
                        { value: "", label: "Select Top Feature" },
                        ...(character.ancestry.name === "Mixed ancestry"
                          ? DAGGERHEART_ANCESTRIES.map((ancestry) => ({
                              value: ancestry.topFeature.name,
                              label: `${ancestry.topFeature.name} (${ancestry.name})`,
                              description: ancestry.topFeature.description,
                            }))
                          : DAGGERHEART_ANCESTRIES.find((a) => a.name === character.ancestry.name)?.topFeature
                            ? [
                                {
                                  value: DAGGERHEART_ANCESTRIES.find((a) => a.name === character.ancestry.name)!
                                    .topFeature.name,
                                  label: DAGGERHEART_ANCESTRIES.find((a) => a.name === character.ancestry.name)!
                                    .topFeature.name,
                                  description: DAGGERHEART_ANCESTRIES.find((a) => a.name === character.ancestry.name)!
                                    .topFeature.description,
                                },
                              ]
                            : []),
                      ]}
                      placeholder="Select Top Feature"
                      className="bg-black/50 border border-[#ff00ff] text-[#00ffff]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bottomFeature" className="text-[#ff00ff] font-mono text-sm">
                      BOTTOM FEATURE
                    </Label>
                    <SearchableSelect
                      id="bottomFeature"
                      value={character.ancestry.bottomFeature}
                      onChange={(value) =>
                        setCharacter((prev) => ({
                          ...prev,
                          ancestry: { ...prev.ancestry, bottomFeature: value },
                        }))
                      }
                      options={[
                        { value: "", label: "Select Bottom Feature" },
                        ...(character.ancestry.name === "Mixed ancestry"
                          ? DAGGERHEART_ANCESTRIES.map((ancestry) => ({
                              value: ancestry.bottomFeature.name,
                              label: `${ancestry.bottomFeature.name} (${ancestry.name})`,
                              description: ancestry.bottomFeature.description,
                            }))
                          : DAGGERHEART_ANCESTRIES.find((a) => a.name === character.ancestry.name)?.bottomFeature
                            ? [
                                {
                                  value: DAGGERHEART_ANCESTRIES.find((a) => a.name === character.ancestry.name)!
                                    .bottomFeature.name,
                                  label: DAGGERHEART_ANCESTRIES.find((a) => a.name === character.ancestry.name)!
                                    .bottomFeature.name,
                                  description: DAGGERHEART_ANCESTRIES.find((a) => a.name === character.ancestry.name)!
                                    .bottomFeature.description,
                                },
                              ]
                            : []),
                      ]}
                      placeholder="Select Bottom Feature"
                      className="bg-black/50 border border-[#ff00ff] text-[#00ffff]"
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="cyber-border bg-gradient-to-r from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#00ffff] font-mono tracking-wide">
              <Brain className="w-6 h-6" style={{ filter: "drop-shadow(0 0 8px #00ffff)" }} />
              TRAITS
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(character.traits).map(([trait, value]) => (
              <div key={trait} className="space-y-3 p-4 rounded-lg bg-black/30 cyber-border">
                <div className="flex items-center justify-between">
                  <Label className="text-[#00ffff] font-mono text-sm tracking-wider uppercase">{trait}</Label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => rollDualityDice(value, trait.charAt(0).toUpperCase() + trait.slice(1))}
                      className="cyber-button text-[#00ffff] font-sans text-xs"
                    >
                      ROLL {getDiceIcon(Math.abs(value) + 1)}
                    </Button>
                  </div>
                </div>
                <div className="text-xs text-[#00ffff]/70 font-sans">
                  {TRAIT_DESCRIPTIONS[trait as keyof typeof TRAIT_DESCRIPTIONS]}
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateTrait(trait as keyof CharacterData["traits"], value - 1)}
                    className="cyber-button w-8 h-8 p-0"
                  >
                    <Minus className="w-4 h-4 text-[#ff00ff]" />
                  </Button>
                  <Badge
                    variant="secondary"
                    className="min-w-[4rem] justify-center bg-black/50 border-[#00ffff] text-[#00ffff] text-lg p-3 font-sans cyber-text"
                  >
                    {value >= 0 ? `+${value}` : value}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateTrait(trait as keyof CharacterData["traits"], value + 1)}
                    className="cyber-button w-8 h-8 p-0"
                  >
                    <Plus className="w-4 h-4 text-[#ff00ff]" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cyber-border bg-gradient-to-b from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#ff0040] font-mono tracking-wide">
                <Heart className="w-6 h-6" style={{ filter: "drop-shadow(0 0 8px #ff0040)" }} />
                HP
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateHP(character.hp.current - 1)}
                  className="cyber-button w-8 h-8 p-0"
                >
                  <Minus className="w-4 h-4 text-[#ff0040]" />
                </Button>
                <span className="text-2xl font-sans text-[#ff0040] cyber-text">
                  {character.hp.current} / {character.hp.max}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateHP(character.hp.current + 1)}
                  className="cyber-button w-8 h-8 p-0"
                >
                  <Plus className="w-4 h-4 text-[#ff0040]" />
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxHp" className="text-[#ff0040] font-mono text-sm">
                  MAX HP
                </Label>
                <Input
                  id="maxHp"
                  type="number"
                  value={character.hp.max}
                  onChange={(e) =>
                    setCharacter((prev) => ({
                      ...prev,
                      hp: { ...prev.hp, max: Number.parseInt(e.target.value) || 1 },
                    }))
                  }
                  min="1"
                  className="cyber-input font-sans text-center"
                />
              </div>
              <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                <div
                  className="h-full health-bar transition-all duration-300"
                  style={{ width: `${(character.hp.current / character.hp.max) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="cyber-border bg-gradient-to-b from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#ff8000] font-mono tracking-wide">
                <Activity className="w-6 h-6" style={{ filter: "drop-shadow(0 0 8px #ff8000)" }} />
                STRESS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateStress(character.stress.current - 1)}
                  className="cyber-button w-8 h-8 p-0"
                >
                  <Minus className="w-4 h-4 text-[#ff8000]" />
                </Button>
                <span className="text-2xl font-sans text-[#ff8000] cyber-text">
                  {character.stress.current} / {character.stress.max}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateStress(character.stress.current + 1)}
                  className="cyber-button w-8 h-8 p-0"
                >
                  <Plus className="w-4 h-4 text-[#ff8000]" />
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxStress" className="text-[#ff8000] font-mono text-sm">
                  MAX STRESS
                </Label>
                <Input
                  id="maxStress"
                  type="number"
                  value={character.stress.max}
                  onChange={(e) =>
                    setCharacter((prev) => ({
                      ...prev,
                      stress: { ...prev.stress, max: Number.parseInt(e.target.value) || 1 },
                    }))
                  }
                  min="1"
                  className="cyber-input font-sans text-center"
                />
              </div>
              <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                <div
                  className="h-full stress-bar transition-all duration-300"
                  style={{ width: `${(character.stress.current / character.stress.max) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="cyber-border bg-gradient-to-b from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-sm md:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#ffff00] font-mono tracking-wide">HOPE</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateHope(character.hope - 1)}
                  className="cyber-button w-8 h-8 p-0"
                >
                  <Minus className="w-4 h-4 text-[#ffff00]" />
                </Button>
                <span className="text-2xl font-sans text-[#ffff00] cyber-text">{character.hope} / 6</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateHope(character.hope + 1)}
                  className="cyber-button w-8 h-8 p-0"
                >
                  <Plus className="w-4 h-4 text-[#ffff00]" />
                </Button>
              </div>
              <div className="flex gap-2 justify-center">
                {Array.from({ length: 6 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                      i < character.hope ? "hope-dot border-[#ffff00]" : "hope-dot-empty"
                    }`}
                  />
                ))}
              </div>

              {/* Class-specific Hope Feature */}
              {character.class && DAGGERHEART_CLASSES.find((c) => c.name === character.class) && (
                <div className="mt-6 p-4 rounded-lg bg-black/30 cyber-border">
                  <h4 className="text-[#ffff00] font-mono text-sm font-bold mb-2">HOPE FEATURE</h4>
                  <div className="text-[#00ffff] font-sans text-sm">
                    {DAGGERHEART_CLASSES.find((c) => c.name === character.class)?.hopeFeature?.description ||
                      "No hope feature available"}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Weapons Section */}
        <Card className="cyber-border bg-gradient-to-r from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-[#ff00ff] font-mono tracking-wide">
                <Sword className="w-6 h-6" style={{ filter: "drop-shadow(0 0 8px #ff00ff)" }} />
                WEAPONS
              </CardTitle>
              <Button onClick={addWeapon} className="cyber-button text-[#ff00ff] font-sans">
                <Plus className="w-4 h-4 mr-2" />
                ADD WEAPON
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {character.weapons.map((weapon) => (
              <div
                key={weapon.id}
                className="space-y-4 p-4 rounded-lg bg-black/30 cyber-border"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SearchableSelect
                    value={weapon.type === "existing" ? weapon.name : "custom"}
                    onChange={(value) => {
                      if (value === "custom") {
                        updateWeapon(weapon.id, { type: "custom", name: "New Weapon" })
                      } else {
                        const selectedWeapon = DAGGERHEART_WEAPONS.find(w => w.name === value)
                        if (selectedWeapon) {
                          updateWeapon(weapon.id, {
                            type: "existing",
                            name: selectedWeapon.name,
                            damage: selectedWeapon.damage.primary,
                            trait: getWeaponDefaultTrait(selectedWeapon),
                            ranges: selectedWeapon.ranges,
                            hands: selectedWeapon.hands,
                            description: selectedWeapon.description
                          })
                        }
                      }
                    }}
                    options={[
                      { value: "custom", label: "Custom Weapon" },
                      ...DAGGERHEART_WEAPONS.map((w) => ({
                        value: w.name,
                        label: `${w.name} (${w.damage.primary})`,
                        description: `${w.category} • ${w.hands} • ${w.ranges?.join(", ")}`
                      }))
                    ]}
                    placeholder="Select weapon"
                    className="bg-black/70 border border-[#ff00ff]/30 text-[#00ffff]"
                  />
                  {weapon.type === "custom" && (
                    <Input
                      value={weapon.name}
                      onChange={(e) => updateWeapon(weapon.id, { name: e.target.value })}
                      placeholder="Weapon name"
                      className="cyber-input font-sans placeholder:text-[#ff00ff]/50"
                    />
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <SearchableSelect
                    value={weapon.trait}
                    onChange={(value) => updateWeapon(weapon.id, { trait: value as keyof CharacterData["traits"] })}
                    options={[
                      { value: "agility", label: "Agility" },
                      { value: "strength", label: "Strength" },
                      { value: "finesse", label: "Finesse" },
                      { value: "instinct", label: "Instinct" },
                      { value: "presence", label: "Presence" },
                      { value: "knowledge", label: "Knowledge" },
                    ]}
                    placeholder="Select trait"
                    className="bg-black/70 border border-[#ff00ff]/30 text-[#00ffff]"
                  />
                  <Input
                    value={weapon.damage}
                    onChange={(e) => updateWeapon(weapon.id, { damage: e.target.value })}
                    placeholder="1d6"
                    className="cyber-input font-sans placeholder:text-[#ff00ff]/50"
                    readOnly={weapon.type === "existing"}
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => rollDualityDice(character.traits[weapon.trait], `${weapon.name} Attack`)}
                      className="cyber-button text-[#ff00ff] font-sans flex-1"
                    >
                      ROLL
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeWeapon(weapon.id)}
                      className="bg-[#ff0040]/20 border-[#ff0040] text-[#ff0040] hover:bg-[#ff0040]/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                {weapon.description && weapon.type === "existing" && (
                  <p className="text-[#ff00ff]/70 text-sm font-sans">{weapon.description}</p>
                )}
              </div>
            ))}
            {character.weapons.length === 0 && (
              <p className="text-[#ff00ff]/70 text-center py-8 font-sans">No weapons equipped</p>
            )}
          </CardContent>
        </Card>

        {/* Active Armor Section */}
        <Card className="cyber-border bg-gradient-to-r from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-[#ff00ff] font-mono tracking-wide">
                <Shield className="w-6 h-6" style={{ filter: "drop-shadow(0 0 8px #ff00ff)" }} />
                ACTIVE ARMOR
              </CardTitle>
              <Button onClick={addActiveArmor} className="cyber-button text-[#ff00ff] font-sans">
                <Plus className="w-4 h-4 mr-2" />
                ADD ARMOR
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {character.activeArmor.map((armor) => (
              <div
                key={armor.id}
                className="space-y-4 p-4 rounded-lg bg-black/30 cyber-border"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SearchableSelect
                    value={armor.type === "existing" ? armor.name : "custom"}
                    onChange={(value) => {
                      if (value === "custom") {
                        updateActiveArmor(armor.id, { type: "custom", name: "New Armor" })
                      } else {
                        const selectedArmor = DAGGERHEART_ARMOR.find(a => a.name === value)
                        if (selectedArmor) {
                          // Update character's armor score and evasion when armor is equipped
                          const newEvasion = character.evasion + (selectedArmor.evasionModifier - (armor.evasionModifier || 0))
                          setCharacter(prev => ({
                            ...prev,
                            evasion: newEvasion
                          }))
                          
                          updateActiveArmor(armor.id, {
                            type: "existing",
                            name: selectedArmor.name,
                            baseScore: selectedArmor.armorScore.toString(),
                            baseThresholds: `${selectedArmor.armorScore}/${selectedArmor.armorScore * 2}`,
                            feature: selectedArmor.features?.join(", ") || "",
                            armorScore: selectedArmor.armorScore,
                            evasionModifier: selectedArmor.evasionModifier
                          })
                        }
                      }
                    }}
                    options={[
                      { value: "custom", label: "Custom Armor" },
                      ...DAGGERHEART_ARMOR.map((a) => ({
                        value: a.name,
                        label: `${a.name} (Score: ${a.armorScore}, Evasion: ${a.evasionModifier >= 0 ? '+' : ''}${a.evasionModifier})`,
                        description: `${a.category} • Tier ${a.tier || 1} ${a.features?.length ? `• ${a.features[0]}` : ''}`
                      }))
                    ]}
                    placeholder="Select armor"
                    className="bg-black/70 border border-[#ff00ff]/30 text-[#00ffff]"
                  />
                  {armor.type === "custom" && (
                    <Input
                      value={armor.name}
                      onChange={(e) => updateActiveArmor(armor.id, { name: e.target.value })}
                      placeholder="Armor name"
                      className="cyber-input font-sans placeholder:text-[#ff00ff]/50"
                    />
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    value={armor.baseThresholds}
                    onChange={(e) => updateActiveArmor(armor.id, { baseThresholds: e.target.value })}
                    placeholder="Base thresholds"
                    className="cyber-input font-sans placeholder:text-[#ff00ff]/50"
                    readOnly={armor.type === "existing"}
                  />
                  <Input
                    value={armor.baseScore}
                    onChange={(e) => updateActiveArmor(armor.id, { baseScore: e.target.value })}
                    placeholder="Base score"
                    className="cyber-input font-sans placeholder:text-[#ff00ff]/50"
                    readOnly={armor.type === "existing"}
                  />
                  <div className="flex gap-2">
                    <Input
                      value={armor.feature}
                      onChange={(e) => updateActiveArmor(armor.id, { feature: e.target.value })}
                      placeholder="Special feature"
                      className="cyber-input font-sans placeholder:text-[#ff00ff]/50 flex-1"
                      readOnly={armor.type === "existing"}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeActiveArmor(armor.id)}
                      className="bg-[#ff0040]/20 border-[#ff0040] text-[#ff0040] hover:bg-[#ff0040]/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                {armor.type === "existing" && armor.feature && (
                  <p className="text-[#ff00ff]/70 text-sm font-sans">{armor.feature}</p>
                )}
              </div>
            ))}
            {character.activeArmor.length === 0 && (
              <p className="text-[#ff00ff]/70 text-center py-8 font-sans">No armor equipped</p>
            )}
          </CardContent>
        </Card>

        {/* Experience Section */}
        <Card className="cyber-border bg-gradient-to-r from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-[#00ffff] font-mono tracking-wide">
                <Star className="w-6 h-6" style={{ filter: "drop-shadow(0 0 8px #00ffff)" }} />
                EXPERIENCE
              </CardTitle>
              <Button onClick={addExperience} className="cyber-button text-[#00ffff] font-sans">
                <Plus className="w-4 h-4 mr-2" />
                ADD EXPERIENCE
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {character.experiences.map((experience) => (
              <div key={experience.id} className="flex items-center gap-4 p-4 rounded-lg bg-black/30 cyber-border">
                <Input
                  value={experience.name}
                  onChange={(e) => updateExperience(experience.id, { name: e.target.value })}
                  placeholder="Experience name"
                  className="flex-1 cyber-input font-sans placeholder:text-[#00ffff]/50"
                />
                <SearchableSelect
                  value={experience.modifier.toString()}
                  onChange={(value) => updateExperience(experience.id, { modifier: Number.parseInt(value) })}
                  options={[-3, -2, -1, 0, 1, 2, 3, 4, 5].map((mod) => ({
                    value: mod.toString(),
                    label: mod >= 0 ? `+${mod}` : mod.toString(),
                  }))}
                  placeholder="Modifier"
                  className="bg-black/70 border border-[#00ffff]/30 text-[#00ffff] w-20"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => rollDualityDice(0, "Experience", experience.id)}
                  className="cyber-button text-[#00ffff] font-mono"
                >
                  USE
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeExperience(experience.id)}
                  className="bg-[#ff0040]/20 border-[#ff0040] text-[#ff0040] hover:bg-[#ff0040]/30"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {character.experiences.length === 0 && (
              <p className="text-[#00ffff]/70 text-center py-8 font-sans">No experiences recorded</p>
            )}
          </CardContent>
        </Card>

        {/* Domain Cards Section */}
        <Card className="cyber-border bg-gradient-to-r from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#ff00ff] font-mono tracking-wide">
              <Scroll className="w-6 h-6" style={{ filter: "drop-shadow(0 0 8px #ff00ff)" }} />
              DOMAIN CARDS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#ff00ff]/70 text-center py-8 font-sans">Domain cards coming soon...</p>
          </CardContent>
        </Card>
      </div>

      {/* Floating Roll History Button */}
      <Button
        onClick={() => setIsHistoryOpen(!isHistoryOpen)}
        className="fixed bottom-4 right-4 z-50 cyber-button bg-[#0a0a0f]/90 border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff]/20 font-mono flex items-center gap-2 shadow-lg"
        size="lg"
      >
        <Clock className="w-5 h-5" />
        <span className="hidden sm:inline">Roll History</span>
        {rollHistory.length > 0 && (
          <Badge className="bg-[#ff00ff]/30 text-[#ff00ff] border-[#ff00ff] ml-1">
            {rollHistory.length}
          </Badge>
        )}
      </Button>

      {/* Floating Roll History Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-full sm:w-96 bg-gradient-to-b from-[#0a0a0f]/95 to-[#1a1a2e]/95 backdrop-blur-md border-l border-[#00ffff]/30 transform transition-transform duration-300 ease-in-out ${
          isHistoryOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-[#00ffff]/30">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-3 text-[#00ffff] font-mono text-lg tracking-wide">
                <Clock className="w-6 h-6" style={{ filter: "drop-shadow(0 0 8px #00ffff)" }} />
                ROLL HISTORY
              </h2>
              <div className="flex items-center gap-2">
                {rollHistory.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearRollHistory}
                    className="text-[#ff0040] hover:text-[#ff0040]/80 hover:bg-[#ff0040]/10 font-mono text-xs"
                  >
                    CLEAR
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsHistoryOpen(false)}
                  className="text-[#00ffff] hover:text-[#00ffff]/80 hover:bg-[#00ffff]/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {rollHistory.length === 0 ? (
              <p className="text-[#00ffff]/70 text-center py-8 font-sans">No rolls yet</p>
            ) : (
              rollHistory.map((roll) => (
                <div key={roll.id} className="p-3 rounded-lg bg-black/30 cyber-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#00ffff] font-sans text-sm font-bold truncate">{roll.type}</span>
                    <span className="text-[#00ffff]/70 font-sans text-xs">{roll.timestamp.toLocaleTimeString()}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <Badge className="bg-blue-500/20 border-blue-500 text-blue-400 font-mono text-xs">
                      Hope: {roll.hopeDie}
                    </Badge>
                    <Badge className="bg-red-500/20 border-red-500 text-red-400 font-mono text-xs">
                      Fear: {roll.fearDie}
                    </Badge>
                    {roll.modifier !== 0 && (
                      <Badge className="bg-yellow-500/20 border-yellow-500 text-yellow-400 font-mono text-xs">
                        {roll.modifier >= 0 ? `+${roll.modifier}` : roll.modifier}
                      </Badge>
                    )}
                    <Badge className="bg-[#00ffff]/20 border-[#00ffff] text-[#00ffff] font-mono text-xs">
                      Total: {roll.total}
                    </Badge>
                  </div>
                  <p className="text-[#00ffff]/80 font-sans text-xs">{roll.outcome}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
