/* ECHO//SHARE Badge System
   Customize badge image URIs, rarity, hover audio, and metadata in window.ECHO_BADGE_CONFIG.
   imageUri accepts any valid image URL or a path relative to the site root.
*/
(() => {
  const svg = (symbol, c1, c2) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><path d="M60 5 76 25 103 18 95 45 115 60 95 76 103 102 76 95 60 115 44 95 17 102 25 76 5 60 25 44 17 18 44 25Z" fill="#09070c" stroke="url(#g)" stroke-width="4" filter="url(#glow)"/><circle cx="60" cy="60" r="27" fill="url(#g)" opacity=".2"/><text x="60" y="73" font-size="39" text-anchor="middle" fill="url(#g)" font-family="Arial" font-weight="bold">${symbol}</text></svg>`
  )}`;
  const defaults = [
    {id:'first-signal',name:'First Signal',rarity:'Common',category:'Milestone',description:'Your first confirmed signal in the EchoShare archive.',howToEarn:'Join the archive and create your identity.',symbol:'✦',colors:['#8ca6b5','#d9e8ef']},
    {id:'night-operator',name:'Night Operator',rarity:'Uncommon',category:'Activity',description:'A mark for those who keep the channel alive after dark.',howToEarn:'Be active during the late-night hours.',symbol:'☾',colors:['#6579ff','#d1a8ff']},
    {id:'signal-breaker',name:'Signal Breaker',rarity:'Rare',category:'Achievement',description:'A rare trace left by a user who pushes past the ordinary.',howToEarn:'Complete a featured community challenge.',symbol:'⚡',colors:['#1dd6ff','#6878ff']},
    {id:'void-crowned',name:'Void Crowned',rarity:'Epic',category:'Prestige',description:'A crown forged from the edge of the known archive.',howToEarn:'Earn a staff-awarded prestige distinction.',symbol:'♛',colors:['#ff4b98','#a75bff']},
    {id:'starforged',name:'Starforged',rarity:'Legendary',category:'Legacy',description:'A luminous emblem reserved for extraordinary contributions.',howToEarn:'Receive a legacy award from the archive team.',symbol:'★',colors:['#ffd76a','#ff7b36']},
    {id:'mythic-echo',name:'Mythic Echo',rarity:'Mythic',category:'Hidden',description:'An echo said to appear only when the archive remembers.',howToEarn:'Unlock a hidden event or secret achievement.',symbol:'✧',colors:['#4dfff0','#9a70ff']},
    {id:'axurian-singularity',name:'Axurian Singularity',rarity:'Singularity',category:'Ultra-rare',description:'The singularity contains familiar voices from another reality; but where does it actually come from?',howToEarn:'Special event / manually awarded. Availability may be limited.',symbol:'✹',colors:['#ff386c','#ffb4e8']},
    {id:'community-anchor',name:'Community Anchor',rarity:'Rare',category:'Community',description:'Recognizes someone who helps hold the community together.',howToEarn:'Be nominated for a positive community contribution.',symbol:'⬡',colors:['#61f2b1','#18a7b8']},
    {id:'archive-keeper',name:'Archive Keeper',rarity:'Epic',category:'Legacy',description:'A guardian of the records and stories that make this place matter.',howToEarn:'Help preserve or organize community knowledge.',symbol:'⌘',colors:['#a9a5ff','#4b69ff']},
    {id:'redline',name:'Redline Protocol',rarity:'Uncommon',category:'Style',description:'A bright red trace for a distinct presence in the network.',howToEarn:'Participate in a limited themed event.',symbol:'◈',colors:['#ff334f','#ff9566']},
    {id:'prismatic-core',name:'Prismatic Core',rarity:'Legendary',category:'Cosmetic',description:'A shifting core that refracts every color in the signal.',howToEarn:'Special cosmetic unlock or staff award.',symbol:'◇',colors:['#70f6ff','#ff75cf']},
    {id:'the-unwritten',name:'The Unwritten',rarity:'Mythic',category:'Secret',description:'A badge for stories that have not been told yet.',howToEarn:'Secret unlock conditions can be configured by the site owner.',symbol:'?',colors:['#e8e4ff','#5b4f91']}
  ];
  const badges = defaults.map(b => ({...b,imageUri:svg(b.symbol,...b.colors),hoverSoundUri:'',customClass:''}));
  window.ECHO_BADGE_CONFIG = window.ECHO_BADGE_CONFIG || {
    badges,
    settings:{showLockedBadges:true,playHoverSound:false,hoverSoundUri:'',columns:'auto',showDescription:true,showHowToEarn:true}
  };
  window.EchoBadgeSystem = {
    getBadges(){return Array.isArray(window.ECHO_BADGE_CONFIG.badges)?window.ECHO_BADGE_CONFIG.badges:[];},
    getSettings(){return window.ECHO_BADGE_CONFIG.settings||{};},
    setBadges(next){window.ECHO_BADGE_CONFIG.badges=next;window.dispatchEvent(new CustomEvent('echo:badges-updated'));},
    updateBadge(id, patch){const next=this.getBadges().map(b=>b.id===id?{...b,...patch}:b);this.setBadges(next);},
    // Add a badge with a custom image URI, rarity, description and optional hover sound URI.
    addBadge(badge){this.setBadges([...this.getBadges(),{id:badge.id||`custom-${Date.now()}`,name:'Custom Badge',rarity:'Common',description:'',howToEarn:'',imageUri:'',hoverSoundUri:'',...badge}]);}
  };
})();