/* ECHO//SHARE Badge System
   Customize badge image URIs, rarity, hover audio, and metadata in window.ECHO_BADGE_CONFIG.
   imageUri accepts any valid image URL or a path relative to the site root.
*/
(() => {
  const svg = (symbol, c1, c2) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><path d="M60 5 76 25 103 18 95 45 115 60 95 76 103 102 76 95 60 115 44 95 17 102 25 76 5 60 25 44 17 18 44 25Z" fill="#09070c" stroke="url(#g)" stroke-width="4" filter="url(#glow)"/><circle cx="60" cy="60" r="27" fill="url(#g)" opacity=".2"/><text x="60" y="73" font-size="39" text-anchor="middle" fill="url(#g)" font-family="Arial" font-weight="bold">${symbol}</text></svg>`
  )}`;
  // The gallery is intentionally empty by default. Add your own entries in custom-tomes.js.
  const customTomes = Array.isArray(window.ECHO_CUSTOM_TOMES) ? window.ECHO_CUSTOM_TOMES : [];
  const badges = customTomes.map((b, i) => ({
    id: b.id || `custom-tome-${i + 1}`,
    name: 'Untitled Tome', rarity: 'Common', category: 'Custom',
    description: '', lore: '', howToEarn: '', imageUri: '', hoverSoundUri: '', customClass: '',
    ...b,
    // Backwards-compatible aliases used by custom-tomes.js examples.
    imageUri: b.imageUri || b.image || '',
    hoverSoundUri: b.hoverSoundUri || b.hoverSound || '',
    howToEarn: b.howToEarn || b.unlockCondition || '',
    lore: b.lore || ''
  }));
  window.ECHO_BADGE_CONFIG = window.ECHO_BADGE_CONFIG || {
    badges,
    settings:{showLockedBadges:true,playHoverSound:true,hoverSoundUri:'',columns:'auto',showDescription:true,showHowToEarn:true}
  };
  window.EchoBadgeSystem = {
    getBadges(){return Array.isArray(window.ECHO_BADGE_CONFIG.badges)?window.ECHO_BADGE_CONFIG.badges:[];},
    getSettings(){return window.ECHO_BADGE_CONFIG.settings||{};},
    setBadges(next){window.ECHO_BADGE_CONFIG.badges=next;window.dispatchEvent(new CustomEvent('echo:badges-updated'));},
    updateBadge(id, patch){const next=this.getBadges().map(b=>b.id===id?{...b,...patch}:b);this.setBadges(next);},
    // Add a badge with a custom image URI, rarity, description and optional hover sound URI.
    addBadge(badge){this.setBadges([...this.getBadges(),{id:badge.id||`custom-${Date.now()}`,name:'Custom Badge',rarity:'Common',description:'',lore:'',howToEarn:'',imageUri:badge.imageUri||badge.image||'',hoverSoundUri:badge.hoverSoundUri||badge.hoverSound||'',...badge}]);}
  };
})();