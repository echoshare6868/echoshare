/*
 * ECHO//SHARE — TOME VAULT VISUAL CONFIGURATION
 * ---------------------------------------------------------------
 * SCRIPT-ONLY SETTINGS: there is NO settings button or settings UI.
 * Edit the values below, save this file, and refresh the site.
 * This file changes appearance only; badge data belongs in custom-tomes.js.
 *
 * Color values accept CSS colors (#hex, rgb(), hsl(), etc.).
 * Glow strength: 0 disables a glow; larger values make it brighter.
 * Text shadow can be changed independently from the card glow.
 */
(() => {
  const CONFIG = {
    // Main vault surface and headings
    vault: {
      background: '#100b16',       // vault background tint
      accent: '#ff397e',            // small labels and accent details
      titleColor: '#ffffff',
      kickerColor: '#ff739b',
      backgroundGlow: 'rgba(255, 57, 126, 0.10)'
    },

    // Every card uses these defaults unless its rarity overrides them below.
    card: {
      background: '#100d16',
      backgroundHover: '#17111f',
      textColor: '#f9f5fc',
      nameColor: '#f9f5fc',
      rarityTextColor: '#ff739b',
      categoryTextColor: '#92889d',
      borderColor: '#453044',
      borderHoverColor: '#ff397e',
      borderWidth: 1,               // pixels
      radius: 16,                   // pixels
      minimumHeight: 190,           // pixels
      shadow: '0 10px 28px rgba(0,0,0,.20)',
      hoverShadow: '0 14px 38px rgba(0,0,0,.30)',
      glowColor: '#ff397e',
      glowStrength: 0.40,            // 0–1; controls card glow opacity
      hoverLift: 3,                 // pixels; 0 disables lift
      hoverScale: 1.02,              // 1 = no scale
      imageGlowColor: '#ff397e',
      imageGlowStrength: 0.40,       // 0–1
      imageFit: 'contain'            // 'contain' or 'cover'
    },

    // Detail popup shown when a tome is hovered or tapped
    detail: {
      background: '#09070f',
      textColor: '#f7edf5',
      borderColor: '#ff397e',
      borderWidth: 1,
      radius: 21,
      shadow: '0 28px 90px rgba(0,0,0,.68)',
      glowColor: '#ff397e',
      glowStrength: 0.18,
      titleColor: '#ffffff',
      kickerColor: '#16d7a0',
      sectionLabelColor: '#49cce8',
      imageBackground: '#101018',
      imageFit: 'contain'
    },

    // Text effects. Adjust these without changing card effects.
    text: {
      nameGlowColor: '#ff397e',
      nameGlowStrength: 0.00,       // 0 = no text glow; 1 = strong glow
      rarityGlowStrength: 0.45,
      titleGlowColor: '#ff397e',
      titleGlowStrength: 0.00,
      letterSpacing: 'normal',
      uppercaseRarity: true
    },

    // General motion/effects switches. These do not change the tome's rarity.
    effects: {
      cardGlow: true,
      imageGlow: true,
      textGlow: true,
      hoverLift: true,
      hoverScale: true,
      shineSweep: true,
      entranceAnimation: true,
      specialRarityAnimations: true,
      hoverSounds: true,
      respectReducedMotion: true
    },

    // Optional per-rarity styling overrides.
    // Key names must match the rarity written in custom-tomes.js.
    // For example, "FG!" maps to rarity-fg and "MEME-X!" maps to rarity-meme-x.
    // Set animation to 'none' to keep its colors but remove its special animation.
    rarityStyles: {
      'FG!': {
        textColor: '#ff3434',
        cardBackground: '#160608',
        borderColor: '#ff2020',
        glowColor: '#ff1010',
        glowStrength: 0.90,
        textGlowColor: '#ff1616',
        textGlowStrength: 0.95,
        animation: 'glitch'          // 'glitch' or 'none'
      },
      'MEME-X!': {
        textColor: '#ffffff',
        cardBackground: '#10091a',
        borderColor: '#ff54e8',
        glowColor: '#9e5bff',
        glowStrength: 0.85,
        textGlowColor: '#ff54e8',
        textGlowStrength: 0.80,
        animation: 'rainbow'         // 'rainbow' or 'none'
      },
      'Secret Menu': {
        textColor: '#fff598',
        cardBackground: '#fcd569',
        borderColor: '#fdfcfc',
        glowColor: '#fcd569',
        glowStrength: 0.90,
        textGlowColor: '#fcd569',
        textGlowStrength: 0.95,
        animation: 'glitch'          // 'glitch' or 'none'
      }
    }
  };

  const clamp = (n, min = 0, max = 1) => Math.max(min, Math.min(max, Number(n) || 0));
  const safeColor = (value, fallback) => typeof value === 'string' && value.trim() ? value.trim() : fallback;
  const slug = value => String(value || 'common').toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '');
  const alpha = (color, amount) => {
    const a = clamp(amount);
    const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color);
    if (hex) {
      let h = hex[1]; if (h.length === 3) h = h.split('').map(c => c + c).join('');
      const n = parseInt(h, 16);
      return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
    }
    return color.startsWith('rgb(') ? color.replace('rgb(', 'rgba(').replace(')', `, ${a})`) : color;
  };
  const shadowGlow = (color, strength, maxBlur = 30) => {
    const blur = Math.round(clamp(strength) * maxBlur);
    return blur ? `0 0 ${blur}px ${alpha(color, clamp(strength) * .72)}` : 'none';
  };

  function apply() {
    const v = CONFIG.vault, c = CONFIG.card, d = CONFIG.detail, t = CONFIG.text, fx = CONFIG.effects;
    const style = document.getElementById('echo-tome-script-config') || document.createElement('style');
    style.id = 'echo-tome-script-config';
    const cardGlow = fx.cardGlow ? clamp(c.glowStrength) : 0;
    const imageGlow = fx.imageGlow ? clamp(c.imageGlowStrength) : 0;
    const nameGlow = fx.textGlow ? clamp(t.nameGlowStrength) : 0;
    const rarityGlow = fx.textGlow ? clamp(t.rarityGlowStrength) : 0;
    const titleGlow = fx.textGlow ? clamp(t.titleGlowStrength) : 0;
    let css = `
      #badgeShowcase { --tome-vault-bg:${safeColor(v.background,'#100b16')}; --tome-vault-accent:${safeColor(v.accent,'#ff397e')}; background-color:${v.background}!important; }
      #badgeShowcase .badge-showcase-top h2 { color:${v.titleColor}!important; text-shadow:${shadowGlow(safeColor(t.titleGlowColor,v.accent),titleGlow,24)}!important; }
      #badgeShowcase .badge-kicker,#badgeShowcase .badge-gallery-toolbar>span { color:${v.kickerColor}!important; }
      #badgeShowcase .badge-card { background:var(--tome-custom-card-bg,${c.background})!important; color:var(--tome-custom-text,${c.textColor})!important; border:var(--tome-custom-border-width,${Math.max(0,Number(c.borderWidth)||0)}px) solid var(--tome-custom-border,${c.borderColor})!important; border-radius:var(--tome-custom-radius,${Math.max(0,Number(c.radius)||0)}px)!important; min-height:${Math.max(100,Number(c.minimumHeight)||190)}px!important; box-shadow:var(--tome-custom-shadow,${c.shadow})!important; transition:background .22s ease,border-color .22s ease,box-shadow .22s ease,transform .22s ease!important; }
      #badgeShowcase .badge-card-name { color:var(--tome-custom-name-color,${c.nameColor})!important; text-shadow:var(--tome-custom-name-glow,${shadowGlow(safeColor(t.nameGlowColor,c.glowColor),nameGlow,22)})!important; letter-spacing:${t.letterSpacing}!important; }
      #badgeShowcase .badge-card-rarity { color:var(--tome-custom-rarity-color,${c.rarityTextColor})!important; text-shadow:var(--tome-custom-rarity-glow,${shadowGlow(safeColor(t.nameGlowColor,c.glowColor),rarityGlow,18)})!important; text-transform:${t.uppercaseRarity?'uppercase':'none'}!important; }
      #badgeShowcase .badge-card-category { color:var(--tome-custom-category-color,${c.categoryTextColor})!important; }
      #badgeShowcase .badge-card:hover,#badgeShowcase .badge-card:focus-visible,#badgeShowcase .badge-card.badge-selected { background:var(--tome-custom-card-hover,${c.backgroundHover})!important; border-color:var(--tome-custom-border-hover,${c.borderHoverColor})!important; box-shadow:var(--tome-custom-hover-shadow,${c.hoverShadow}),var(--tome-custom-glow-shadow,${shadowGlow(c.glowColor,cardGlow,34)})!important; transform:${fx.hoverLift || fx.hoverScale ? `translateY(${fx.hoverLift ? -Math.max(0,Number(c.hoverLift)||0) : 0}px) scale(${fx.hoverScale ? Math.max(1,Number(c.hoverScale)||1) : 1})` : 'none'}!important; }
      #badgeShowcase .badge-art img { object-fit:${c.imageFit==='cover'?'cover':'contain'}!important; filter:var(--tome-custom-image-glow,${imageGlow ? `drop-shadow(0 0 ${Math.round(imageGlow*18)}px ${alpha(c.imageGlowColor,imageGlow)})` : 'none'})!important; }
      .badge-detail-popover { background:var(--tome-custom-detail-bg,${d.background})!important; color:var(--tome-custom-detail-text,${d.textColor})!important; border:var(--tome-custom-detail-border-width,${Math.max(0,Number(d.borderWidth)||0)}px) solid var(--tome-custom-detail-border,${d.borderColor})!important; border-radius:var(--tome-custom-detail-radius,${Math.max(0,Number(d.radius)||21)}px)!important; box-shadow:var(--tome-custom-detail-shadow,${d.shadow}),var(--tome-custom-detail-glow-shadow,${fx.cardGlow?shadowGlow(d.glowColor,clamp(d.glowStrength),42):'none'})!important; }
      .badge-detail-copy h3 { color:var(--tome-custom-detail-title,${d.titleColor})!important; text-shadow:var(--tome-custom-detail-title-glow,${shadowGlow(safeColor(t.titleGlowColor,d.borderColor),titleGlow,24)})!important; }
      .badge-detail-copy>p,.badge-howto p,.tome-detail-meta code { color:var(--tome-custom-detail-text,${d.textColor})!important; }
      .badge-detail-kicker { color:var(--tome-custom-detail-kicker,${d.kickerColor})!important; }
      .badge-howto b { color:var(--tome-custom-detail-section,${d.sectionLabelColor})!important; }
      .badge-detail-art { background:var(--tome-custom-detail-image-bg,${d.imageBackground})!important; }
      .badge-detail-art img { object-fit:${d.imageFit==='cover'?'cover':'contain'}!important; }
      #badgeShowcase .badge-card-scan:after { display:${fx.shineSweep?'block':'none'}!important; }
      ${fx.entranceAnimation ? '' : '#badgeShowcase .badge-card { animation:none!important; }'}
    `;
    css += `
      #badgeShowcase .badge-card { box-shadow:var(--tome-custom-shadow,${c.shadow}),var(--tome-custom-glow-shadow,${shadowGlow(c.glowColor,cardGlow,34)})!important; }
      #badgeShowcase .badge-card:hover,#badgeShowcase .badge-card:focus-visible,#badgeShowcase .badge-card.badge-selected { box-shadow:var(--tome-custom-hover-shadow,${c.hoverShadow}),var(--tome-custom-glow-shadow,${shadowGlow(c.glowColor,cardGlow,34)})!important; }
      #badgeShowcase .badge-art img { object-fit:var(--tome-custom-image-fit,${c.imageFit==='cover'?'cover':'contain'})!important; filter:var(--tome-custom-image-glow,${imageGlow ? `drop-shadow(0 0 ${Math.round(imageGlow*18)}px ${alpha(c.imageGlowColor,imageGlow)})` : 'none'})!important; }
      .badge-detail-popover { background:var(--tome-custom-detail-bg,${d.background})!important; color:var(--tome-custom-detail-text,${d.textColor})!important; border-color:var(--tome-custom-detail-border,${d.borderColor})!important; border-radius:var(--tome-custom-detail-radius,${d.radius}px)!important; box-shadow:var(--tome-custom-detail-shadow,${d.shadow}),var(--tome-custom-detail-glow-shadow,${fx.cardGlow?shadowGlow(d.glowColor,clamp(d.glowStrength),42):'none'})!important; }
      .badge-detail-copy h3 { color:var(--tome-custom-detail-title,${d.titleColor})!important; }
      .badge-detail-kicker { color:var(--tome-custom-detail-kicker,${d.kickerColor})!important; }
      .badge-detail-art { background:var(--tome-custom-detail-image-bg,${d.imageBackground})!important; }
      .badge-detail-art img { object-fit:var(--tome-custom-detail-image-fit,${d.imageFit==='cover'?'cover':'contain'})!important; }
      #badgeShowcase .badge-card[data-tome-animation=\"none\"],#badgeShowcase .badge-card[data-tome-animation=\"none\"] *, .badge-detail-popover[data-tome-animation=\"none\"],.badge-detail-popover[data-tome-animation=\"none\"] * { animation:none!important; }
      #badgeShowcase .badge-card[data-tome-animation=\"none\"] .badge-card-name,#badgeShowcase .badge-card[data-tome-animation=\"none\"] .badge-card-rarity { background:none!important; -webkit-text-fill-color:currentColor!important; }
    `;

    for (const [rarity, cfg] of Object.entries(CONFIG.rarityStyles || {})) {
      const cls = `.rarity-${slug(rarity)}`;
      const bg = `background:var(--tome-custom-card-bg,${cfg.cardBackground || c.background})!important;`;
      const border = `border-color:var(--tome-custom-border,${cfg.borderColor || c.borderColor})!important;`;
      const color = `color:var(--tome-custom-rarity-color,var(--tome-custom-name-color,${cfg.textColor || c.nameColor}))!important;`;
      const glowColor = safeColor(cfg.glowColor,c.glowColor);
      const strength = fx.cardGlow ? clamp(cfg.glowStrength ?? c.glowStrength) : 0;
      const tg = fx.textGlow ? clamp(cfg.textGlowStrength ?? t.rarityGlowStrength) : 0;
      const tc = safeColor(cfg.textGlowColor,glowColor);
      css += `
        #badgeShowcase .badge-card${cls} { ${bg}${border} box-shadow:var(--tome-custom-shadow,${c.shadow}),var(--tome-custom-glow-shadow,${shadowGlow(glowColor,strength,38)})!important; }
        #badgeShowcase .badge-card${cls} .badge-card-name,#badgeShowcase .badge-card${cls} .badge-card-rarity,.badge-detail-popover${cls} .badge-rarity { ${color} text-shadow:${shadowGlow(tc,tg,26)}!important; }
        #badgeShowcase .badge-card${cls}:hover,#badgeShowcase .badge-card${cls}.badge-selected { border-color:${safeColor(cfg.borderColor,glowColor)}!important; box-shadow:var(--tome-custom-hover-shadow,${c.hoverShadow}),var(--tome-custom-glow-shadow,${shadowGlow(glowColor,strength,42)})!important; }
        .badge-detail-popover${cls} { background:var(--tome-custom-detail-bg,${cfg.cardBackground || d.background})!important; border-color:var(--tome-custom-detail-border,${cfg.borderColor || d.borderColor})!important; box-shadow:var(--tome-custom-detail-shadow,${d.shadow}),var(--tome-custom-detail-glow-shadow,${shadowGlow(glowColor,fx.cardGlow?strength:0,42)})!important; }
      `;
      if (fx.specialRarityAnimations && cfg.animation === 'glitch') css += `
        @keyframes tome-config-glitch { 0%,100%{filter:none;transform:translate(0)} 20%{filter:brightness(1.35);transform:translate(-1px,0)} 40%{transform:translate(1px,-1px)} 60%{filter:brightness(.9);transform:translate(0,1px)} 80%{transform:translate(-1px,0)} }
        @keyframes tome-config-glitch-text { 0%,100%{transform:translate(0)} 25%{transform:translate(-1px,1px)} 50%{transform:translate(1px,-1px)} 75%{transform:translate(-1px,0)} }
        #badgeShowcase .badge-card${cls} { animation:tome-config-glitch .32s steps(2,end) infinite alternate!important; }
        #badgeShowcase .badge-card${cls} .badge-card-rarity,.badge-detail-popover${cls} .badge-rarity { animation:tome-config-glitch-text .22s steps(2,end) infinite!important; }
      `;
      if (fx.specialRarityAnimations && cfg.animation === 'rainbow') css += `
        @keyframes tome-config-rainbow { from{filter:hue-rotate(0deg)} to{filter:hue-rotate(360deg)} }
        #badgeShowcase .badge-card${cls} { animation:tome-config-rainbow 4s linear infinite!important; }
        #badgeShowcase .badge-card${cls} .badge-card-name,#badgeShowcase .badge-card${cls} .badge-card-rarity,.badge-detail-popover${cls} .badge-rarity { background:linear-gradient(90deg,#ff4d6d,#ffb84d,#fff45c,#3cf5b1,#48baff,#b56bff,#ff4dce);background-size:250% 100%;-webkit-background-clip:text;background-clip:text;color:transparent!important;text-shadow:0 0 12px #ff5cdd99!important;animation:tome-config-rainbow 3s linear infinite!important; }
      `;
      if (cfg.animation === 'none' || !fx.specialRarityAnimations) css += `#badgeShowcase .badge-card${cls},#badgeShowcase .badge-card${cls} *, .badge-detail-popover${cls} .badge-rarity { animation:none!important; }`;
    }
    css += `
      #badgeShowcase .badge-card[data-tome-animation=\"none\"],#badgeShowcase .badge-card[data-tome-animation=\"none\"] *, .badge-detail-popover[data-tome-animation=\"none\"],.badge-detail-popover[data-tome-animation=\"none\"] * { animation:none!important; }
      #badgeShowcase .badge-card[data-tome-animation=\"none\"] .badge-card-name,#badgeShowcase .badge-card[data-tome-animation=\"none\"] .badge-card-rarity { background:none!important; -webkit-text-fill-color:currentColor!important; }
      #badgeShowcase .badge-card[data-tome-custom-animation=\"true\"] { animation:var(--tome-custom-card-animation,none)!important; }
      #badgeShowcase .badge-card[data-tome-custom-animation=\"true\"] .badge-card-name { animation:var(--tome-custom-name-animation,none)!important; }
      #badgeShowcase .badge-card[data-tome-custom-animation=\"true\"] .badge-card-rarity,.badge-detail-popover[data-tome-custom-animation=\"true\"] .badge-rarity { animation:var(--tome-custom-rarity-animation,none)!important; }
    `;
    if (fx.respectReducedMotion) css += `@media(prefers-reduced-motion:reduce){#badgeShowcase *, .badge-detail-popover *{animation:none!important;transition:none!important;transform:none!important}}`;
    style.textContent = css;
    if (!style.isConnected) document.head.appendChild(style);
  }

  // Expose a read-only reference for debugging; edit CONFIG above to customize.
  window.EchoTomeStyleConfig = { config: CONFIG, refresh: apply };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, { once: true }); else apply();
})();
