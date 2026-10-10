# ECHO//SHARE Badge Vault

The badge system is split into two files so it stays easy to customize:

- `badges/badge-system.js` — badge data, image URIs, rarity, descriptions, unlock info, and optional hover sounds.
- `badges/badge-ui.js` — gallery rendering, search/rarity filters, hover/tap details, effects, and the developer-message overlay.

## Customize badges

Edit `window.ECHO_BADGE_CONFIG` in `badges/badge-system.js`. Each badge supports:

- `imageUri`: image URL or site-relative path (SVG data URIs are also supported).
- `hoverSoundUri`: optional audio URL/path for that badge.
- `rarity`, `category`, `description`, `howToEarn`, `customClass`.

Global options in `settings` include `playHoverSound`, `hoverSoundUri`, `showDescription`, and `showHowToEarn`. Hover audio is off by default. Browsers require a user gesture before audio can play.

You can also add/update badges from another script after the page loads:

```js
EchoBadgeSystem.addBadge({
  id: "my-custom-badge",
  name: "My Custom Badge",
  rarity: "Epic",
  imageUri: "pngs/my-badge.webp",
  description: "What this badge represents.",
  howToEarn: "How a user unlocks it.",
  hoverSoundUri: "sounds/badge-hover.mp3"
});
```

## GIF vault fix

The GIF API now reads the existing top-level `gifs_emojis/` directory and returns usable image paths. The client keeps the actual filename/URL (including file extension) rather than converting it into a path that could not resolve. Keep image files in `gifs_emojis/`.

## Commit checklist

- Run `node --check script.js`
- Run `node --check server.js`
- Run `node --check badges/badge-system.js`
- Run `node --check badges/badge-ui.js`
- Run `npm start` and verify the GIF vault and badge gallery in the browser.
