/*
 * TOME VAULT — CUSTOM TOMES
 * ------------------------------------------------------------------
 * Add/remove tomes in this array. Every tome can have its OWN appearance.
 * Image/audio paths are relative to the website root; GIFs and still images work.
 * Omit any appearance option to inherit the normal vault default / rarity look.
 *
 * PER-TOME appearance options:
 * cardBackground, cardHoverBackground, textColor, nameColor, rarityColor,
 * categoryColor, borderColor, borderHoverColor, borderWidth, radius,
 * shadow, hoverShadow, glowColor, glowStrength (0-1),
 * nameGlowColor, nameGlowStrength (0-1), rarityGlowColor, rarityGlowStrength (0-1),
 * imageGlowColor, imageGlowStrength (0-1), imageFit ('contain'|'cover'),
 * detailBackground, detailTextColor, detailBorderColor, detailTitleColor,
 * detailKickerColor, detailSectionColor, detailImageBackground, detailImageFit,
 * detailRadius, detailBorderWidth, detailShadow, detailGlowColor, detailGlowStrength,
 * disableRarityAnimation: true (keeps rarity colors, disables its animation),
 * animation: 'none' (alias for disableRarityAnimation),
 * cardAnimation / nameAnimation / rarityAnimation: optional CSS animation values.
 *
 * Example animation: 'pulse 1.5s ease-in-out infinite' (define @keyframes pulse in style.css).
 */
