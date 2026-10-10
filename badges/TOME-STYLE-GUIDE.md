# Tome Vault style customization (script-only)

Edit `tome-settings.js` and refresh the site. There is intentionally no customization button or settings panel in the website.

## Most useful settings
- `CONFIG.card.background`, `textColor`, `nameColor`, `rarityTextColor`: card and text colors.
- `CONFIG.card.glowColor`, `glowStrength`: card glow color and strength (0 to 1).
- `CONFIG.text.nameGlowStrength`, `rarityGlowStrength`, `titleGlowStrength`: independently control text glow (0 turns it off).
- `CONFIG.detail.background`, `textColor`, `borderColor`, `glowStrength`: popup appearance.
- `CONFIG.effects`: switch card glow, image glow, text glow, lift, scale, shine, entrance animation, special rarity animation, and hover sounds on/off.
- `CONFIG.rarityStyles`: optional per-rarity overrides. Keep rarity names exactly the same as in `custom-tomes.js`.

## Add another custom rarity style

Add an entry inside `CONFIG.rarityStyles`:

```js
'COSMIC!': {
  textColor: '#7df9ff',
  cardBackground: '#07131b',
  borderColor: '#39e8ff',
  glowColor: '#00cfff',
  glowStrength: 0.8,
  textGlowColor: '#7df9ff',
  textGlowStrength: 0.7,
  animation: 'none' // 'none', 'glitch', or 'rainbow'
}
```

Then use `rarity: 'COSMIC!'` in a tome object in `custom-tomes.js`.

## Quick examples
- No card glow: `cardGlow: false`
- No rarity animations, while keeping their colors: `specialRarityAnimations: false`
- No text glow: `textGlow: false` or set all three text glow strengths to `0`
- No hover lift: `hoverLift: false`
- Make images fill their art frame: `imageFit: 'cover'`
