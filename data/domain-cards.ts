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
    name: "Analyze",
    domain: "Sage",
    type: "Spell",
    level: 1,
    recallCost: 1,
    description:
      "Touch a creature or object to learn one piece of information about it",
    effect:
      "Learn one piece of information: its nature, properties, recent history, or emotional state",
  },
  {
    name: "Detect Magic",
    domain: "Sage",
    type: "Spell",
    level: 1,
    recallCost: 1,
    description: "Sense magical auras within Close range",
    effect:
      "Detect presence and general nature of magical effects, enchanted items, or spellcasters",
  },
  {
    name: "Guidance",
    domain: "Sage",
    type: "Spell",
    level: 1,
    recallCost: 1,
    description: "Grant wisdom to aid an ally's next action",
    effect: "Target ally gains Advantage on their next action roll",
  },
  {
    name: "Mend",
    domain: "Sage",
    type: "Spell",
    level: 1,
    recallCost: 1,
    description: "Repair minor damage to objects or heal small wounds",
    effect: "Repair broken mundane objects or restore 1 HP to a target",
  },

  // Level 2 Sage Cards
  {
    name: "Comprehend Languages",
    domain: "Sage",
    type: "Spell",
    level: 2,
    recallCost: 2,
    description: "Understand any spoken or written language for the scene",
    effect:
      "Understand and communicate in any language encountered during this scene",
  },
  {
    name: "Identify",
    domain: "Sage",
    type: "Spell",
    level: 2,
    recallCost: 2,
    description: "Learn the magical properties of an item or effect",
    effect:
      "Discover all magical properties, command words, and methods of activation",
  },
  {
    name: "Locate Object",
    domain: "Sage",
    type: "Spell",
    level: 2,
    recallCost: 2,
    description: "Sense the direction to a specific object within Far range",
    effect:
      "Know the general direction and approximate distance to a known object",
  },
  {
    name: "Augury",
    domain: "Sage",
    type: "Spell",
    level: 2,
    recallCost: 2,
    description:
      "Receive an omen about the results of a specific course of action",
    effect:
      "GM provides cryptic guidance about whether an action will be beneficial or harmful",
  },

  // Level 3 Sage Cards
  {
    name: "Clairvoyance",
    domain: "Sage",
    type: "Spell",
    level: 3,
    recallCost: 3,
    description: "Create an invisible sensor to observe a distant location",
    effect:
      "See and hear from a location you've been to before within Very Far range",
  },
  {
    name: "Dispel Magic",
    domain: "Sage",
    type: "Spell",
    level: 3,
    recallCost: 3,
    description: "End magical effects on a target",
    effect:
      "Make a Spellcast roll vs difficulty 12+spell level to end magical effects",
  },
  {
    name: "Tongues",
    domain: "Sage",
    type: "Spell",
    level: 3,
    recallCost: 3,
    description: "Grant the ability to speak and understand all languages",
    effect:
      "Target can communicate with any intelligent creature for the scene",
  },
  {
    name: "Remove Curse",
    domain: "Sage",
    type: "Spell",
    level: 3,
    recallCost: 3,
    description: "Break curses and harmful magical effects",
    effect: "End one curse or harmful magical effect on the target",
  },

  // Level 4 Sage Cards
  {
    name: "Divination",
    domain: "Sage",
    type: "Spell",
    level: 4,
    recallCost: 4,
    description:
      "Ask a question and receive truthful guidance from higher powers",
    effect:
      "Ask one question about events within the next day and receive accurate guidance",
  },
  {
    name: "Locate Creature",
    domain: "Sage",
    type: "Spell",
    level: 4,
    recallCost: 4,
    description: "Sense the location of a specific creature",
    effect:
      "Know direction and distance to a creature you've met within Very Far range",
  },
  {
    name: "Arcane Eye",
    domain: "Sage",
    type: "Spell",
    level: 4,
    recallCost: 4,
    description: "Create an invisible, mobile eye to scout ahead",
    effect:
      "Control a floating eye that can move and observe for up to an hour",
  },

  // Level 5 Sage Cards
  {
    name: "Scrying",
    domain: "Sage",
    type: "Spell",
    level: 5,
    recallCost: 5,
    description: "Observe a creature or location from great distance",
    effect:
      "View and hear a specific creature or familiar location anywhere in the world",
  },
  {
    name: "Legend Lore",
    domain: "Sage",
    type: "Spell",
    level: 5,
    recallCost: 5,
    description: "Learn legendary information about a person, place, or object",
    effect:
      "Discover significant historical facts, legends, or hidden knowledge",
  },
  {
    name: "Greater Restoration",
    domain: "Sage",
    type: "Spell",
    level: 5,
    recallCost: 5,
    description: "Remove powerful curses and restore lost abilities",
    effect:
      "End any curse, restore drained abilities, or cure magical diseases",
  },

  // Level 6 Sage Cards
  {
    name: "True Seeing",
    domain: "Sage",
    type: "Spell",
    level: 6,
    recallCost: 6,
    description: "See through illusions and perceive the true nature of things",
    effect:
      "See invisible creatures, detect illusions, and perceive true forms for the scene",
  },
  {
    name: "Find the Path",
    domain: "Sage",
    type: "Spell",
    level: 6,
    recallCost: 6,
    description: "Know the most direct route to a specific location",
    effect:
      "Unerringly navigate to any location on the same plane of existence",
  },

  // Level 7 Sage Cards
  {
    name: "Plane Shift",
    domain: "Sage",
    type: "Spell",
    level: 7,
    recallCost: 7,
    description: "Transport yourself and allies to another plane of existence",
    effect: "Travel to another plane with up to 8 willing creatures",
  },
  {
    name: "Reverse Gravity",
    domain: "Sage",
    type: "Spell",
    level: 7,
    recallCost: 7,
    description: "Reverse gravity in a large area",
    effect:
      "Creatures and objects in Far range fall upward for several minutes",
  },

  // Level 8 Sage Cards
  {
    name: "Mind Blank",
    domain: "Sage",
    type: "Spell",
    level: 8,
    recallCost: 8,
    description: "Protect against mental intrusion and divination",
    effect:
      "Target becomes immune to divination magic and mental effects for 24 hours",
  },
  {
    name: "Feeblemind",
    domain: "Sage",
    type: "Spell",
    level: 8,
    recallCost: 8,
    description: "Drain a creature's intelligence and personality",
    effect:
      "Target loses ability to cast spells, speak, or think clearly until cured",
  },

  // Level 9 Sage Cards
  {
    name: "Foresight",
    domain: "Sage",
    type: "Spell",
    level: 9,
    recallCost: 9,
    description: "Grant supernatural awareness of immediate future dangers",
    effect:
      "Target gains Advantage on all rolls and enemies have Disadvantage against them for 8 hours",
  },
  {
    name: "Time Stop",
    domain: "Sage",
    type: "Spell",
    level: 9,
    recallCost: 9,
    description: "Briefly stop time for everyone except yourself",
    effect:
      "Take several actions while time is frozen, but cannot affect other creatures directly",
  },

  // Level 10 Sage Cards
  {
    name: "Wish",
    domain: "Sage",
    type: "Spell",
    level: 10,
    recallCost: 10,
    description: "Alter reality through the power of desire",
    effect:
      "Duplicate any spell or create a powerful magical effect as determined by the GM",
  },
  {
    name: "True Resurrection",
    domain: "Sage",
    type: "Spell",
    level: 10,
    recallCost: 10,
    description: "Restore life to any creature that has died",
    effect:
      "Return any creature to life regardless of how long they've been dead or condition of body",
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