window.ECHO_CUSTOM_TOMES = [
  {
    id: "forbidden-glitch",
    name: "TEARS OF THE WEEPING",
    image: "tomes/Tears.gif",
    rarity: "FG!",
    category: "Custom!",
    description: "This was made to honor Kuya for the pain that he had to endure to be with us today.",
    lore: "There's no lore behind TEARS OF THE WEEPING.",
    unlockCondition: "Can be given by Kuya.",
    hoverSound: "tomes/vidu-video-3500559398996746 (1).mp3",
    appearance: {
      // This tome's individual look. Change any values or delete this block to use defaults.
      cardBackground: "#160608",
      cardHoverBackground: "#24070c",
      textColor: "#fff0f0",
      nameColor: "#ffffff",
      rarityColor: "#ff303b",
      categoryColor: "#ff9aa2",
      borderColor: "#8f1420",
      borderHoverColor: "#ff202d",
      borderWidth: 1,
      radius: 18,
      shadow: "0 10px 28px rgba(0,0,0,.24)",
      hoverShadow: "0 14px 36px rgba(0,0,0,.35)",
      glowColor: "#ff1010",
      glowStrength: 0.85,
      nameGlowColor: "#ff2525",
      nameGlowStrength: 0.25,
      rarityGlowColor: "#ff2020",
      rarityGlowStrength: 0.95,
      imageGlowColor: "#ff2020",
      imageGlowStrength: 0.35,
      imageFit: "contain",
      detailBackground: "#100609",
      detailTextColor: "#fff0f0",
      detailBorderColor: "#ff202d",
      detailTitleColor: "#ffffff",
      detailKickerColor: "#ff6b77",
      detailSectionColor: "#ff858c",
      detailImageBackground: "#19090c",
      detailImageFit: "contain",
      detailRadius: 22,
      detailBorderWidth: 1,
      detailShadow: "0 28px 90px rgba(0,0,0,.7)",
      detailGlowColor: "#ff1010",
      detailGlowStrength: 0.3,
      disableRarityAnimation: false
    }
  },
  {
    id: "the-forbidden-cat",
    name: "FALP THE CAT",
    image: "tomes/cat.png",
    rarity: "MEME-X!",
    category: "WTF IS THIS.",
    description: "This dumb cat gives you 80 Cosma per minute.",
    lore: "He was once a normal cat who now has 5,000 cases of rabies, which made him look stupid.",
    unlockCondition: "Can be tamed only on spooky J.S. weeks or Halloween.",
    hoverSound: "tomes/hoversound.mp3",
    appearance: {
      // A completely different look for this card and its details panel.
      cardBackground: "#10091c",
      cardHoverBackground: "#1c1030",
      textColor: "#fffaff",
      nameColor: "#fffaff",
      rarityColor: "#ff70df",
      categoryColor: "#b9a5d8",
      borderColor: "#5c347b",
      borderHoverColor: "#ff54e8",
      borderWidth: 1,
      radius: 14,
      shadow: "0 8px 24px rgba(0,0,0,.25)",
      hoverShadow: "0 16px 42px rgba(0,0,0,.4)",
      glowColor: "#b84cff",
      glowStrength: 0.65,
      nameGlowColor: "#ff54e8",
      nameGlowStrength: 0.45,
      rarityGlowColor: "#ff54e8",
      rarityGlowStrength: 0.9,
      imageGlowColor: "#ff54e8",
      imageGlowStrength: 0.7,
      imageFit: "contain",
      detailBackground: "#0d0815",
      detailTextColor: "#f9eaff",
      detailBorderColor: "#d94cff",
      detailTitleColor: "#ffffff",
      detailKickerColor: "#4ce8cb",
      detailSectionColor: "#f17bff",
      detailImageBackground: "#160d22",
      detailImageFit: "contain",
      detailRadius: 24,
      detailBorderWidth: 1,
      detailShadow: "0 28px 90px rgba(0,0,0,.72)",
      detailGlowColor: "#b84cff",
      detailGlowStrength: 0.45,
      disableRarityAnimation: false
    }
  },
  {
    id: "the-puckofall-cat",
    name: "PUCK",
    image: "tomes/puck.gif",
    rarity: "J,S!",
    category: "JJX!",
    description: "This Puck unlocks you spooky week  every weekend without waiting on halloween!",
    lore: "He's a kishin friendly puck that sleeps on top of you're kishin head or floats next to you",
    unlockCondition: "Can be tamed only on spooky J.S. weeks or Halloween.",
    hoverSound: "tomes/puck.mp3",
    appearance: {
      // A completely different look for this card and its details panel.
      cardBackground: "#10091c",
      cardHoverBackground: "#1c1030",
      textColor: "#b094ff",
      nameColor: "#fffd94",
      rarityColor: "#fffd94",
      categoryColor: "#ffffff",
      borderColor: "#fffd94",
      borderHoverColor: "#ffffff",
      borderWidth: 1,
      radius: 14,
      shadow: "0 8px 24px rgba(0,0,0,.25)",
      hoverShadow: "0 16px 42px rgba(0,0,0,.4)",
      glowColor: "#fffd94",
      glowStrength: 0.65,
      nameGlowColor: "#b094ff",
      nameGlowStrength: 0.45,
      rarityGlowColor: "#fffd94",
      rarityGlowStrength: 0.9,
      imageGlowColor: "#fffd94",
      imageGlowStrength: 0.7,
      imageFit: "contain",
      detailBackground: "#0d0815",
      detailTextColor: "#f9eaff",
      detailBorderColor: "#d94cff",
      detailTitleColor: "#ffffff",
      detailKickerColor: "#4ce8cb",
      detailSectionColor: "#f17bff",
      detailImageBackground: "#160d22",
      detailImageFit: "contain",
      detailRadius: 24,
      detailBorderWidth: 1,
      detailShadow: "0 28px 90px rgba(0,0,0,.72)",
      detailGlowColor: "#b84cff",
      detailGlowStrength: 0.45,
      disableRarityAnimation: false
    }
  },
  {
    id: "the-calavera-tome",
    name: "CALAVERA",
    image: "tomes/calavera.png",
    rarity: "J,S!",
    category: "H.I.T!",
    description: "This Calavera unlocks you spooky week every weekend without waiting on halloween!",
    lore: "He's a dapper, kishin friendly sugar skull that floats next to you or tips his festive top hat while resting on top of you're kishin head.",
    unlockCondition: "Can be tamed only on spooky J.S. weeks or Halloween.",
    hoverSound: "tomes/hoversound.mp3",
    appearance: {
      // Custom festive Day of the Dead palette matching his purple, gold, and pink design.
      cardBackground: "#0d0214",       // Deepest twilight purple
      cardHoverBackground: "#1e052e",  // Rich violet expansion on hover
      textColor: "#e6bdff",            // Soft lavender for readability
      nameColor: "#ffd700",            // Radiant marigold gold
      rarityColor: "#ff2a85",          // Vibrant skull-accent pink
      categoryColor: "#ffffff",        // Crisp bone white
      borderColor: "#ffd700",          // Gold borders
      borderHoverColor: "#ff2a85",     // Swaps to glowing pink on hover
      borderWidth: 1,
      radius: 14,
      shadow: "0 8px 24px rgba(0,0,0,.45)",
      hoverShadow: "0 16px 42px rgba(255,42,133,.3)", // Pink-tinted shadow glow
      glowColor: "#ffd700",            // Gold card glow
      glowStrength: 0.7,
      nameGlowColor: "#ffd700",         // Gold text glow
      nameGlowStrength: 0.5,
      rarityGlowColor: "#ff2a85",       // Intense pink rarity glow
      rarityGlowStrength: 0.9,
      imageGlowColor: "#9d00ff",       // Deep purple eye-glow background effect
      imageGlowStrength: 0.8,
      imageFit: "contain",
      detailBackground: "#09010e",
      detailTextColor: "#f6e6ff",
      detailBorderColor: "#ff2a85",
      detailTitleColor: "#ffffff",
      detailKickerColor: "#ffd700",
      detailSectionColor: "#ff2a85",
      detailImageBackground: "#170324",
      detailImageFit: "contain",
      detailRadius: 24,
      detailBorderWidth: 1,
      detailShadow: "0 28px 90px rgba(0,0,0,.85)",
      detailGlowColor: "#9d00ff",       // Spectral purple ambient glow
      detailGlowStrength: 0.55,
      disableRarityAnimation: false
    }
  },
    {
    id: "the-one-who-drew-it",
    name: "THE ONE WHO DREW IT",
    image: "tomes/the_one_who_drew_it.png",
    rarity: "The end.",
    category: "E,G,B,S",
    description: "This Tome Grants you 6M cosma,89M DEATH ROLNA + all the Legnds roles.",
    lore: "PLACEHOLDER_LORE",
    unlockCondition: "Can be tamed only By geting every J.L badge.",
    hoverSound: "tomes/hoversound.mp3",
    appearance: {
      // Dark corrupted theme focusing strictly on deep blacks and glowing blues
      cardBackground: "#05070a",       // Pure obsidian black
      cardHoverBackground: "#0b111a",  // Shadowy dark blue-gray on hover
      textColor: "#89b4fa",            // Clear, readable ice blue
      nameColor: "#00d2ff",            // Sharp neon blue
      rarityColor: "#0055ff",          // Deep sapphire blue
      categoryColor: "#ffffff",        // Crisp bone white
      borderColor: "#00d2ff",          // Neon blue border
      borderHoverColor: "#ffffff",     // Shifts to stark white on hover
      borderWidth: 1,
      radius: 14,
      shadow: "0 8px 24px rgba(0,0,0,.6)",
      hoverShadow: "0 16px 42px rgba(0,210,255,.25)", // Soft neon blue shadow casting
      glowColor: "#00d2ff",            // Electric blue card glow
      glowStrength: 0.75,
      nameGlowColor: "#0055ff",         // Deep blue text glow
      nameGlowStrength: 0.5,
      rarityGlowColor: "#00d2ff",       // Intense neon blue rarity glow
      rarityGlowStrength: 0.85,
      imageGlowColor: "#030a16",       // Deep black-blue image backdrop
      imageGlowStrength: 0.6,
      imageFit: "contain",
      detailBackground: "#020407",
      detailTextColor: "#cdd6f4",
      detailBorderColor: "#0055ff",
      detailTitleColor: "#ffffff",
      detailKickerColor: "#00d2ff",
      detailSectionColor: "#0055ff",
      detailImageBackground: "#080d16",
      detailImageFit: "contain",
      detailRadius: 24,
      detailBorderWidth: 1,
      detailShadow: "0 28px 90px rgba(0,0,0,.9)",
      detailGlowColor: "#00d2ff",       // Striking blue outline glow for the panel
      detailGlowStrength: 0.5,
      disableRarityAnimation: false
    }
  },
   {
    id: "hash-pronn",
    name: "MR. HASH PRONN",
    image: "tomes/hash_pronn.png",
    rarity: "Secret Menu",
    category: "The [Secret Menu]",
    description: "This Tome Grants you 9,890 luck during warm weekend. + Keeping the cat",
    lore: "Menu: Who dosen't want there loaf of cat to be extra fluffy? I surely do",
    unlockCondition: "Can be tamed only By Rolling the Paws & Potatoes market place during warm weekends!",
    hoverSound: "tomes/hoversound.mp3",
    appearance: {
      // Dark corrupted theme focusing strictly on deep blacks and glowing blues
      cardBackground: "#05070a",       // Pure obsidian black
      cardHoverBackground: "#0b111a",  // Shadowy dark blue-gray on hover
      textColor: "#89b4fa",            // Clear, readable ice blue
      nameColor: "#00d2ff",            // Sharp neon blue
      rarityColor: "#0055ff",          // Deep sapphire blue
      categoryColor: "#ffffff",        // Crisp bone white
      borderColor: "#00d2ff",          // Neon blue border
      borderHoverColor: "#ffffff",     // Shifts to stark white on hover
      borderWidth: 1,
      radius: 14,
      shadow: "0 8px 24px rgba(0,0,0,.6)",
      hoverShadow: "0 16px 42px rgba(0,210,255,.25)", // Soft neon blue shadow casting
      glowColor: "#00d2ff",            // Electric blue card glow
      glowStrength: 0.75,
      nameGlowColor: "#0055ff",         // Deep blue text glow
      nameGlowStrength: 0.5,
      rarityGlowColor: "#00d2ff",       // Intense neon blue rarity glow
      rarityGlowStrength: 0.85,
      imageGlowColor: "#030a16",       // Deep black-blue image backdrop
      imageGlowStrength: 0.6,
      imageFit: "contain",
      detailBackground: "#020407",
      detailTextColor: "#cdd6f4",
      detailBorderColor: "#0055ff",
      detailTitleColor: "#ffffff",
      detailKickerColor: "#00d2ff",
      detailSectionColor: "#0055ff",
      detailImageBackground: "#080d16",
      detailImageFit: "contain",
      detailRadius: 24,
      detailBorderWidth: 1,
      detailShadow: "0 28px 90px rgba(0,0,0,.9)",
      detailGlowColor: "#00d2ff",       // Striking blue outline glow for the panel
      detailGlowStrength: 0.5,
      disableRarityAnimation: false
    }
  },
  {
    id: "loaf-of-catt",
    name: "LOAF OF CAT",
    image: "tomes/loaf_of_cat.png",
    rarity: "Secret Menu",
    category: "The [Secret Menu]",
    description: "This Tome Grants you're kishin 50M cosma for 8 hours if eaten.",
    lore: "Menu: Hash pronn extra crispy!",
    unlockCondition: "Can be tamed only By Rolling the Paws & Potatoes market place during warm weekends!",
    hoverSound: "tomes/hoversound.mp3",
    appearance: {
      // Dark corrupted theme focusing strictly on deep blacks and glowing blues
      cardBackground: "#05070a",       // Pure obsidian black
      cardHoverBackground: "#0b111a",  // Shadowy dark blue-gray on hover
      textColor: "#89b4fa",            // Clear, readable ice blue
      nameColor: "#00d2ff",            // Sharp neon blue
      rarityColor: "#0055ff",          // Deep sapphire blue
      categoryColor: "#ffffff",        // Crisp bone white
      borderColor: "#00d2ff",          // Neon blue border
      borderHoverColor: "#ffffff",     // Shifts to stark white on hover
      borderWidth: 1,
      radius: 14,
      shadow: "0 8px 24px rgba(0,0,0,.6)",
      hoverShadow: "0 16px 42px rgba(0,210,255,.25)", // Soft neon blue shadow casting
      glowColor: "#00d2ff",            // Electric blue card glow
      glowStrength: 0.75,
      nameGlowColor: "#0055ff",         // Deep blue text glow
      nameGlowStrength: 0.5,
      rarityGlowColor: "#00d2ff",       // Intense neon blue rarity glow
      rarityGlowStrength: 0.85,
      imageGlowColor: "#030a16",       // Deep black-blue image backdrop
      imageGlowStrength: 0.6,
      imageFit: "contain",
      detailBackground: "#020407",
      detailTextColor: "#cdd6f4",
      detailBorderColor: "#0055ff",
      detailTitleColor: "#ffffff",
      detailKickerColor: "#00d2ff",
      detailSectionColor: "#0055ff",
      detailImageBackground: "#080d16",
      detailImageFit: "contain",
      detailRadius: 24,
      detailBorderWidth: 1,
      detailShadow: "0 28px 90px rgba(0,0,0,.9)",
      detailGlowColor: "#00d2ff",       // Striking blue outline glow for the panel
      detailGlowStrength: 0.5,
      disableRarityAnimation: false
    }
  },
    {
    id: "the-shrine",
    name: "SHRINE",
    image: "tomes/shrine.png",
    rarity: "D,H",
    category: "Darkless halls",
    description: "This Tome Turns you're unhatched kishin into you're very own customizeable skin and rollable stats for you're very own kishin. you give a dup of 5 copies.",
    lore: "PLACEHOLDER_LORE",
    unlockCondition: "Can be tamed only on Darkless halls market place.",
    hoverSound: "tomes/shrine.mp3",
    appearance: {
      cardBackground: "#05020a",       // Void black with a hint of midnight violet
      cardHoverBackground: "#110521",  // Shadowy forbidden purple on hover
      textColor: "#d0b3ff",            // Pale lavender for sharp contrast and legibility
      nameColor: "#bf40ff",            // Radiant high-frequency purple
      rarityColor: "#7a00cc",          // Deep royal amethyst
      categoryColor: "#ffffff",        // Pristine bone white
      borderColor: "#bf40ff",          // Glowing purple runic border
      borderHoverColor: "#ffffff",     // Snaps to stark white illumination on hover
      borderWidth: 1,
      radius: 14,
      shadow: "0 8px 24px rgba(0,0,0,.7)",
      hoverShadow: "0 16px 42px rgba(191,64,255,.25)", // Soft purple ambient shadow drop
      glowColor: "#bf40ff",            // Eerie purple energy card glow
      glowStrength: 0.8,
      nameGlowColor: "#7a00cc",         // Dark purple text under-glow
      nameGlowStrength: 0.55,
      rarityGlowColor: "#bf40ff",       // Intense neon violet rarity glow
      rarityGlowStrength: 0.9,
      imageGlowColor: "#0a0314",       // Pitch-black image backdrop chamber
      imageGlowStrength: 0.65,
      imageFit: "contain",
      detailBackground: "#030107",
      detailTextColor: "#ebd9ff",
      detailBorderColor: "#7a00cc",
      detailTitleColor: "#ffffff",
      detailKickerColor: "#bf40ff",
      detailSectionColor: "#7a00cc",
      detailImageBackground: "#0b0417",
      detailImageFit: "contain",
      detailRadius: 24,
      detailBorderWidth: 1,
      detailShadow: "0 28px 90px rgba(0,0,0,.95)",
      detailGlowColor: "#bf40ff",       // Striking dark magic border highlight
      detailGlowStrength: 0.55,
      disableRarityAnimation: false
    }
  }
];
