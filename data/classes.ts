export interface ClassData {
  name: string
  domains: string[]
  foundations: string[]
  baseEvasion: number
  baseArmor: number
  baseHP: number
  baseStress: number
  description: string
  hopeFeature?: {
    name: string
    description: string
  }
}

export interface SubclassData {
  name: string
  parentClass: string
  description: string
  features: {
    name: string
    description: string
    level?: number
  }[]
}

export const DAGGERHEART_CLASSES: ClassData[] = [
  {
    name: "Bard",
    domains: ["Grace", "Codex"],
    foundations: ["Troubadour", "Wordsmith"],
    baseEvasion: 10,
    baseArmor: 0,
    baseHP: 5,
    baseStress: 5,
    description: "Bards are the most charismatic people in all the realms. Members of this class are masters of captivation and specialize in a variety of performance types, including singing, playing musical instruments, weaving tales, or telling jokes. Whether performing for an audience or speaking to an individual, bards thrive in social situations. Members of this profession bond and train at schools or guilds, but a current of egotism runs through those of the bardic persuasion. While they may be the most likely class to bring people together, a bard of ill temper can just as easily tear a party apart.",
    hopeFeature: {
      name: "Make a Scene",
      description: "Spend 3 Hope to temporarily Distract a target within Close range, giving them a -2 penalty to their Difficulty."
    }
  },
  {
    name: "Druid",
    domains: ["Sage", "Arcana"],
    foundations: ["Warden of the Elements", "Warden of Renewal"],
    baseEvasion: 10,
    baseArmor: 0,
    baseHP: 6,
    baseStress: 5,
    description: "Becoming a druid is more than an occupation; it's a calling for those who wish to learn from and protect the magic of the wilderness. While one might underestimate a gentle druid who practices the often-quiet work of cultivating flora, druids who channel the untamed forces of nature are terrifying to behold. Druids cultivate their abilities in small groups, often connected by a specific ethos or locale, but some choose to work alone. Through years of study and dedication, druids can learn to transform into beasts and shape nature itself.",
    hopeFeature: {
      name: "Evolution",
      description: "Spend 3 Hope to transform into a Beastform without marking a Stress. When you do, choose one trait to raise by +1 until you drop out of that Beastform."
    }
  },
  {
    name: "Guardian",
    domains: ["Valor", "Blade"],
    foundations: ["Stalwart", "Vengeance"],
    baseEvasion: 9,
    baseArmor: 0,
    baseHP: 7,
    baseStress: 5,
    description: "The title of guardian represents an array of martial professions, speaking more to their moral compass and unshakeable fortitude than the means by which they fight. While many guardians join groups of militants for either a country or cause, they're more likely to follow those few they truly care for, majority be damned. Guardians are known for fighting with remarkable ferocity even against overwhelming odds, defending their cohort above all else. Woe betide those who harm the ally of a guardian, as the guardian will answer this injury in kind.",
    hopeFeature: {
      name: "Frontline Tank",
      description: "Spend 3 Hope to clear 2 Armor Slots."
    }
  },
  {
    name: "Ranger",
    domains: ["Bone", "Sage"],
    foundations: ["Beastbound", "Wayfinder"],
    baseEvasion: 12,
    baseArmor: 0,
    baseHP: 6,
    baseStress: 5,
    description: "Rangers are highly skilled hunters who, despite their martial abilities, rarely lend their skills to an army. Through mastery of the body and a deep understanding of the wilderness, rangers become sly tacticians, pursuing their quarry with cunning and patience. Many rangers track and fight alongside an animal companion with whom they've forged a powerful spiritual bond. By honing their skills in the wild, rangers become expert trackers, as likely to ensnare their foes in a trap as they are to assail them head-on.",
    hopeFeature: {
      name: "Hold Them Off",
      description: "Spend 3 Hope when you succeed on an attack with a weapon to use that same roll against two additional adversaries within range of the attack."
    }
  },
  {
    name: "Rogue",
    domains: ["Midnight", "Grace"],
    foundations: ["Nightwalker", "Syndicate"],
    baseEvasion: 12,
    baseArmor: 0,
    baseHP: 6,
    baseStress: 5,
    description: "Rogues are scoundrels, often in both attitude and practice. Broadly known as liars and thieves, the best among this class move through the world anonymously. Utilizing their sharp wits and blades, rogues trick their foes through social manipulation as easily as breaking locks, climbing through windows, or dealing underhanded blows. These masters of magical craft manipulate shadow and movement, adding an array of useful and deadly tools to their repertoire. Rogues frequently establish guilds to meet future accomplices, hire out jobs, and hone secret skills, proving that there's honor among thieves for those who know where to look.",
    hopeFeature: {
      name: "Rogue's Dodge",
      description: "Spend 3 Hope to gain a +2 bonus to your Evasion until the next time an attack succeeds against you. Otherwise, this bonus lasts until your next rest."
    }
  },
  {
    name: "Seraph",
    domains: ["Splendor", "Valor"],
    foundations: ["Divine Wielder", "Winged Sentinel"],
    baseEvasion: 9,
    baseArmor: 0,
    baseHP: 7,
    baseStress: 5,
    description: "Seraphs are divine fighters and healers imbued with sacred purpose. A wide array of deities exist within the realms, and thus numerous kinds of seraphs are appointed by these gods. Their ethos traditionally aligns with the domain or goals of their god, such as defending the weak, exacting vengeance, protecting a land or artifact, or upholding a particular faith. Some seraphs ally themselves with an army or locale, much to the satisfaction of their rulers, but other crusaders fight in opposition to the follies of the Mortal Realm. It is better to be a seraph's ally than their enemy, as they are terrifying foes to those who defy their purpose.",
    hopeFeature: {
      name: "Life Support",
      description: "Spend 3 Hope to clear a Hit Point on an ally within Close range."
    }
  },
  {
    name: "Sorcerer",
    domains: ["Arcana", "Midnight"],
    foundations: ["Elemental Origin", "Primal Origin"],
    baseEvasion: 10,
    baseArmor: 0,
    baseHP: 6,
    baseStress: 5,
    description: "Not all innate magic users choose to hone their craft, but those who do can become powerful sorcerers. The gifts of these wielders are passed down through families, even if the family is unaware of or reluctant to practice them. A sorcerer's abilities can range from the elemental to the illusionary and beyond, and many practitioners band together into collectives based on their talents. The act of becoming a formidable sorcerer is not the practice of acquiring power, but learning to cultivate and control the power one already possesses. The magic of a misguided or undisciplined sorcerer is a dangerous force indeed.",
    hopeFeature: {
      name: "Volatile Magic",
      description: "Spend 3 Hope to reroll any number of your damage dice on an attack that deals magic damage."
    }
  },
  {
    name: "Warrior",
    domains: ["Blade", "Bone"],
    foundations: ["Call of the Brave", "Call of the Slayer"],
    baseEvasion: 11,
    baseArmor: 0,
    baseHP: 6,
    baseStress: 5,
    description: "Becoming a warrior requires years, often a lifetime, of training and dedication to the mastery of weapons and violence. While many who seek to fight hone only their strength, warriors understand the importance of an agile body and mind, making them some of the most sought-after fighters across the realms. Frequently, warriors find employment within an army, a band of mercenaries, or even a royal guard, but their potential is wasted in any position where they cannot continue to improve and expand their skills. Warriors are known to have a favored weapon; to come between them and their blade would be a grievous mistake.",
    hopeFeature: {
      name: "No Mercy",
      description: "Spend 3 Hope to gain a +1 bonus to your attack rolls until your next rest."
    }
  },
  {
    name: "Wizard",
    domains: ["Codex", "Splendor"],
    foundations: ["School of Knowledge", "School of War"],
    baseEvasion: 11,
    baseArmor: 0,
    baseHP: 5,
    baseStress: 5,
    description: "Whether through an institution or individual study, those known as wizards acquire and hone immense magical power over years of learning using a variety of tools, including books, stones, potions, and herbs. Some wizards dedicate their lives to mastering a particular school of magic, while others learn from a wide variety of disciplines. Many wizards become wise and powerful figures in their communities, advising rulers, providing medicines and healing, and even leading war councils. While these mages all work toward the common goal of collecting magical knowledge, wizards often have the most conflict within their own ranks, as the acquisition, keeping, and sharing of powerful secrets is a topic of intense debate that has resulted in innumerable deaths.",
    hopeFeature: {
      name: "Not This Time",
      description: "Spend 3 Hope to force an adversary within Far range to reroll an attack or damage roll."
    }
  }
]

