export interface ArmorData {
  name: string
  category: "Light" | "Medium" | "Heavy"
  armorScore: number
  evasionModifier: number // negative value that reduces evasion, positive value increases it
  features?: string[]
  tier?: number
  description?: string
}

export const DAGGERHEART_ARMOR: ArmorData[] = [
  // Tier 1 Armor
  {
    name: "Gambeson Armor",
    category: "Light",
    armorScore: 3,
    evasionModifier: 1,
    features: ["Flexible: +1 to Evasion"],
    tier: 1,
    description: "+1 to Evasion"
  },
  {
    name: "Leather Armor",
    category: "Light",
    armorScore: 3,
    evasionModifier: 0,
    features: [],
    tier: 1
  },
  {
    name: "Chainmail Armor",
    category: "Medium",
    armorScore: 4,
    evasionModifier: -1,
    features: ["Heavy: -1 to Evasion"],
    tier: 1,
    description: "-1 to Evasion"
  },
  {
    name: "Full Plate Armor",
    category: "Heavy",
    armorScore: 4,
    evasionModifier: -2,
    features: ["Very Heavy: -2 to Evasion; -1 to Agility"],
    tier: 1,
    description: "-2 to Evasion; -1 to Agility"
  },
  
  // Tier 2 Armor
  {
    name: "Improved Gambeson Armor",
    category: "Light",
    armorScore: 4,
    evasionModifier: 1,
    features: ["Flexible: +1 to Evasion"],
    tier: 2,
    description: "+1 to Evasion"
  },
  {
    name: "Improved Leather Armor",
    category: "Light",
    armorScore: 4,
    evasionModifier: 0,
    features: [],
    tier: 2
  },
  {
    name: "Improved Chainmail Armor",
    category: "Medium",
    armorScore: 5,
    evasionModifier: -1,
    features: ["Heavy: -1 to Evasion"],
    tier: 2,
    description: "-1 to Evasion"
  },
  {
    name: "Improved Full Plate Armor",
    category: "Heavy",
    armorScore: 5,
    evasionModifier: -2,
    features: ["Very Heavy: -2 to Evasion; -1 to Agility"],
    tier: 2,
    description: "-2 to Evasion; -1 to Agility"
  },
  
  // Tier 2 Special Armor
  {
    name: "Elundrian Chain Armor",
    category: "Medium",
    armorScore: 4,
    evasionModifier: 0,
    features: ["Warded: You reduce incoming magic damage by your Armor Score before applying it to your damage thresholds."],
    tier: 2,
    description: "You reduce incoming magic damage by your Armor Score before applying it to your damage thresholds."
  },
  {
    name: "Harrowbone Armor",
    category: "Medium",
    armorScore: 4,
    evasionModifier: 0,
    features: ["Resilient: Before you mark your last Armor Slot, roll a d6. On a result of 6, reduce the severity by one threshold without marking an Armor Slot."],
    tier: 2,
    description: "Before you mark your last Armor Slot, roll a d6. On a result of 6, reduce the severity by one threshold without marking an Armor Slot."
  },
  {
    name: "Irontree Breastplate Armor",
    category: "Medium",
    armorScore: 4,
    evasionModifier: 0,
    features: ["Reinforced: When you mark your last Armor Slot, increase your damage thresholds by +2 until you clear at least 1 Armor Slot."],
    tier: 2,
    description: "When you mark your last Armor Slot, increase your damage thresholds by +2 until you clear at least 1 Armor Slot."
  },
  {
    name: "Runetan Floating Armor",
    category: "Medium",
    armorScore: 4,
    evasionModifier: 0,
    features: ["Shifting: When you are targeted for an attack, you can mark an Armor Slot to give the attack roll against you disadvantage."],
    tier: 2,
    description: "When you are targeted for an attack, you can mark an Armor Slot to give the attack roll against you disadvantage."
  },
  {
    name: "Tyris Soft Armor",
    category: "Light",
    armorScore: 5,
    evasionModifier: 0,
    features: ["Quiet: You gain a +2 bonus to rolls you make to move silently."],
    tier: 2,
    description: "You gain a +2 bonus to rolls you make to move silently."
  },
  {
    name: "Rosewild Armor",
    category: "Medium",
    armorScore: 5,
    evasionModifier: 0,
    features: ["Hopeful: When you would spend a Hope, you can mark an Armor Slot instead."],
    tier: 2,
    description: "When you would spend a Hope, you can mark an Armor Slot instead."
  },
  
  // Tier 3 Armor
  {
    name: "Advanced Gambeson Armor",
    category: "Light",
    armorScore: 5,
    evasionModifier: 1,
    features: ["Flexible: +1 to Evasion"],
    tier: 3,
    description: "+1 to Evasion"
  },
  {
    name: "Advanced Leather Armor",
    category: "Light",
    armorScore: 5,
    evasionModifier: 0,
    features: [],
    tier: 3
  },
  {
    name: "Advanced Chainmail Armor",
    category: "Medium",
    armorScore: 6,
    evasionModifier: -1,
    features: ["Heavy: -1 to Evasion"],
    tier: 3,
    description: "-1 to Evasion"
  },
  {
    name: "Advanced Full Plate Armor",
    category: "Heavy",
    armorScore: 6,
    evasionModifier: -2,
    features: ["Very Heavy: -2 to Evasion; -1 to Agility"],
    tier: 3,
    description: "-2 to Evasion; -1 to Agility"
  },
  
  // Tier 3 Special Armor
  {
    name: "Bellamie Fine Armor",
    category: "Light",
    armorScore: 5,
    evasionModifier: 0,
    features: ["Gilded: +1 to Presence"],
    tier: 3,
    description: "+1 to Presence"
  },
  {
    name: "Dragonscale Armor",
    category: "Medium",
    armorScore: 5,
    evasionModifier: 0,
    features: ["Impenetrable: Once per short rest, when you would mark your last Hit Point, you can instead mark a Stress."],
    tier: 3,
    description: "Once per short rest, when you would mark your last Hit Point, you can instead mark a Stress."
  },
  {
    name: "Spiked Plate Armor",
    category: "Heavy",
    armorScore: 5,
    evasionModifier: 0,
    features: ["Sharp: On a successful attack against a target within Melee range, add a d4 to the damage roll."],
    tier: 3,
    description: "On a successful attack against a target within Melee range, add a d4 to the damage roll."
  },
  {
    name: "Bladefare Armor",
    category: "Heavy",
    armorScore: 6,
    evasionModifier: 0,
    features: ["Physical: You can't mark an Armor Slot to reduce magic damage."],
    tier: 3,
    description: "You can't mark an Armor Slot to reduce magic damage."
  },
  {
    name: "Monett's Cloak",
    category: "Light",
    armorScore: 6,
    evasionModifier: 0,
    features: ["Magic: You can't mark an Armor Slot to reduce physical damage."],
    tier: 3,
    description: "You can't mark an Armor Slot to reduce physical damage."
  },
  {
    name: "Runes of Fortification",
    category: "Medium",
    armorScore: 6,
    evasionModifier: 0,
    features: ["Painful: Each time you mark an Armor Slot, you must mark a Stress."],
    tier: 3,
    description: "Each time you mark an Armor Slot, you must mark a Stress."
  },
  
  // Tier 4 Armor
  {
    name: "Legendary Gambeson Armor",
    category: "Light",
    armorScore: 6,
    evasionModifier: 1,
    features: ["Flexible: +1 to Evasion"],
    tier: 4,
    description: "+1 to Evasion"
  },
  {
    name: "Legendary Leather Armor",
    category: "Light",
    armorScore: 6,
    evasionModifier: 0,
    features: [],
    tier: 4
  },
  {
    name: "Legendary Chainmail Armor",
    category: "Medium",
    armorScore: 7,
    evasionModifier: -1,
    features: ["Heavy: -1 to Evasion"],
    tier: 4,
    description: "-1 to Evasion"
  },
  {
    name: "Legendary Full Plate Armor",
    category: "Heavy",
    armorScore: 7,
    evasionModifier: -2,
    features: ["Very Heavy: -2 to Evasion; -1 to Agility"],
    tier: 4,
    description: "-2 to Evasion; -1 to Agility"
  },
  
  // Tier 4 Special Armor
  {
    name: "Dunamis Silkchain",
    category: "Light",
    armorScore: 7,
    evasionModifier: 0,
    features: ["Timeslowing: Mark an Armor Slot to roll a d4 and add its result as a bonus to your Evasion against an incoming attack."],
    tier: 4,
    description: "Mark an Armor Slot to roll a d4 and add its result as a bonus to your Evasion against an incoming attack."
  },
  {
    name: "Channeling Armor",
    category: "Light",
    armorScore: 5,
    evasionModifier: 0,
    features: ["Channeling: +1 to Spellcast Rolls"],
    tier: 4,
    description: "+1 to Spellcast Rolls"
  },
  {
    name: "Emberwoven Armor",
    category: "Medium",
    armorScore: 6,
    evasionModifier: 0,
    features: ["Burning: When an adversary attacks you within Melee range, they mark a Stress."],
    tier: 4,
    description: "When an adversary attacks you within Melee range, they mark a Stress."
  },
  {
    name: "Full Fortified Armor",
    category: "Heavy",
    armorScore: 4,
    evasionModifier: 0,
    features: ["Fortified: When you mark an Armor Slot, you reduce the severity of an attack by two thresholds instead of one."],
    tier: 4,
    description: "When you mark an Armor Slot, you reduce the severity of an attack by two thresholds instead of one."
  },
  {
    name: "Veritas Opal Armor",
    category: "Light",
    armorScore: 6,
    evasionModifier: 0,
    features: ["Truthseeking: This armor glows when another creature within Close range tells a lie."],
    tier: 4,
    description: "This armor glows when another creature within Close range tells a lie."
  },
  {
    name: "Savior Chainmail",
    category: "Heavy",
    armorScore: 8,
    evasionModifier: 0,
    features: ["Difficult: -1 to all character traits and Evasion"],
    tier: 4,
    description: "-1 to all character traits and Evasion"
  }
  
  // Note: The SRD contains armor across tiers 1-5
  // This is a comprehensive list of the armor available in the SRD
]
