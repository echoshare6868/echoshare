/* TOME VAULT — visual customization studio. Safe to edit defaults in DEFAULTS. */
(() => {
  const KEY = 'echoTomeVaultSettingsV1';
  const DEFAULTS = {
    cardBg: '#100d16', cardText: '#f9f5fc', titleColor: '#ffffff', rarityText: '#ff739b',
    cardBorder: '#453044', cardGlow: '#ff397e', panelBg: '#09070f', panelText: '#f7edf5',
    vaultBg: '#100b16', vaultAccent: '#ff397e', radius: 16, cardSize: 190, columns: 'auto',
    effects: true, rarityEffects: true, hoverMotion: true, scanShine: true, sound: true, imageFit: 'contain'
  };
  const copy = o => JSON.parse(JSON.stringify(o));
  let settings = {...DEFAULTS};
  try { settings = {...settings, ...JSON.parse(localStorage.getItem(KEY) || '{}')}; } catch (_) {}
  const style = document.createElement('style'); style.id = 'tome-settings-live-style'; document.head.appendChild(style);
  const css = () => {
    const s = settings;
    style.textContent = `
      #badgeShowcase { --tome-vault-bg:${s.vaultBg}; --tome-vault-accent:${s.vaultAccent}; }
      #badgeShowcase .badge-showcase-top h2 { color:${s.titleColor}!important; }
      #badgeShowcase .badge-kicker,#badgeShowcase .badge-gallery-toolbar>span { color:${s.vaultAccent}!important; }
      #badgeShowcase .badge-card { background:${s.cardBg}!important; color:${s.cardText}!important; border-color:${s.cardBorder}!important; border-radius:${s.radius}px!important; min-height:${s.cardSize}px!important; }
      #badgeShowcase .badge-card-name { color:${s.cardText}!important; }
      #badgeShowcase .badge-card-rarity { color:${s.rarityText}!important; }
      #badgeShowcase .badge-card:hover,#badgeShowcase .badge-card:focus-visible,#badgeShowcase .badge-card.badge-selected { border-color:${s.cardGlow}!important; box-shadow:0 14px 38px rgba(0,0,0,.3),0 0 24px ${s.cardGlow}66!important; }
      #badgeShowcase .badge-art { filter:${s.effects ? `drop-shadow(0 0 10px ${s.cardGlow}66)` : 'none'}!important; }
      #badgeShowcase .badge-art img,.badge-detail-art img { object-fit:${s.imageFit}!important; }
      #badgeShowcase .badge-card:hover .badge-art,#badgeShowcase .badge-card.badge-selected .badge-art { transform:${s.hoverMotion && s.effects ? 'rotate(-3deg) scale(1.06)' : 'none'}!important; }
      #badgeShowcase .badge-card-scan:after { display:${s.scanShine && s.effects ? 'block' : 'none'}!important; }
      #badgeShowcase .badge-card { animation:${s.effects ? 'badge-rise .45s both' : 'none'}!important; }
      #badgeShowcase .badge-card.rarity-fg,#badgeShowcase .badge-detail-popover.rarity-fg,#badgeShowcase .badge-card.rarity-meme-x,#badgeShowcase .badge-detail-popover.rarity-meme-x { animation:${s.rarityEffects && s.effects ? '' : 'none'}!important; }
      #badgeShowcase .badge-card.rarity-fg .badge-card-rarity,#badgeShowcase .badge-detail-popover.rarity-fg .badge-rarity,#badgeShowcase .badge-card.rarity-meme-x .badge-card-rarity,#badgeShowcase .badge-detail-popover.rarity-meme-x .badge-rarity { animation:${s.rarityEffects && s.effects ? '' : 'none'}!important; }
      .badge-detail-popover { background:${s.panelBg}!important; color:${s.panelText}!important; border-color:${s.cardGlow}!important; border-radius:${s.radius + 5}px!important; }
      .badge-detail-copy h3,.badge-detail-copy>p,.badge-howto p,.tome-detail-meta code { color:${s.panelText}!important; }
      #badgeShowcase .badge-gallery { grid-template-columns:${s.columns === 'auto' ? 'repeat(auto-fit,minmax(min(100%,150px),1fr))' : `repeat(${Number(s.columns)},minmax(0,1fr))`}!important; }
      #badgeShowcase .badge-gallery-toolbar input,#badgeShowcase .badge-gallery-toolbar select { border-color:${s.cardBorder}!important; }
      @media(max-width:620px){#badgeShowcase .badge-gallery{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
      @media(prefers-reduced-motion:reduce){#badgeShowcase *, .badge-detail-popover *{animation:none!important;transition:none!important}}
    `;
  };
  const field = (label, key, type='color', opts) => {
    const val = settings[key];
    if (type === 'checkbox') return `<label class="tome-setting-toggle"><input type="checkbox" data-key="${key}" ${val?'checked':''}><span>${label}</span></label>`;
    if (type === 'select') return `<label class="tome-setting-field"><span>${label}</span><select data-key="${key}">${opts.map(([v,t])=>`<option value="${v}" ${String(val)===String(v)?'selected':''}>${t}</option>`).join('')}</select></label>`;
    return `<label class="tome-setting-field"><span>${label}</span><input data-key="${key}" type="${type}" value="${val}" ${type==='range' ? `min="${opts[0]}" max="${opts[1]}" step="${opts[2]||1}"` : ''}><output data-output="${key}">${type==='range'?val:''}</output></label>`;
  };
  const inject = () => {
    const showcase = document.getElementById('badgeShowcase'); if (!showcase || document.getElementById('tomeSettingsOpen')) return;
    const toolbar = showcase.querySelector('.badge-gallery-toolbar'); if (!toolbar) return;
    const btn = document.createElement('button'); btn.id='tomeSettingsOpen'; btn.type='button'; btn.className='tome-settings-open'; btn.textContent='⚙ CUSTOMIZE'; btn.setAttribute('aria-haspopup','dialog'); toolbar.appendChild(btn);
    const modal = document.createElement('div'); modal.className='tome-settings-modal'; modal.id='tomeSettingsModal'; modal.hidden=true; modal.innerHTML=`
      <section class="tome-settings-dialog" role="dialog" aria-modal="true" aria-labelledby="tomeSettingsTitle">
        <header class="tome-settings-header"><div><span>ARCHIVE CONTROL // PERSONALIZATION</span><h2 id="tomeSettingsTitle">Tome Vault Studio</h2><p>Customize the vault without editing its layout code. Changes preview live and save on this device.</p></div><button type="button" class="tome-settings-close" aria-label="Close settings">×</button></header>
        <div class="tome-settings-tabs"><a href="#tome-colors">Colors & surfaces</a><a href="#tome-layout">Layout</a><a href="#tome-motion">Effects</a></div>
        <div class="tome-settings-content">
          <section id="tome-colors" class="tome-settings-section"><h3>01 / Color laboratory</h3><p>Set the card, text, border, glow, and detail-panel colors independently.</p><div class="tome-settings-grid">
            ${field('Card background','cardBg')}${field('Card text','cardText')}${field('Vault title','titleColor')}${field('Rarity label text','rarityText')}${field('Card border','cardBorder')}${field('Hover glow','cardGlow')}${field('Detail panel background','panelBg')}${field('Detail panel text','panelText')}${field('Vault accent','vaultAccent')}${field('Vault background tint','vaultBg')}
          </div></section>
          <section id="tome-layout" class="tome-settings-section"><h3>02 / Layout & shape</h3><p>Adjust card proportions and corner shape while preserving responsive mobile layout.</p><div class="tome-settings-grid">
            ${field('Card minimum height','cardSize','range',[140,300,5])}${field('Corner roundness','radius','range',[4,32,1])}${field('Gallery columns','columns','select',[['auto','Responsive / automatic'],['2','2 columns'],['3','3 columns'],['4','4 columns'],['5','5 columns'],['6','6 columns']])}${field('Image fit','imageFit','select',[['contain','Fit whole image'],['cover','Fill image frame']])}
          </div></section>
          <section id="tome-motion" class="tome-settings-section"><h3>03 / Effects & behavior</h3><p>Disable rarity animations if you prefer a calmer, clean look. Your rarity labels and colors remain customizable.</p><div class="tome-settings-toggles">
            ${field('Enable visual effects','effects','checkbox')}${field('Enable special rarity animations','rarityEffects','checkbox')}${field('Enable hover movement','hoverMotion','checkbox')}${field('Enable card shine sweep','scanShine','checkbox')}${field('Allow tome hover sounds','sound','checkbox')}
          </div></section>
          <footer class="tome-settings-footer"><span class="tome-settings-status" aria-live="polite">LIVE PREVIEW ENABLED</span><div><button type="button" class="tome-settings-reset">Reset defaults</button><button type="button" class="tome-settings-save">Save settings</button></div></footer>
        </div>
      </section>`;
    document.body.appendChild(modal);
    btn.addEventListener('click',()=>{modal.hidden=false;document.body.classList.add('tome-settings-open');modal.querySelector('.tome-settings-close').focus();});
    const close=()=>{modal.hidden=true;document.body.classList.remove('tome-settings-open');btn.focus();};
    modal.querySelector('.tome-settings-close').addEventListener('click',close); modal.addEventListener('click',e=>{if(e.target===modal)close();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)close();});
    modal.querySelectorAll('[data-key]').forEach(el=>el.addEventListener('input',()=>{const k=el.dataset.key;settings[k]=el.type==='checkbox'?el.checked:el.type==='range'?Number(el.value):el.value;const out=modal.querySelector(`[data-output="${k}"]`);if(out)out.value=el.value;css();if(k==='sound'&&window.EchoBadgeSystem)window.ECHO_BADGE_CONFIG.settings.playHoverSound=settings.sound;const status=modal.querySelector('.tome-settings-status');status.textContent='PREVIEW UPDATED';}));
    modal.querySelector('.tome-settings-save').addEventListener('click',()=>{try{localStorage.setItem(KEY,JSON.stringify(settings));}catch(_){} if(window.ECHO_BADGE_CONFIG?.settings)window.ECHO_BADGE_CONFIG.settings.playHoverSound=settings.sound;modal.querySelector('.tome-settings-status').textContent='SAVED ON THIS DEVICE';});
    modal.querySelector('.tome-settings-reset').addEventListener('click',()=>{settings=copy(DEFAULTS);modal.querySelectorAll('[data-key]').forEach(el=>{el.type==='checkbox'?el.checked=!!settings[el.dataset.key]:el.value=settings[el.dataset.key];const out=modal.querySelector(`[data-output="${el.dataset.key}"]`);if(out)out.value=el.type==='range'?el.value:'';});css();try{localStorage.removeItem(KEY);}catch(_){}modal.querySelector('.tome-settings-status').textContent='DEFAULTS RESTORED';});
    css();
  };
  const panelCss=document.createElement('style');panelCss.textContent=`
    .tome-settings-open{border:1px solid #a83c69!important;border-radius:10px!important;padding:11px 14px!important;background:linear-gradient(135deg,#26101f,#100b16)!important;color:#ffd9e7!important;font:800 10px/1.2 inherit!important;letter-spacing:.1em;cursor:pointer;white-space:nowrap;transition:transform .2s,box-shadow .2s}
    .tome-settings-open:hover{transform:translateY(-2px);box-shadow:0 0 22px #ff397e33}
    .tome-settings-modal{position:fixed;inset:0;z-index:12000;display:grid;place-items:center;padding:clamp(10px,3vw,32px);background:rgba(2,2,8,.82);backdrop-filter:blur(16px);overflow:auto}.tome-settings-modal[hidden]{display:none!important}.tome-settings-dialog{width:min(100%,920px);max-height:min(92dvh,960px);display:flex;flex-direction:column;overflow:hidden;border:1px solid #62304e;border-radius:22px;background:radial-gradient(ellipse at 0 0,#35112a66,transparent 42%),#09070f;color:#f7edf5;box-shadow:0 30px 120px #000,0 0 60px #ff397e15}.tome-settings-header{display:flex;justify-content:space-between;gap:20px;padding:24px 28px 18px;border-bottom:1px solid #ffffff14}.tome-settings-header span{font-size:9px;letter-spacing:.18em;color:#ff78a7;font-weight:800}.tome-settings-header h2{font-size:clamp(24px,4vw,36px);margin:7px 0;color:#fff}.tome-settings-header p,.tome-settings-section p{color:#aaa2b5;font-size:12px;line-height:1.6;margin:0}.tome-settings-close{flex:none;width:38px;height:38px;border:1px solid #ffffff25;border-radius:12px;background:#160e1b;color:#fff;font-size:25px;cursor:pointer}.tome-settings-tabs{display:flex;gap:8px;padding:12px 28px;border-bottom:1px solid #ffffff12;flex-wrap:wrap}.tome-settings-tabs a{font-size:10px;color:#c8bdcf;text-decoration:none;padding:8px 11px;border:1px solid #ffffff17;border-radius:9px;background:#ffffff06}.tome-settings-tabs a:hover{border-color:#ff78a7;color:#fff}.tome-settings-content{padding:20px 28px 24px;overflow:auto}.tome-settings-section{padding:0 0 22px;margin-bottom:22px;border-bottom:1px solid #ffffff12;scroll-margin-top:12px}.tome-settings-section h3{font-size:13px;letter-spacing:.12em;color:#ff8cb3;margin:0 0 7px}.tome-settings-section p{margin-bottom:16px}.tome-settings-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.tome-setting-field{min-width:0;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:12px;padding:10px 12px;border:1px solid #ffffff12;border-radius:11px;background:#ffffff04;font-size:11px;color:#dcd3e2}.tome-setting-field>span{grid-column:1}.tome-setting-field input[type=color]{grid-column:2;grid-row:1;width:44px;height:30px;border:0;background:transparent;padding:0;cursor:pointer}.tome-setting-field input[type=range],.tome-setting-field select{grid-column:1/-1;width:100%;accent-color:#ff5793}.tome-setting-field select{background:#15101b;color:#fff;border:1px solid #ffffff20;border-radius:8px;padding:9px}.tome-setting-field output{font-size:10px;color:#ff9bbd}.tome-settings-toggles{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.tome-setting-toggle{display:flex;align-items:center;gap:10px;padding:12px;border:1px solid #ffffff12;border-radius:11px;background:#ffffff04;color:#e4dce8;font-size:11px;cursor:pointer}.tome-setting-toggle input{accent-color:#ff5793;width:16px;height:16px}.tome-settings-footer{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.tome-settings-status{font-size:9px;letter-spacing:.13em;color:#66e6b4}.tome-settings-footer>div{display:flex;gap:9px}.tome-settings-footer button{border:1px solid #ffffff20;border-radius:9px;padding:10px 13px;background:#17101d;color:#f6eaf3;font-size:11px;font-weight:700;cursor:pointer}.tome-settings-footer .tome-settings-save{background:linear-gradient(135deg,#ff4b89,#a62aff);border-color:transparent;color:#fff}.tome-settings-open:focus-visible,.tome-settings-modal button:focus-visible,.tome-settings-modal input:focus-visible,.tome-settings-modal select:focus-visible{outline:2px solid #ff8cb3;outline-offset:2px}body.tome-settings-open{overflow:hidden}@media(max-width:620px){.tome-settings-header{padding:18px 16px 14px}.tome-settings-tabs{padding:10px 16px}.tome-settings-content{padding:16px}.tome-settings-grid,.tome-settings-toggles{grid-template-columns:1fr}.tome-settings-field{padding:10px}.tome-settings-footer{align-items:flex-start}.tome-settings-status{width:100%}}
  `; document.head.appendChild(panelCss);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',inject);else inject();
  window.EchoTomeSettings={get:()=>({...settings}),set:(patch)=>{settings={...settings,...patch};css();},reset:()=>{settings=copy(DEFAULTS);css();}};
})();
