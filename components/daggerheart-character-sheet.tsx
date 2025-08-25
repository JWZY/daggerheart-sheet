"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MobileSelect, SelectItem } from "@/components/mobile-select"
import {
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  Shield,
  Plus,
  Minus,
  User,
  Brain,
  Star,
  Sword,
  Scroll,
  Clock,
  Trash2,
  Triangle,
  X,
  Settings,
  Flame,
} from "lucide-react"
import { DAGGERHEART_CLASSES } from "@/data/classes"
import { DAGGERHEART_ANCESTRIES } from "@/data/ancestries"
import { DAGGERHEART_WEAPONS } from "@/data/weapons"
import { DAGGERHEART_ARMOR } from "@/data/armor"
import { DOMAIN_CARDS } from "@/data/domain-cards"
import { SearchableSelect } from "./searchable-select"
import { DefenseHealthCombined } from "./defense-health-combined"

export interface CharacterData {
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
  domainCards: Array<{
    id: string
    name: string
    domain: string
    type: string
    level: number
    recallCost?: number
    description: string
    effect: string
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
const getWeaponDefaultTrait = (
  weapon: (typeof DAGGERHEART_WEAPONS)[0]
): keyof CharacterData["traits"] => {
  // Check weapon name for special cases
  const name = weapon.name.toLowerCase()
  if (
    name.includes("staff") ||
    name.includes("wand") ||
    name.includes("rune")
  ) {
    return "knowledge"
  }
  if (name.includes("bow") || name.includes("crossbow")) {
    return "agility"
  }
  if (name.includes("dagger") || name.includes("rapier")) {
    return "finesse"
  }

  // Check if it's primarily ranged
  if (
    weapon.ranges?.some((r) => ["Far", "Very Far"].includes(r)) &&
    !weapon.ranges?.includes("Melee")
  ) {
    return "agility"
  }

  // Default melee weapons to strength
  return "strength"
}

export function DaggerheartCharacterSheet() {
  const [isEditMode, setIsEditMode] = useState(false)
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
    domainCards: [],
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

  // Domain card filters
  const [domainFilter, setDomainFilter] = useState<string>("all")
  const [levelFilter, setLevelFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [searchFilter, setSearchFilter] = useState<string>("")

  useEffect(() => {
    // Only access localStorage on the client side
    if (typeof window === "undefined") return

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
          ancestry: loadedCharacter.ancestry || {
            name: "",
            topFeature: "",
            bottomFeature: "",
          },
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
    if (typeof window === "undefined") return
    localStorage.setItem("daggerheart-character", JSON.stringify(character))
  }, [character])

  useEffect(() => {
    if (typeof window === "undefined") return
    localStorage.setItem(
      "daggerheart-roll-history",
      JSON.stringify(rollHistory)
    )
  }, [rollHistory])

  const updateCharacter = (updates: Partial<CharacterData>) => {
    setCharacter((prev) => ({ ...prev, ...updates }))
  }

  // Get unique domains, levels, and types from DOMAIN_CARDS
  const uniqueDomains = [
    ...new Set(DOMAIN_CARDS.map((card) => card.domain)),
  ].sort()
  const uniqueLevels = [
    ...new Set(DOMAIN_CARDS.map((card) => card.level)),
  ].sort()
  const uniqueTypes = [...new Set(DOMAIN_CARDS.map((card) => card.type))].sort()

  // Filter domain cards based on current filters
  const filteredDomainCards = DOMAIN_CARDS.filter((card) => {
    const matchesDomain = domainFilter === "all" || card.domain === domainFilter
    const matchesLevel =
      levelFilter === "all" || card.level === Number(levelFilter)
    const matchesType = typeFilter === "all" || card.type === typeFilter
    const matchesSearch =
      !searchFilter ||
      card.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      card.description.toLowerCase().includes(searchFilter.toLowerCase())

    return matchesDomain && matchesLevel && matchesType && matchesSearch
  })

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
      const selectedAncestry = DAGGERHEART_ANCESTRIES.find(
        (a) => a.name === ancestryName
      )
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
      stress: {
        ...prev.stress,
        current: Math.max(0, Math.min(prev.stress.max, current)),
      },
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

  const updateWeapon = (
    id: string,
    updates: Partial<(typeof character.weapons)[0]>
  ) => {
    setCharacter((prev) => ({
      ...prev,
      weapons: prev.weapons.map((w) =>
        w.id === id ? { ...w, ...updates } : w
      ),
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

  const updateActiveArmor = (
    id: string,
    updates: Partial<(typeof character.activeArmor)[0]>
  ) => {
    setCharacter((prev) => ({
      ...prev,
      activeArmor: prev.activeArmor.map((a) =>
        a.id === id ? { ...a, ...updates } : a
      ),
    }))
  }

  const removeActiveArmor = (id: string) => {
    setCharacter((prev) => {
      const armorToRemove = prev.activeArmor.find((a) => a.id === id)
      let newEvasion = prev.evasion

      // If removing existing armor, revert evasion modifier
      if (
        armorToRemove?.type === "existing" &&
        armorToRemove.evasionModifier !== undefined
      ) {
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

  const updateExperience = (
    id: string,
    updates: Partial<(typeof character.experiences)[0]>
  ) => {
    setCharacter((prev) => ({
      ...prev,
      experiences: prev.experiences.map((e) =>
        e.id === id ? { ...e, ...updates } : e
      ),
    }))
  }

  const removeExperience = (id: string) => {
    setCharacter((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id),
    }))
  }

  const addDomainCard = (card: Omit<CharacterData["domainCards"][0], "id">) => {
    const newCard = {
      id: Date.now().toString(),
      ...card,
    }
    setCharacter((prev) => ({
      ...prev,
      domainCards: [...prev.domainCards, newCard],
    }))
  }

  const removeDomainCard = (id: string) => {
    setCharacter((prev) => ({
      ...prev,
      domainCards: prev.domainCards.filter((c) => c.id !== id),
    }))
  }

  const rollDualityDice = (
    modifier = 0,
    rollType = "General",
    experienceId?: string
  ) => {
    const hopeDie = Math.floor(Math.random() * 12) + 1
    const fearDie = Math.floor(Math.random() * 12) + 1

    let totalModifier = modifier
    if (experienceId) {
      const experience = character.experiences.find(
        (e) => e.id === experienceId
      )
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

  const getCharacterTier = (level: number): number => {
    // L1 = Tier 1, L2-4 = Tier 2, L5-7 = Tier 3, L8-10 = Tier 4
    if (level === 1) return 1
    if (level >= 2 && level <= 4) return 2
    if (level >= 5 && level <= 7) return 3
    if (level >= 8 && level <= 10) return 4
    return Math.ceil(level / 3) // fallback for levels above 10
  }

  const rollDamageDice = (damageString: string, weaponName: string) => {
    // Extract die type from damage string (e.g., "d8" from "1d8" or "d8")
    const match = damageString.match(/d(\d+)/)
    if (!match) return

    const dieSize = parseInt(match[1])
    const tier = getCharacterTier(character.level)
    const numDice = tier

    let total = 0
    const rolls: number[] = []

    for (let i = 0; i < numDice; i++) {
      const roll = Math.floor(Math.random() * dieSize) + 1
      rolls.push(roll)
      total += roll
    }

    const rollType = `${weaponName} Damage`
    const outcome = `Damage: ${numDice}d${dieSize} = ${rolls.join(" + ")} = ${total}`

    // Create a simplified history entry for damage rolls
    const historyEntry: RollHistory = {
      id: Date.now().toString(),
      timestamp: new Date(),
      type: rollType,
      hopeDie: 0, // Not used for damage
      fearDie: 0, // Not used for damage
      modifier: total,
      total: total,
      outcome: outcome,
    }
    setRollHistory((prev) => [historyEntry, ...prev.slice(0, 19)])
    setIsHistoryOpen(true)
  }

  const clearRollHistory = () => {
    setRollHistory([])
  }

  const getDiceIcon = (value: number) => {
    const icons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6]
    const Icon = icons[Math.min(value - 1, 5)] || Dice6
    return <Icon className="h-4 w-4" />
  }

  const getSelectedAncestry = () => {
    return DAGGERHEART_ANCESTRIES.find(
      (a) => a.name === character.ancestry.name
    )
  }

  const classes = DAGGERHEART_CLASSES

  return (
    <div className="relative w-full">
      {/* Main Content - Centered */}
      <div className="mx-auto max-w-4xl space-y-6 pb-20">
        {/* Compact Character Header */}
        <Card className="cyber-border bg-gradient-to-r from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-sm">
          <CardContent className="py-4">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                {/* Character Portrait */}
                <div className="flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-[#00ffff]/30 bg-gradient-to-r from-[#00ffff]/20 to-[#ff00ff]/20">
                    <span className="text-center font-sans text-[10px] text-[#00ffff]/70">
                      PORTRAIT
                    </span>
                  </div>
                </div>

                {/* Character Info */}
                <div>
                  {isEditMode ? (
                    <div className="space-y-2">
                      <Input
                        id="name"
                        value={character.name}
                        onChange={(e) =>
                          updateCharacter({ name: e.target.value })
                        }
                        placeholder="Enter name"
                        className={`cyber-input h-8 font-sans text-lg font-bold placeholder:text-[#00ffff]/50 ${
                          character.name
                            ? "border border-[#00ffff]"
                            : "border-2 border-[#ffff00] shadow-[0_0_10px_rgba(255,255,0,0.3)]"
                        }`}
                      />
                      <div className="flex gap-2">
                        <SearchableSelect
                          id="ancestry"
                          value={character.ancestry?.name || ""}
                          onChange={handleAncestryChange}
                          options={[
                            { value: "", label: "Select Ancestry" },
                            ...DAGGERHEART_ANCESTRIES.map((ancestry) => ({
                              value: ancestry.name,
                              label: ancestry.name,
                              description: ancestry.description,
                            })),
                          ]}
                          placeholder="Select Ancestry"
                          className="h-8 bg-black/70 text-[#00ffff]"
                        />
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
                          className={`h-8 bg-black/70 text-[#00ffff] ${
                            character.class
                              ? "border border-[#00ffff]"
                              : "border-2 border-[#ffff00] shadow-[0_0_10px_rgba(255,255,0,0.3)]"
                          }`}
                          required
                        />
                      </div>
                      <div className="flex gap-2">
                        <Input
                          id="subclass"
                          value={character.subclass || ""}
                          onChange={(e) =>
                            updateCharacter({ subclass: e.target.value })
                          }
                          placeholder="Subclass"
                          className="cyber-input h-8 flex-1 font-sans text-sm placeholder:text-[#00ffff]/50"
                        />
                        <Input
                          id="level"
                          type="number"
                          value={character.level}
                          onChange={(e) =>
                            updateCharacter({
                              level: Number.parseInt(e.target.value) || 1,
                            })
                          }
                          min="1"
                          className="cyber-input h-8 w-16 text-center font-sans text-sm"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h1 className="font-sans text-2xl font-bold text-[#00ffff]">
                        {character.name || "Unnamed Character"}
                      </h1>
                      <p className="font-sans text-sm text-[#00ffff]/70">
                        {character.ancestry?.name || "Unknown Ancestry"}{" "}
                        {character.class || "No Class"}{" "}
                        {character.subclass ? `(${character.subclass})` : ""} •
                        Level {character.level}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Defense & Health Combined */}
        <DefenseHealthCombined
          character={character}
          updateCharacter={updateCharacter}
          updateHP={updateHP}
          updateStress={updateStress}
          setCharacter={setCharacter}
          isEditMode={isEditMode}
        />

        <Card className="cyber-border bg-gradient-to-r from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 font-mono tracking-wide text-[#00ffff]">
              <Brain
                className="h-6 w-6"
                style={{ filter: "drop-shadow(0 0 8px #00ffff)" }}
              />
              TRAITS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {Object.entries(character.traits).map(([trait, value]) => (
                <div
                  key={trait}
                  className="group relative flex cursor-pointer flex-col items-center"
                  onClick={() =>
                    rollDualityDice(
                      value,
                      trait.charAt(0).toUpperCase() + trait.slice(1)
                    )
                  }
                >
                  {/* Vertical side bars */}
                  <div className="absolute top-8 bottom-8 left-0 w-0.5 bg-[#00ffff]/30" />
                  <div className="absolute top-8 right-0 bottom-8 w-0.5 bg-[#00ffff]/30" />

                  {/* Trait container */}
                  <div className="relative flex h-32 w-full flex-col items-center justify-between bg-gradient-to-b from-black/20 to-black/40 px-4 py-3 transition-all hover:from-black/30 hover:to-black/50">
                    {/* Trait Name */}
                    <div className="text-center">
                      <div className="font-mono text-xs font-bold tracking-wider text-[#00ffff] uppercase">
                        {trait}
                      </div>
                    </div>

                    {/* Trait Value */}
                    <div className="flex flex-1 items-center justify-center">
                      <span className="cyber-text font-sans text-4xl font-bold text-[#00ffff]">
                        {value >= 0 ? `+${value}` : value}
                      </span>
                    </div>

                    {/* Trait Description */}
                    <div className="px-2 text-center">
                      <div className="font-sans text-[10px] leading-tight text-[#00ffff]/60">
                        {
                          TRAIT_DESCRIPTIONS[
                            trait as keyof typeof TRAIT_DESCRIPTIONS
                          ]
                        }
                      </div>
                    </div>
                  </div>

                  {/* Edit Mode Controls */}
                  {isEditMode && (
                    <div className="absolute right-0 -bottom-8 left-0 z-10 flex items-center justify-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          updateTrait(
                            trait as keyof CharacterData["traits"],
                            value - 1
                          )
                        }}
                        className="cyber-button h-6 w-6 bg-black/80 p-0"
                      >
                        <Minus className="h-3 w-3 text-[#00ffff]" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          updateTrait(
                            trait as keyof CharacterData["traits"],
                            value + 1
                          )
                        }}
                        className="cyber-button h-6 w-6 bg-black/80 p-0"
                      >
                        <Plus className="h-3 w-3 text-[#00ffff]" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-border bg-gradient-to-b from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between font-mono tracking-wide text-[#ffff00]">
              <span>HOPE</span>
              <span className="text-sm font-normal">{character.hope}/6</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Hope Pips */}
            <div>
              <div className="flex justify-center gap-2">
                {Array.from({ length: 6 }, (_, i) => {
                  const isFilled = i < character.hope
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        // If clicking the last filled pip, decrease by 1
                        // Otherwise, set to clicked position
                        if (i + 1 === character.hope) {
                          updateHope(i)
                        } else {
                          updateHope(i + 1)
                        }
                      }}
                      className={`h-6 w-6 cursor-pointer rounded-full border-2 transition-all ${
                        isFilled
                          ? "hope-dot border-[#ffff00] hover:opacity-80"
                          : "hope-dot-empty hover:bg-[#ffff00]/20"
                      }`}
                    />
                  )
                })}
              </div>
            </div>

            {/* Class-specific Hope Feature */}
            {character.class &&
              DAGGERHEART_CLASSES.find((c) => c.name === character.class) && (
                <div className="cyber-border mt-6 rounded-lg bg-black/30 p-4">
                  <h4 className="mb-2 font-mono text-sm font-bold text-[#ffff00]">
                    HOPE FEATURE
                  </h4>
                  <div className="font-sans text-sm text-[#00ffff]">
                    {DAGGERHEART_CLASSES.find((c) => c.name === character.class)
                      ?.hopeFeature?.description || "No hope feature available"}
                  </div>
                </div>
              )}
          </CardContent>
        </Card>

        {/* Weapons Section */}
        <Card className="cyber-border bg-gradient-to-r from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 font-mono tracking-wide text-[#00ffff]">
                <Sword
                  className="h-6 w-6"
                  style={{ filter: "drop-shadow(0 0 8px #ff00ff)" }}
                />
                WEAPONS
              </CardTitle>
              {isEditMode && (
                <Button
                  onClick={addWeapon}
                  className="cyber-button font-sans text-[#00ffff]"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  ADD WEAPON
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {character.weapons.map((weapon) => (
              <div
                key={weapon.id}
                className="cyber-border space-y-4 rounded-lg bg-black/30 p-4"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <SearchableSelect
                    value={weapon.type === "existing" ? weapon.name : "custom"}
                    onChange={(value) => {
                      if (value === "custom") {
                        updateWeapon(weapon.id, {
                          type: "custom",
                          name: "New Weapon",
                        })
                      } else {
                        const selectedWeapon = DAGGERHEART_WEAPONS.find(
                          (w) => w.name === value
                        )
                        if (selectedWeapon) {
                          updateWeapon(weapon.id, {
                            type: "existing",
                            name: selectedWeapon.name,
                            damage: selectedWeapon.damage.primary,
                            trait: getWeaponDefaultTrait(selectedWeapon),
                            ranges: selectedWeapon.ranges,
                            hands: selectedWeapon.hands,
                            description: selectedWeapon.description,
                          })
                        }
                      }
                    }}
                    options={[
                      { value: "custom", label: "Custom Weapon" },
                      ...DAGGERHEART_WEAPONS.map((w) => ({
                        value: w.name,
                        label: `${w.name} (${w.damage.primary})`,
                        description: `${w.category} • ${w.hands} • ${w.ranges?.join(", ")}`,
                      })),
                    ]}
                    placeholder="Select weapon"
                    className="border border-[#00ffff]/30 bg-black/70 text-[#00ffff]"
                  />
                  {weapon.type === "custom" && (
                    <Input
                      value={weapon.name}
                      onChange={(e) =>
                        updateWeapon(weapon.id, { name: e.target.value })
                      }
                      placeholder="Weapon name"
                      className="cyber-input font-sans placeholder:text-[#00ffff]/50"
                    />
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <SearchableSelect
                    value={weapon.trait}
                    onChange={(value) =>
                      updateWeapon(weapon.id, {
                        trait: value as keyof CharacterData["traits"],
                      })
                    }
                    options={[
                      { value: "agility", label: "Agility" },
                      { value: "strength", label: "Strength" },
                      { value: "finesse", label: "Finesse" },
                      { value: "instinct", label: "Instinct" },
                      { value: "presence", label: "Presence" },
                      { value: "knowledge", label: "Knowledge" },
                    ]}
                    placeholder="Select trait"
                    className="border border-[#00ffff]/30 bg-black/70 text-[#00ffff]"
                  />
                  <Input
                    value={weapon.damage}
                    onChange={(e) =>
                      updateWeapon(weapon.id, { damage: e.target.value })
                    }
                    placeholder="1d6"
                    className="cyber-input font-sans placeholder:text-[#00ffff]/50"
                    readOnly={weapon.type === "existing"}
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        rollDualityDice(
                          character.traits[weapon.trait],
                          `${weapon.name} Attack`
                        )
                      }
                      className="cyber-button flex-1 font-sans text-[#00ffff]"
                      title="Roll attack with 2d12 + trait modifier"
                    >
                      ATTACK
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => rollDamageDice(weapon.damage, weapon.name)}
                      className="cyber-button flex-1 font-sans text-[#ff0040]"
                      title={`Roll damage: ${getCharacterTier(character.level)}${weapon.damage.match(/d\d+/)?.[0] || weapon.damage} (Tier ${getCharacterTier(character.level)})`}
                    >
                      DAMAGE
                    </Button>
                    {isEditMode && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeWeapon(weapon.id)}
                        className="border-[#ff0040] bg-[#ff0040]/20 text-[#ff0040] hover:bg-[#ff0040]/30"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                {weapon.description && weapon.type === "existing" && (
                  <p className="font-sans text-sm text-[#00ffff]/70">
                    {weapon.description}
                  </p>
                )}
              </div>
            ))}
            {character.weapons.length === 0 && (
              <p className="py-4 text-center font-sans text-sm text-[#00ffff]/50">
                No weapons equipped
              </p>
            )}
          </CardContent>
        </Card>

        {/* Active Armor Section */}
        <Card className="cyber-border bg-gradient-to-r from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 font-mono tracking-wide text-[#00ffff]">
                <Shield
                  className="h-6 w-6"
                  style={{ filter: "drop-shadow(0 0 8px #ff00ff)" }}
                />
                ACTIVE ARMOR
              </CardTitle>
              {isEditMode && (
                <Button
                  onClick={addActiveArmor}
                  className="cyber-button font-sans text-[#00ffff]"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  ADD ARMOR
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {character.activeArmor.map((armor) => (
              <div
                key={armor.id}
                className="cyber-border space-y-4 rounded-lg bg-black/30 p-4"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <SearchableSelect
                    value={armor.type === "existing" ? armor.name : "custom"}
                    onChange={(value) => {
                      if (value === "custom") {
                        updateActiveArmor(armor.id, {
                          type: "custom",
                          name: "New Armor",
                        })
                      } else {
                        const selectedArmor = DAGGERHEART_ARMOR.find(
                          (a) => a.name === value
                        )
                        if (selectedArmor) {
                          // Update character's armor score and evasion when armor is equipped
                          const newEvasion =
                            character.evasion +
                            (selectedArmor.evasionModifier -
                              (armor.evasionModifier || 0))
                          setCharacter((prev) => ({
                            ...prev,
                            evasion: newEvasion,
                          }))

                          updateActiveArmor(armor.id, {
                            type: "existing",
                            name: selectedArmor.name,
                            baseScore: selectedArmor.armorScore.toString(),
                            baseThresholds: `${selectedArmor.armorScore}/${selectedArmor.armorScore * 2}`,
                            feature: selectedArmor.features?.join(", ") || "",
                            armorScore: selectedArmor.armorScore,
                            evasionModifier: selectedArmor.evasionModifier,
                          })
                        }
                      }
                    }}
                    options={[
                      { value: "custom", label: "Custom Armor" },
                      ...DAGGERHEART_ARMOR.map((a) => ({
                        value: a.name,
                        label: `${a.name} (Score: ${a.armorScore}, Evasion: ${a.evasionModifier >= 0 ? "+" : ""}${a.evasionModifier})`,
                        description: `${a.category} • Tier ${a.tier || 1} ${a.features?.length ? `• ${a.features[0]}` : ""}`,
                      })),
                    ]}
                    placeholder="Select armor"
                    className="border border-[#00ffff]/30 bg-black/70 text-[#00ffff]"
                  />
                  {armor.type === "custom" && (
                    <Input
                      value={armor.name}
                      onChange={(e) =>
                        updateActiveArmor(armor.id, { name: e.target.value })
                      }
                      placeholder="Armor name"
                      className="cyber-input font-sans placeholder:text-[#00ffff]/50"
                    />
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Input
                    value={armor.baseThresholds}
                    onChange={(e) =>
                      updateActiveArmor(armor.id, {
                        baseThresholds: e.target.value,
                      })
                    }
                    placeholder="Base thresholds"
                    className="cyber-input font-sans placeholder:text-[#00ffff]/50"
                    readOnly={armor.type === "existing"}
                  />
                  <Input
                    value={armor.baseScore}
                    onChange={(e) =>
                      updateActiveArmor(armor.id, { baseScore: e.target.value })
                    }
                    placeholder="Base score"
                    className="cyber-input font-sans placeholder:text-[#00ffff]/50"
                    readOnly={armor.type === "existing"}
                  />
                  <div className="flex gap-2">
                    <Input
                      value={armor.feature}
                      onChange={(e) =>
                        updateActiveArmor(armor.id, { feature: e.target.value })
                      }
                      placeholder="Special feature"
                      className="cyber-input flex-1 font-sans placeholder:text-[#00ffff]/50"
                      readOnly={armor.type === "existing"}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeActiveArmor(armor.id)}
                      className="border-[#ff0040] bg-[#ff0040]/20 text-[#ff0040] hover:bg-[#ff0040]/30"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {armor.type === "existing" && armor.feature && (
                  <p className="font-sans text-sm text-[#00ffff]/70">
                    {armor.feature}
                  </p>
                )}
              </div>
            ))}
            {character.activeArmor.length === 0 && (
              <p className="py-4 text-center font-sans text-sm text-[#00ffff]/50">
                No armor equipped
              </p>
            )}
          </CardContent>
        </Card>

        {/* Experience Section */}
        <Card className="cyber-border bg-gradient-to-r from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 font-mono tracking-wide text-[#00ffff]">
                <Star
                  className="h-6 w-6"
                  style={{ filter: "drop-shadow(0 0 8px #00ffff)" }}
                />
                EXPERIENCE
              </CardTitle>
              {isEditMode && (
                <Button
                  onClick={addExperience}
                  className="cyber-button font-sans text-[#00ffff]"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  ADD EXPERIENCE
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {character.experiences.map((experience) => (
              <div
                key={experience.id}
                className="cyber-border flex items-center gap-4 rounded-lg bg-black/30 p-4"
              >
                <Input
                  value={experience.name}
                  onChange={(e) =>
                    updateExperience(experience.id, { name: e.target.value })
                  }
                  placeholder="Experience name"
                  className="cyber-input flex-1 font-sans placeholder:text-[#00ffff]/50"
                />
                <SearchableSelect
                  value={experience.modifier.toString()}
                  onChange={(value) =>
                    updateExperience(experience.id, {
                      modifier: Number.parseInt(value),
                    })
                  }
                  options={[-3, -2, -1, 0, 1, 2, 3, 4, 5].map((mod) => ({
                    value: mod.toString(),
                    label: mod >= 0 ? `+${mod}` : mod.toString(),
                  }))}
                  placeholder="Modifier"
                  className="w-20 border border-[#00ffff]/30 bg-black/70 text-[#00ffff]"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    rollDualityDice(0, "Experience", experience.id)
                  }
                  className="cyber-button font-mono text-[#00ffff]"
                >
                  USE
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeExperience(experience.id)}
                  className="border-[#ff0040] bg-[#ff0040]/20 text-[#ff0040] hover:bg-[#ff0040]/30"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {character.experiences.length === 0 && (
              <p className="py-4 text-center font-sans text-sm text-[#00ffff]/50">
                No experiences recorded
              </p>
            )}
          </CardContent>
        </Card>

        {/* Domain Cards Section */}
        <Card className="cyber-border bg-gradient-to-r from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between font-mono tracking-wide text-[#00ffff]">
              <div className="flex items-center gap-3">
                <Scroll
                  className="h-6 w-6"
                  style={{ filter: "drop-shadow(0 0 8px #ff00ff)" }}
                />
                DOMAIN CARDS
              </div>
              <div className="text-sm font-normal text-[#00ffff]/50">
                {character.domainCards.length} cards
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Filter Controls */}
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                <MobileSelect
                  value={domainFilter}
                  onValueChange={setDomainFilter}
                  placeholder="All Domains"
                  title="Select Domain"
                  triggerClassName="cyber-input"
                >
                  <SelectItem value="all">All Domains</SelectItem>
                  {uniqueDomains.map((domain) => (
                    <SelectItem key={domain} value={domain}>
                      {domain}
                    </SelectItem>
                  ))}
                </MobileSelect>

                <MobileSelect
                  value={levelFilter}
                  onValueChange={setLevelFilter}
                  placeholder="All Levels"
                  title="Select Level"
                  triggerClassName="cyber-input"
                >
                  <SelectItem value="all">All Levels</SelectItem>
                  {uniqueLevels.map((level) => (
                    <SelectItem key={level} value={level.toString()}>
                      Level {level}
                    </SelectItem>
                  ))}
                </MobileSelect>

                <MobileSelect
                  value={typeFilter}
                  onValueChange={setTypeFilter}
                  placeholder="All Types"
                  title="Select Type"
                  triggerClassName="cyber-input"
                >
                  <SelectItem value="all">All Types</SelectItem>
                  {uniqueTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </MobileSelect>

                <Input
                  placeholder="Search cards..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="cyber-input placeholder:text-[#00ffff]/50"
                />
              </div>

              <div className="flex items-center gap-2">
                <SearchableSelect
                  value=""
                  onChange={(value) => {
                    const selectedCard = filteredDomainCards.find(
                      (card) => card.name === value
                    )
                    if (selectedCard) {
                      addDomainCard(selectedCard)
                    }
                  }}
                  options={filteredDomainCards.map((card) => ({
                    value: card.name,
                    label: card.name,
                    description: `${card.domain} • Level ${card.level} • ${card.type}${card.recallCost !== undefined ? ` • Recall: ${card.recallCost}` : ""}`,
                  }))}
                  placeholder={
                    filteredDomainCards.length === 0
                      ? "No cards match filters"
                      : "Add domain card..."
                  }
                  className="cyber-input flex-1"
                />
              </div>

              {character.domainCards.length > 0 && (
                <div className="mt-4 space-y-2">
                  {character.domainCards.map((card) => (
                    <div
                      key={card.id}
                      className="cyber-border space-y-2 rounded-lg bg-black/30 p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-[#00ffff]">
                              {card.name}
                            </h4>
                            <Badge className="border-[#00ffff] bg-[#ff00ff]/20 text-xs text-[#00ffff]">
                              {card.domain}
                            </Badge>
                            <Badge className="border-[#00ffff] bg-[#00ffff]/20 text-xs text-[#00ffff]">
                              Level {card.level}
                            </Badge>
                            {card.recallCost !== undefined && (
                              <Badge className="border-[#00ffff] bg-[#ff00ff]/20 text-xs text-[#00ffff]">
                                Recall: {card.recallCost}
                              </Badge>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-[#00ffff]/70">
                            {card.description}
                          </p>
                          <p className="mt-2 text-sm text-[#00ffff]">
                            {card.effect}
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeDomainCard(card.id)}
                          className="ml-4 border-[#ff0040] bg-[#ff0040]/20 text-[#ff0040] hover:bg-[#ff0040]/30"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {character.domainCards.length === 0 && (
                <p className="py-4 text-center font-sans text-sm text-[#00ffff]/50">
                  No domain cards selected
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Roll History Button - Only in Play Mode */}
      {!isEditMode && (
        <Button
          onClick={() => setIsHistoryOpen(!isHistoryOpen)}
          className="cyber-button fixed right-4 bottom-20 z-50 flex items-center gap-2 border-[#00ffff] bg-[#0a0a0f]/90 font-mono text-[#00ffff] shadow-lg hover:bg-[#00ffff]/20"
          size="lg"
        >
          <Clock className="h-5 w-5" />
          <span className="hidden sm:inline">Roll History</span>
          {rollHistory.length > 0 && (
            <Badge className="ml-1 border-[#00ffff] bg-[#ff00ff]/30 text-[#00ffff]">
              {rollHistory.length}
            </Badge>
          )}
        </Button>
      )}

      {/* Floating Play/Edit Mode Button */}
      <Button
        onClick={() => setIsEditMode(!isEditMode)}
        className="cyber-button fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 border-[#00ffff] bg-[#0a0a0f]/90 px-6 font-mono text-[#00ffff] shadow-lg hover:bg-[#00ffff]/20"
        size="lg"
      >
        {isEditMode ? (
          <>
            <User className="h-5 w-5" />
            PLAY MODE
          </>
        ) : (
          <>
            <Settings className="h-5 w-5" />
            EDIT MODE
          </>
        )}
      </Button>

      {/* Floating Roll History Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-full transform border-l border-[#00ffff]/30 bg-gradient-to-b from-[#0a0a0f]/95 to-[#1a1a2e]/95 backdrop-blur-md transition-transform duration-300 ease-in-out sm:w-96 ${
          isHistoryOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-b border-[#00ffff]/30 p-4">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-3 font-mono text-lg tracking-wide text-[#00ffff]">
                <Clock
                  className="h-6 w-6"
                  style={{ filter: "drop-shadow(0 0 8px #00ffff)" }}
                />
                ROLL HISTORY
              </h2>
              <div className="flex items-center gap-2">
                {rollHistory.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearRollHistory}
                    className="font-mono text-xs text-[#ff0040] hover:bg-[#ff0040]/10 hover:text-[#ff0040]/80"
                  >
                    CLEAR
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsHistoryOpen(false)}
                  className="text-[#00ffff] hover:bg-[#00ffff]/10 hover:text-[#00ffff]/80"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {rollHistory.length === 0 ? (
              <p className="py-8 text-center font-sans text-[#00ffff]/70">
                No rolls yet
              </p>
            ) : (
              rollHistory.map((roll) => (
                <div
                  key={roll.id}
                  className="cyber-border space-y-2 rounded-lg bg-black/30 p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate font-sans text-sm font-bold text-[#00ffff]">
                      {roll.type}
                    </span>
                    <span className="font-sans text-xs text-[#00ffff]/70">
                      {roll.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <Badge className="border-blue-500 bg-blue-500/20 font-mono text-xs text-blue-400">
                      Hope: {roll.hopeDie}
                    </Badge>
                    <Badge className="border-red-500 bg-red-500/20 font-mono text-xs text-red-400">
                      Fear: {roll.fearDie}
                    </Badge>
                    {roll.modifier !== 0 && (
                      <Badge className="border-yellow-500 bg-yellow-500/20 font-mono text-xs text-yellow-400">
                        {roll.modifier >= 0
                          ? `+${roll.modifier}`
                          : roll.modifier}
                      </Badge>
                    )}
                    <Badge className="border-[#00ffff] bg-[#00ffff]/20 font-mono text-xs text-[#00ffff]">
                      Total: {roll.total}
                    </Badge>
                  </div>
                  <p className="font-sans text-xs text-[#00ffff]/80">
                    {roll.outcome}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
