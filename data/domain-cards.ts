export interface DomainCard {
  name: string
  domain: string
  type: string
  level: number
  recallCost?: number
  description: string
  effect: string
}

// Note: The Daggerheart SRD contains domain cards for all domains:
// Arcana, Blade, Bone, Codex, Grace, Midnight, Sage, Shadow, Splendor, and Valor
// Please extract and add cards from all domains in the SRD PDF
// The structure below shows examples from the Sage domain

export const DOMAIN_CARDS: DomainCard[] = [
  // Level 1 Sage Cards
  {
    name: "Gifted Tracker",
    domain: "Sage",
    type: "Ability",
    level: 1,
    recallCost: 0,
    description: "Track creatures and ask questions about their passage",
    effect:
      "When you're tracking a specific creature or group of creatures based on signs of their passage, you can spend any number of Hope and ask the GM that many questions from the following list.\n\n- What direction did they go?\n- How long ago did they pass through?\n- What were they doing in this location?\n- How many of them were here?\n\nWhen you encounter creatures you've tracked in this way, gain a +1 bonus to your Evasion against them.",
  },
  {
    name: "Nature's Tongue",
    domain: "Sage",
    type: "Ability",
    level: 1,
    recallCost: 0,
    description: "Speak to plants and animals in the natural world",
    effect:
      "You can speak the language of the natural world. When you want to speak to the plants and animals around you, make an Instinct Roll (12). On a success, they'll give you the information they know. On a roll with Fear, their knowledge might be limited or come at a cost.\n\nAdditionally, before you make a Spellcast Roll while within a natural environment, you can spend a Hope to gain a +2 bonus to the roll.",
  },
  {
    name: "Vicious Entangle",
    domain: "Sage",
    type: "Spell",
    level: 1,
    recallCost: 1,
    description: "Roots and vines reach out to damage and restrain targets",
    effect:
      "Make a Spellcast Roll against a target within Far range. On a success, roots and vines reach out from the ground, dealing 1d8+1 physical damage and temporarily Restraining the target.\n\nAdditionally on a success, you can spend a Hope to temporarily Restrain another adversary within Very Close range of your target.",
  },

  // Level 2 Sage Cards
  {
    name: "Conjure Swarm",
    domain: "Sage",
    type: "Spell",
    level: 2,
    recallCost: 1,
    description: "Summon armored beetles or fire flies to aid you",
    effect:
      "Tekaira Armored Beetles: Mark a Stress to conjure armored beetles that encircle you. When you next take damage, reduce the severity by one threshold. You can spend a Hope to keep the beetles conjured after taking damage.\n\nFire Flies: Make a Spellcast Roll against all adversaries within Close range. Spend a Hope to deal 2d8+3 magic damage to targets you succeed against.",
  },
  {
    name: "Natural Familiar",
    domain: "Sage",
    type: "Spell",
    level: 2,
    recallCost: 1,
    description: "Summon a small nature spirit or forest critter companion",
    effect:
      "Spend a Hope to summon a small nature spirit or forest critter to your side until your next rest, you cast Natural Familiar again, or the familiar is targeted by an attack. If you spend an additional Hope, you can summon a familiar that flies. You can communicate with them, make a Spellcast Roll to command them to perform simple tasks, and mark a Stress to see through their eyes.\n\nWhen you deal damage to an adversary within Melee range of your familiar, you add a d6 to your damage roll.",
  },

  // Level 3 Sage Cards
  {
    name: "Corrosive Projectile",
    domain: "Sage",
    type: "Spell",
    level: 3,
    recallCost: 1,
    description:
      "Launch a corrosive projectile that deals damage and corrodes targets",
    effect:
      "Make a Spellcast Roll against a target within Far range. On a success, deal 6d4 magic damage using your Proficiency. Additionally, mark 2 or more Stress to make them permanently Corroded. While a target is Corroded, they gain a –1 penalty to their Difficulty for every 2 Stress you spent. This condition can stack.",
  },
  {
    name: "Towering Stalk",
    domain: "Sage",
    type: "Spell",
    level: 3,
    recallCost: 1,
    description:
      "Conjure a thick stalk that can be climbed or used as an attack",
    effect:
      "Once per rest, you can conjure a thick, twisting stalk within Close range that can be easily climbed. Its height can grow up to Far range.\n\nMark a Stress to use this spell as an attack. Make a Spellcast Roll against an adversary or group of adversaries within Close range. The erupting stalk lifts targets you succeed against into the air and drops them, dealing d8 physical damage using your Proficiency.",
  },

  // Level 4 Sage Cards
  {
    name: "Death Grip",
    domain: "Sage",
    type: "Spell",
    level: 4,
    recallCost: 1,
    description: "Vines reach out to pull, constrict, or damage targets",
    effect:
      "Make a Spellcast Roll against a target within Close range and choose one of the following options:\n\n- You pull the target into Melee range or pull yourself into Melee range of them.\n- You constrict the target and force them to mark 2 Stress.\n- All adversaries between you and the target must succeed on a Reaction Roll (13) or be hit by vines, taking 3d6+2 physical damage.\n\nOn a success, vines reach out from your hands, causing the chosen effect and temporarily Restraining the target.",
  },
  {
    name: "Healing Field",
    domain: "Sage",
    type: "Spell",
    level: 4,
    recallCost: 2,
    description: "Conjure a field of healing plants",
    effect:
      "Once per long rest, you can conjure a field of healing plants around you. Everywhere within Close range of you bursts to life with vibrant nature, allowing you and all allies in the area to clear a Hit Point.\n\nSpend 2 Hope to allow you and all allies to clear 2 Hit Points instead.",
  },

  // Level 5 Sage Cards
  {
    name: "Thorn Skin",
    domain: "Sage",
    type: "Spell",
    level: 5,
    recallCost: 1,
    description: "Sprout thorns that reduce damage and hurt attackers",
    effect:
      "Once per rest, spend a Hope to sprout thorns all over your body. When you do, place a number of tokens equal to your Spellcast trait on this card. When you take damage, you can spend any number of tokens to roll that number of d6s. Add the results together and reduce the incoming damage by that amount. If you're within Melee range of the attacker, deal that amount of damage back to them.\n\nWhen you take a rest, clear all unspent tokens.",
  },
  {
    name: "Wild Fortress",
    domain: "Sage",
    type: "Spell",
    level: 5,
    recallCost: 1,
    description: "Grow a natural barricade dome for protection",
    effect:
      "Make a Spellcast Roll (13). On a success, spend 2 Hope to grow a natural barricade in the shape of a dome that you and one ally can take cover within. While inside the dome, a creature can't be targeted by attacks and can't make attacks. Attacks made against the dome automatically succeed. The dome has the following damage thresholds and lasts until it marks 3 Hit Points. Place tokens on this card to represent marking Hit Points.\n\n**Thresholds: 15/30**",
  },

  // Level 6 Sage Cards
  {
    name: "Conjured Steeds",
    domain: "Sage",
    type: "Spell",
    level: 6,
    recallCost: 0,
    description: "Conjure magical steeds for travel and combat",
    effect:
      "Spend any number of Hope to conjure that many magical steeds (such as horses, camels, or elephants) that you and your allies can ride until your next long rest or the steeds take any damage. The steeds double your land speed while traveling and, when in danger, allow you to move within Far range without having to roll. Creatures riding a steed gain a –2 penalty to attack rolls and a +2 bonus to damage rolls.",
  },
  {
    name: "Forager",
    domain: "Sage",
    type: "Ability",
    level: 6,
    recallCost: 1,
    description: "Forage for useful consumables during downtime",
    effect:
      "As an additional downtime move you can choose, roll a d6 to see what you forage. Work with the GM to describe it and add it to your inventory as a consumable. Your party can carry up to five foraged consumables at a time.\n\n1. An unusual flower (Clear 2 Stress)\n2. A beautiful relic (Gain 2 Hope)\n3. An arcane rune (+2 to a Spellcast Roll)\n4. A healing vial (Clear 2 Hit Points)\n5. A luck charm (Reroll any die)\n6. Choose one of the options above.",
  },

  // Level 7 Sage Cards
  {
    name: "Sage-Touched",
    domain: "Sage",
    type: "Ability",
    level: 7,
    recallCost: 2,
    description: "Gain powerful benefits when focused on Sage domain",
    effect:
      "When 4 or more of the domain cards in your loadout are from the Sage domain, gain the following benefits:\n\n- While you're in a natural environment, you gain a +2 bonus to your Spellcast Rolls.\n- Once per rest, you can double your Agility or Instinct when making a roll that uses that trait. You must choose to do this before you roll.",
  },
  {
    name: "Wild Surge",
    domain: "Sage",
    type: "Spell",
    level: 7,
    recallCost: 2,
    description: "Channel nature to enhance yourself with escalating power",
    effect:
      "Once per long rest, mark a Stress to channel the natural world around you and enhance yourself. Describe how your appearance changes, then place a d6 on this card with the 1 value facing up.\n\nWhile the Wild Surge Die is active, you add its value to every action roll you make. After you add its value to a roll, increase the Wild Surge Die's value by one. When the die's value would exceed 6 or you take a rest, this form drops and you must mark an additional Stress.",
  },

  // Level 8 Sage Cards
  {
    name: "Forest Sprites",
    domain: "Sage",
    type: "Spell",
    level: 8,
    recallCost: 2,
    description: "Create forest sprites that aid allies in combat",
    effect:
      "Make a Spellcast Roll (13). On a success, spend any number of Hope to create an equal number of small forest sprites who appear at points you choose within Far range, providing the following benefits:\n\n- Your allies gain a +3 bonus to attack rolls against adversaries within Melee range of a sprite.\n- An ally who marks an Armor Slot while within Melee range of a sprite can mark an additional Armor Slot.\n\nA sprite vanishes after granting a benefit or taking any damage.",
  },
  {
    name: "Rejuvenation Barrier",
    domain: "Sage",
    type: "Spell",
    level: 8,
    recallCost: 1,
    description: "Create a protective barrier that heals and protects",
    effect:
      "Make a Spellcast Roll (15). Once per rest on a success, create a temporary barrier of protective energy around you at Very Close range. You and all allies within the barrier when this spell is cast clear 1d4 Hit Points. While the barrier is up, you and all allies within have resistance to physical damage from outside the barrier.\n\nWhen you move, the barrier follows you.",
  },

  // Level 9 Sage Cards
  {
    name: "Fane of the Wilds",
    domain: "Sage",
    type: "Ability",
    level: 9,
    recallCost: 2,
    description: "Gain tokens based on Sage cards for spellcast bonuses",
    effect:
      "After a long rest, place a number of tokens equal to the number of Sage domain cards in your loadout and vault on this card.\n\nWhen you would make a Spellcast Roll, you can spend any number of tokens after the roll to gain a +1 bonus for each token spent.\n\nWhen you critically succeed on a Spellcast Roll for a Sage domain spell, gain a token.\n\nWhen you take a long rest, clear all unspent tokens.",
  },
  {
    name: "Plant Dominion",
    domain: "Sage",
    type: "Spell",
    level: 9,
    recallCost: 1,
    description: "Reshape the natural world around you",
    effect:
      "Make a Spellcast Roll (18). Once per long rest on a success, you reshape the natural world, changing the surrounding plant life anywhere within Far range of you. For example, you can grow trees instantly, clear a path through dense vines, or create a wall of roots.",
  },

  // Level 10 Sage Cards
  {
    name: "Force of Nature",
    domain: "Sage",
    type: "Spell",
    level: 10,
    recallCost: 2,
    description: "Transform into a hulking nature spirit",
    effect:
      "Mark a Stress to transform into a hulking nature spirit, gaining the following benefits:\n\n- When you succeed on an attack or Spellcast Roll, gain a +10 bonus to the damage roll.\n- When you deal enough damage to defeat a creature within Close range, you absorb them and clear an Armor Slot.\n- You can't be Restrained.\n\nBefore you make an action roll, you must spend a Hope. If you can't, you revert to your normal form.",
  },
  {
    name: "Tempest",
    domain: "Sage",
    type: "Spell",
    level: 10,
    recallCost: 2,
    description: "Create devastating weather effects",
    effect:
      "Choose one of the following tempests and make a Spellcast Roll against all targets within Far range. Targets you succeed against experience its effects until the GM spends a Fear on their turn to end this spell.\n\n- **Blizzard**: Deal 2d20+8 magic damage and targets are temporarily Vulnerable.\n- **Hurricane**: Deal 3d10+10 magic damage and choose a direction the wind is blowing. Targets can't move against the wind.\n- **Sandstorm**: Deal 5d6+9 magic damage. Attacks made from beyond Melee range have disadvantage.",
  },

  // ARCANA DOMAIN CARDS
  // The Arcana domain focuses on raw magical power and manipulation of reality
  {
    name: "Rune Ward",
    domain: "Arcana",
    type: "Spell",
    level: 1,
    recallCost: 0,
    description:
      "You have a deeply personal trinket that can be infused with protective magic and held as a ward by you or an ally.",
    effect:
      "You have a deeply personal trinket that can be infused with protective magic and held as a ward by you or an ally. Describe what it is and why it's important to you. The ward's holder can spend a Hope to reduce incoming damage by 1d8.\n\nIf the Ward Die result is 8, the ward's power ends after it reduces damage this turn. It can be recharged for free on your next rest.",
  },
  {
    name: "Unleash Chaos",
    domain: "Arcana",
    type: "Spell",
    level: 1,
    recallCost: 1,
    description:
      "At the beginning of a session, place a number of tokens equal to your Spellcast trait on this card.",
    effect:
      "At the beginning of a session, place a number of tokens equal to your Spellcast trait on this card.\n\nMake a Spellcast Roll against a target within Far range and spend any number of tokens to channel raw energy from within yourself to unleash against them. On a success, roll a number of d10s equal to the tokens you spent and deal that much magic damage to the target. Mark a Stress to replenish this card with tokens (up to your Spellcast trait).\n\nAt the end of each session, clear all unspent tokens.",
  },
  {
    name: "Wall Walk",
    domain: "Arcana",
    type: "Spell",
    level: 1,
    recallCost: 1,
    description:
      "Spend a Hope to allow a creature you can touch to climb on walls and ceilings as easily as walking on the ground.",
    effect:
      "Spend a Hope to allow a creature you can touch to climb on walls and ceilings as easily as walking on the ground. This lasts until the end of the scene or you cast Wall Walk again.",
  },
  {
    name: "Counterspell",
    domain: "Arcana",
    type: "Spell",
    level: 3,
    recallCost: 2,
    description:
      "You can interrupt a magical effect taking place by making a reaction roll using your Spellcast trait.",
    effect:
      "You can interrupt a magical effect taking place by making a reaction roll using your Spellcast trait. On a success, the effect stops and any consequences are avoided, and this card is placed in your vault.",
  },

  // BLADE DOMAIN CARDS
  // The Blade domain encompasses martial techniques and weapon mastery
  {
    name: "Get Back Up",
    domain: "Blade",
    type: "Ability",
    level: 1,
    recallCost: 1,
    description:
      "When you take Severe damage, you can mark a Stress to reduce the severity by one threshold.",
    effect:
      "When you take Severe damage, you can mark a Stress to reduce the severity by one threshold.",
  },
  {
    name: "Not Good Enough",
    domain: "Blade",
    type: "Ability",
    level: 1,
    recallCost: 1,
    description: "When you roll your damage dice, you can reroll any 1s or 2s.",
    effect: "When you roll your damage dice, you can reroll any 1s or 2s.",
  },
  {
    name: "Whirlwind",
    domain: "Blade",
    type: "Ability",
    level: 1,
    recallCost: 0,
    description:
      "When you make a successful attack against a target within Very Close range, you can spend a Hope to use the attack against all other targets within Very Close range.",
    effect:
      "When you make a successful attack against a target within Very Close range, you can spend a Hope to use the attack against all other targets within Very Close range. All additional adversaries you succeed against with this ability take half damage.",
  },
  {
    name: "Reckless",
    domain: "Blade",
    type: "Ability",
    level: 2,
    recallCost: 1,
    description: "Mark a Stress to gain advantage on an attack.",
    effect: "Mark a Stress to gain advantage on an attack.",
  },

  // BONE DOMAIN CARDS
  // The Bone domain deals with death, decay, and primal forces
  {
    name: "Prey Marked",
    domain: "Bone",
    type: "Ability",
    level: 1,
    recallCost: 1,
    description:
      "Spend a Hope to mark a target you can see. You have Advantage on all rolls made against your marked prey for the scene.",
    effect:
      "Spend a Hope to mark a target you can see. You have Advantage on all rolls made against your marked prey for the scene.",
  },
  {
    name: "Wild Swings",
    domain: "Bone",
    type: "Ability",
    level: 1,
    recallCost: 1,
    description:
      "When you make an attack, you can do so without marking a die, but your attack is made with disadvantage.",
    effect:
      "When you make an attack, you can do so without marking a die, but your attack is made with disadvantage.",
  },
  {
    name: "Monstrous Transformation",
    domain: "Bone",
    type: "Spell",
    level: 2,
    recallCost: 1,
    description:
      "You transform into a terrifying creature. Gain +2 Strength and -1 to all social rolls.",
    effect:
      "You transform into a terrifying creature. Gain +2 Strength and -1 to all social rolls for the scene. Describe your monstrous form.",
  },

  // CODEX DOMAIN CARDS
  // The Codex domain covers knowledge, lore, and mental abilities
  {
    name: "Intellectual Superiority",
    domain: "Codex",
    type: "Ability",
    level: 1,
    recallCost: 1,
    description:
      "When you succeed on a Knowledge roll, you can spend a Hope to gain an additional piece of useful information.",
    effect:
      "When you succeed on a Knowledge roll, you can spend a Hope to gain an additional piece of useful information about the subject.",
  },
  {
    name: "Quick Learner",
    domain: "Codex",
    type: "Ability",
    level: 1,
    recallCost: 0,
    description:
      "During a rest, you can study a topic and gain temporary proficiency with it.",
    effect:
      "During a rest, you can study a topic and gain temporary proficiency with it until your next rest.",
  },
  {
    name: "Tactical Analysis",
    domain: "Codex",
    type: "Ability",
    level: 2,
    recallCost: 1,
    description: "Spend a Hope to analyze an enemy's weaknesses.",
    effect:
      "Spend a Hope to analyze an enemy's weaknesses. The GM tells you their lowest trait and one vulnerability.",
  },

  // GRACE DOMAIN CARDS
  // The Grace domain focuses on agility, finesse, and social interaction
  {
    name: "Commanding Presence",
    domain: "Grace",
    type: "Ability",
    level: 1,
    recallCost: 1,
    description:
      "When you roll with Presence, you can mark a Stress to add an extra d6 to the roll.",
    effect:
      "When you roll with Presence, you can mark a Stress to add an extra d6 to the roll.",
  },
  {
    name: "Nimble",
    domain: "Grace",
    type: "Ability",
    level: 1,
    recallCost: 0,
    description: "When you successfully dodge an attack, gain a Hope.",
    effect: "When you successfully dodge an attack, gain a Hope.",
  },
  {
    name: "Performance",
    domain: "Grace",
    type: "Ability",
    level: 1,
    recallCost: 1,
    description: "Captivate an audience with your performance.",
    effect:
      "Make a Presence roll to captivate an audience. On a success, they are Distracted by you for the scene.",
  },

  // MIDNIGHT DOMAIN CARDS
  // The Midnight domain encompasses darkness, fear, and forbidden power
  {
    name: "Embrace the Darkness",
    domain: "Midnight",
    type: "Spell",
    level: 1,
    recallCost: 0,
    description:
      "You can see perfectly in darkness and gain +1 to Evasion while in shadows.",
    effect:
      "You can see perfectly in darkness and gain +1 to Evasion while in shadows or darkness.",
  },
  {
    name: "Night Terror",
    domain: "Midnight",
    type: "Spell",
    level: 1,
    recallCost: 1,
    description:
      "Make a Spellcast roll against a target within Close range to fill them with dread.",
    effect:
      "Make a Spellcast roll against a target within Close range. On a success, they are temporarily Frightened and must move away from you on their next turn.",
  },
  {
    name: "Shadow Step",
    domain: "Midnight",
    type: "Spell",
    level: 2,
    recallCost: 1,
    description: "Teleport through shadows to an unoccupied space you can see.",
    effect:
      "Mark a Stress to teleport through shadows to an unoccupied space you can see within Far range.",
  },

  // SPLENDOR DOMAIN CARDS
  // The Splendor domain covers divine power, healing, and protection
  {
    name: "Healing Grace",
    domain: "Splendor",
    type: "Spell",
    level: 1,
    recallCost: 1,
    description: "Touch an ally to heal their wounds.",
    effect: "Touch an ally and spend a Hope. They clear a Hit Point.",
  },
  {
    name: "Holy Light",
    domain: "Splendor",
    type: "Spell",
    level: 1,
    recallCost: 0,
    description: "Create bright light that reveals hidden things.",
    effect:
      "Create bright light in a Close area for the scene. This light reveals invisible creatures and dispels illusions.",
  },
  {
    name: "Divine Shield",
    domain: "Splendor",
    type: "Spell",
    level: 2,
    recallCost: 1,
    description: "Grant divine protection to an ally.",
    effect:
      "Touch an ally. They gain +2 to their damage thresholds until they take damage.",
  },

  // VALOR DOMAIN CARDS
  // The Valor domain focuses on courage, leadership, and defensive tactics
  {
    name: "Call Them Out",
    domain: "Valor",
    type: "Ability",
    level: 1,
    recallCost: 1,
    description: "Challenge an enemy to single combat.",
    effect:
      "Choose an adversary within Far range and challenge them. They have disadvantage on attacks against anyone but you for the scene.",
  },
  {
    name: "Lead the Charge",
    domain: "Valor",
    type: "Ability",
    level: 1,
    recallCost: 0,
    description: "When you move towards danger, allies gain Hope.",
    effect:
      "When you move towards danger, each ally who can see you gains a Hope.",
  },
  {
    name: "Stand Your Ground",
    domain: "Valor",
    type: "Ability",
    level: 2,
    recallCost: 1,
    description: "You cannot be moved against your will.",
    effect:
      "Until your next turn, you cannot be moved against your will and gain +1 to Evasion.",
  },

  // Note: The SRD contains many more domain cards across all domains and levels 1-10
  // This is a representative sample including all Sage cards and selections from other domains
]
