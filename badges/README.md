# ECHO//SHARE — Tome Vault

The Tome Vault ships with **no preset badges**. Your own collection lives in one simple file: `badges/custom-tomes.js`. The rendering and behavior are kept separate.

## Add a custom tome

1. Put the image in `badges/images/` (create the folder if needed), or use a direct HTTPS image URL.
2. Open `badges/custom-tomes.js`.
3. Add an object inside `window.ECHO_CUSTOM_TOMES`.
4. Save and refresh. GIF, PNG, JPG, WEBP, SVG and browser-supported image URLs work through the normal `<img>` element.

```js
{
  id: "my-first-tome",             // unique, URL-friendly ID
  name: "My First Tome",
  imageUri: "badges/images/my-first-tome.gif",
  rarity: "MEME-X!",                // any label you want
  category: "Custom",
  description: "What the tome means.",
  howToEarn: "How it is discovered.",
  hoverSoundUri: "sounds/tome-hover.mp3", // optional
  customClass: ""                  // optional extra CSS class
}
```

Separate entries with commas. Remove an entry to remove that tome. IDs must be unique. For local files, paths are relative to the site root. Remote images must allow browser access; use a direct image URL, not a webpage URL.

## Built-in custom rarity effects

- `FG!` — flashing red/black aura with a jittering rarity label.
- `MEME-X!` — animated hyper-rainbow text and glow.
- Every other rarity label works automatically and gets a matching normalized CSS class for your own styling.

To customize effects, edit the final Tome Vault CSS section in `style.css`. Effects respect `prefers-reduced-motion`.

## Optional hover sound

Per-tome hover audio is enabled by default. Both `hoverSoundUri` and the shorter `hoverSound` property are supported. Browsers may block sound until you click or press a key on the page once. Browser audio rules may require the user to interact with the page first.

## Scripts

- `badges/custom-tomes.js` — **your editable tome collection**.
- `badges/badge-system.js` — config accessors and update helpers.
- `badges/badge-ui.js` — gallery, filters, animations, hover/tap detail panel.

## Verify

Run `node --check badges/custom-tomes.js`, `node --check badges/badge-system.js`, `node --check badges/badge-ui.js`, `node --check script.js`, and `node --check server.js`. Then run the site and test local and remote static/GIF images.

## Visual customization studio

Open the Tome Vault and press **⚙ CUSTOMIZE** to open the live settings studio. It supports independent colors for cards, card text, vault title, rarity labels, borders, hover glow, detail panel, and vault accents; card height and roundness; responsive or fixed gallery columns; image fit; and toggles for visual effects, special rarity animations, hover movement, scan shine, and hover sounds. Changes preview immediately. Press **Save settings** to persist them in this browser, or **Reset defaults** to restore the original style.

Settings are managed separately by `tome-settings.js`. To edit the starting defaults, update its `DEFAULTS` object. Saved settings are local to the browser/device and do not modify source files.