// Note: The SRD may contain additional free classes that should be added here
// Please check the PDF for any classes not already included above

// Subclasses (Foundations) from the SRD
// Note: Foundations are the subclass equivalent in Daggerheart
// Each foundation provides unique features and progression paths
export const DAGGERHEART_SUBCLASSES: SubclassData[] = [
  // Bard Foundations
  {
    name: "Troubadour",
    parentClass: "Bard",
    description: "Play the Troubadour if you want to support and inspire your allies.",
    features: [
      {
        name: "Virtuoso's Control",
        description: "After you succeed on an action roll using a musical instrument, mark a Hope.",
        level: 1
      },
      {
        name: "Replenishing Song",
        description: "During a rest, spend a Hope to describe an inspiring performance. When you do, you and any allies who witnessed it clear an additional Stress, or a PC who witnessed it can clear a Hit Point.",
        level: 1
      },
      {
        name: "Rousing Anthem",
        description: "When you succeed on an action with an Experience related to your performance, all PCs who can hear you can clear a Stress.",
        level: 3
      },
      {
        name: "Song of Hope",
        description: "Once per long rest, mark a Stress to play a song and give every PC in your party who hears it a Hope.",
        level: 5
      }
    ]
  },
  {
    name: "Wordsmith",
    parentClass: "Bard",
    description: "Play the Wordsmith if you want to use the power of your words to confuse and harm.",
    features: [
      {
        name: "Sharp Tongue",
        description: "Once per scene on an Instinct Roll, you can have your words cut someone down to size. Spend a Hope to make this roll at advantage and add your proficiency.",
        level: 1
      },
      {
        name: "Sow Doubt",
        description: "Once per long rest, when you critically succeed on a Presence roll against an adversary within Close range, the GM tells you their greatest fear. You can spend 2 Hope to temporarily make the target Vulnerable.",
        level: 1
      },
      {
        name: "Confusion",
        description: "You can make a Spellcast Roll against an adversary within Close range. On a success, the target cannot tell the difference between their allies and their enemies and will lash out at the closest creature to them on their next turn.",
        level: 3
      },
      {
        name: "Deadly Vulgarity",
        description: "Once per long rest, when you deal damage with your words to an adversary, double the result.",
        level: 5
      }
    ]
  },
  
  // Druid Foundations
  {
    name: "Warden of the Elements",
    parentClass: "Druid",
    description: "Play the Warden of the Elements if you want to command and shape the natural world.",
    features: [
      {
        name: "Nature's Wrath",
        description: "When you make a Spellcast Roll and deal damage with the spell, you can add your proficiency to the damage. When you do, mark a Stress.",
        level: 1
      },
      {
        name: "Elemental Surge",
        description: "Whenever you mark your last Stress, describe how your magic goes momentarily out of control as you are overwhelmed with elemental energy.",
        level: 1
      },
      {
        name: "Unleash the Elements",
        description: "When you use your Elemental Surge feature, spend a Hope to target all Close adversaries. Make a Spellcast Roll against each, dealing 2d10 magic damage on a success.",
        level: 3
      },
      {
        name: "Master of Elements",
        description: "Once per session, when you channel elemental energy, clear all of your marked Stress.",
        level: 5
      }
    ]
  },
  {
    name: "Warden of Renewal",
    parentClass: "Druid",
    description: "Play the Warden of Renewal if you want to shape-shift and support your allies.",
    features: [
      {
        name: "Beastform",
        description: "Mark a Stress to take on a Beastform. Choose a trait to specialize in while in this form, and take +2 on rolls with it.",
        level: 1
      },
      {
        name: "Rejuvenating Touch",
        description: "Spend a Hope to describe how you use natural materials or magic to help an ally, then clear a Hit Point on them.",
        level: 1
      },
      {
        name: "Lick Your Wounds",
        description: "Once per short rest, while in Beastform, spend a Hope to clear 2 Hit Points on yourself.",
        level: 3
      },
      {
        name: "Nature's Gift",
        description: "Once per long rest, spend a Hope during a rest to allow all PCs to clear 2 Stress and 2 Hit Points.",
        level: 5
      }
    ]
  },
  
  // Guardian Foundations
  {
    name: "Stalwart",
    parentClass: "Guardian",
    description: "Play the Stalwart if you want to protect others and be the shield that guards them from harm.",
    features: [
      {
        name: "Protector",
        description: "When an ally within Very Close range of you is attacked, spend your reaction to move into the path of danger. You become the new target of the attack and take +1 to your Evasion against it.",
        level: 1
      },
      {
        name: "Shield Bash",
        description: "Make a Finesse attack using a shield. On a success, temporarily make the target Vulnerable.",
        level: 1
      },
      {
        name: "Protective Taunt",
        description: "Once per short rest, you can mark 2 Stress to force all adversaries within Very Close range to attack you (if possible) until your next turn.",
        level: 3
      },
      {
        name: "Immovable Object",
        description: "When you would become Vulnerable, Restrained, or Stunned, spend 2 armor slots to ignore the effect.",
        level: 5
      }
    ]
  },
  {
    name: "Vengeance",
    parentClass: "Guardian",
    description: "Play Vengeance if you want to punish those who harm your allies and serve justice.",
    features: [
      {
        name: "Retribution",
        description: "Mark Vendetta on an adversary that damages you or an ally. Take +1 to damage against an adversary you've marked with Vendetta.",
        level: 1
      },
      {
        name: "Relentless",
        description: "Mark a Stress when moving into Close range of an adversary marked with Vendetta to also make a weapon attack against them.",
        level: 1
      },
      {
        name: "Share the Pain",
        description: "When you take damage from an adversary marked with Vendetta, you can mark a Stress to deal 1d6 damage to them.",
        level: 3
      },
      {
        name: "Never Forgive",
        description: "Your Vendetta damage bonus increases to +3. Once per scene, when you defeat an adversary marked with Vendetta, describe your victory and mark Vendetta on another adversary.",
        level: 5
      }
    ]
  },
  
  // Ranger Foundations
  {
    name: "Beastbound",
    parentClass: "Ranger",
    description: "Play the Beastbound if you want to form a deep bond with an animal ally.",
    features: [
      {
        name: "Companion",
        description: "You have an animal companion of your choice (at the GM's discretion). They stay by your side unless you tell them otherwise.\n\nTake the Ranger Companion sheet. When you level up your character, choose a level-up option for your companion from this sheet as well.",
        level: 1
      },
      {
        name: "Expert Training",
        description: "Choose an additional level-up option for your companion.",
        level: 3
      },
      {
        name: "Battle-Bonded",
        description: "When an adversary attacks you while they're within your companion's Melee range, you gain a +2 bonus to your Evasion against the attack.",
        level: 3
      },
      {
        name: "Advanced Training",
        description: "Choose two additional level-up options for your companion.",
        level: 5
      },
      {
        name: "Loyal Friend",
        description: "Once per long rest, when the damage from an attack would mark your companion's last Stress or your last Hit Point and you're within Close range of each other, you or your companion can rush to the other's side and take that damage instead.",
        level: 5
      }
    ]
  },
  {
    name: "Wayfinder",
    parentClass: "Ranger",
    description: "Play the Wayfinder if you want to guide your party and track your prey.",
    features: [
      {
        name: "Tracker",
        description: "When you spend a Hope to track a creature, you know exactly where it went. The GM will describe its path and current location.",
        level: 1
      },
      {
        name: "Ranger's Focus",
        description: "Mark a Stress to study a creature and mark your Focus on it. Against this target, always succeed on attacks with Hope.",
        level: 1
      },
      {
        name: "Hunter's Mark",
        description: "You can mark Focus on a number of creatures equal to your proficiency tier.",
        level: 3
      },
      {
        name: "Never Lose the Trail",
        description: "You can sense the exact location of any creature you've marked with Focus within ten miles. Once per long rest, you can teleport to appear within Close range of a marked creature.",
        level: 5
      }
    ]
  },
  
  // Selected additional foundations...
  {
    name: "Nightwalker",
    parentClass: "Rogue",
    description: "Play the Nightwalker if you want to become one with the shadows.",
    features: [
      {
        name: "Shadow",
        description: "When you are hidden and concealed within darkness, enemies must roll with disadvantage to find you.",
        level: 1
      },
      {
        name: "Cheap Shot",
        description: "If you're hidden from your target before an attack, mark a Stress to add an extra damage die to the roll.",
        level: 1
      },
      {
        name: "Smoke Bomb",
        description: "Once per short rest, spend a Hope to throw a smoke bomb that creates concealment in a Close area for the scene.",
        level: 3
      },
      {
        name: "Master of Shadows",
        description: "Once per long rest, become invisible for one minute or until you attack or cast a spell.",
        level: 5
      }
    ]
  }
  
  // Note: The SRD contains foundations for all classes
  // This is a representative sample of the available foundations
]
