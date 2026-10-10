/* ECHO//SHARE Tome Vault UI — independent portal details, filters, sorting and touch support. */
(() => {
  const $ = id => document.getElementById(id);
  const gallery = $('badgeGallery'), search = $('badgeSearch'), rarity = $('badgeRarityFilter');
  const category = $('badgeCategoryFilter'), sort = $('badgeSort'), count = $('badgeVaultCount');
  if (!gallery || !window.EchoBadgeSystem) return;
  let activeCard = null, activeBadge = null, audio = null, closeTimer = null;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const rarityClass = value => String(value || 'common').toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '');
  const rarityOrder = ['common','uncommon','rare','epic','legendary','mythic','singularity'];
  function playSound(badge) {
    const settings = window.EchoBadgeSystem.getSettings();
    if (!settings.playHoverSound) return;
    const src = badge.hoverSoundUri || settings.hoverSoundUri;
    if (!src) return;
    try { if (audio) { audio.pause(); audio.currentTime = 0; } audio = new Audio(src); audio.volume = .35; audio.play().catch(() => {}); } catch (_) {}
  }
  function details(b) {
    const settings = window.EchoBadgeSystem.getSettings();
    return `<div class="tome-detail-head"><div class="badge-detail-art"><img src="${esc(b.imageUri || '')}" alt=""></div><button type="button" class="tome-detail-close" aria-label="Close tome details">×</button></div><div class="badge-detail-copy"><span class="badge-detail-kicker">TOME INTELLIGENCE // ${esc(b.category || 'ARCHIVE')}</span><h3>${esc(b.name || 'Unknown Tome')}</h3><span class="badge-rarity rarity-${rarityClass(b.rarity)}">${esc(b.rarity || 'Common')}</span>${settings.showDescription !== false ? `<p>${esc(b.description || 'No lore has been configured yet.')}</p>` : ''}${settings.showHowToEarn !== false ? `<div class="badge-howto"><b>HOW TO DISCOVER</b><p>${esc(b.howToEarn || 'Discovery record not configured.')}</p></div>` : ''}<div class="tome-detail-meta"><span>ARCHIVE RECORD</span><code>${esc(b.id || 'CUSTOM')}</code></div></div>`;
  }
  function closeDetails() {
    clearTimeout(closeTimer);
    if (activeCard) { activeCard.classList.remove('badge-selected'); activeCard.setAttribute('aria-expanded', 'false'); }
    activeCard = null; activeBadge = null;
    document.querySelector('.badge-detail-popover')?.remove();
    document.body.classList.remove('tome-detail-open');
  }
  function positionPanel(panel, card) {
    const rect = card.getBoundingClientRect(), gap = 14, width = Math.min(470, window.innerWidth - 28);
    panel.style.width = `${width}px`;
    if (matchMedia('(max-width: 720px)').matches || !matchMedia('(hover: hover)').matches) {
      panel.classList.add('tome-detail-mobile'); document.body.classList.add('tome-detail-open');
      return;
    }
    panel.classList.remove('tome-detail-mobile');
    const estimatedHeight = Math.min(panel.scrollHeight || 330, window.innerHeight - 32);
    let left = rect.right + gap;
    if (left + width > window.innerWidth - 12) left = rect.left - width - gap;
    left = Math.max(12, Math.min(left, window.innerWidth - width - 12));
    let top = rect.top + rect.height / 2 - estimatedHeight / 2;
    top = Math.max(12, Math.min(top, window.innerHeight - estimatedHeight - 12));
    panel.style.left = `${left}px`; panel.style.top = `${top}px`;
  }
  function showDetails(card, badge, force = false) {
    if (!force && activeCard === card) return;
    closeDetails(); activeCard = card; activeBadge = badge;
    card.classList.add('badge-selected'); card.setAttribute('aria-expanded', 'true');
    const panel = document.createElement('aside'); panel.className = `badge-detail-popover rarity-${rarityClass(badge.rarity)}`;
    panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', `${badge.name || 'Tome'} details`); panel.innerHTML = details(badge);
    document.body.appendChild(panel); positionPanel(panel, card); playSound(badge);
    panel.querySelector('.tome-detail-close')?.addEventListener('click', closeDetails);
    panel.addEventListener('mouseenter', () => clearTimeout(closeTimer));
    panel.addEventListener('mouseleave', () => { if (matchMedia('(hover: hover)').matches) closeTimer = setTimeout(closeDetails, 160); });
    panel.addEventListener('click', e => e.stopPropagation());
    if (force || !matchMedia('(hover: hover)').matches) panel.querySelector('.tome-detail-close')?.focus({preventScroll:true});
  }
  function updateCategories(badges) {
    if (rarity) {
      const selectedRarity = rarity.value || 'all';
      const rarities = [...new Set(badges.map(b => String(b.rarity || 'Common')).filter(Boolean))].sort((a,b) => a.localeCompare(b));
      rarity.innerHTML = '<option value="all">ALL RARITIES</option>' + rarities.map(v => `<option value="${esc(v)}">${esc(v.toUpperCase())}</option>`).join('');
      rarity.value = rarities.some(v => v.toLowerCase() === selectedRarity.toLowerCase()) ? selectedRarity : 'all';
    }
    if (!category) return;
    const current = category.value || 'all';
    const values = [...new Set(badges.map(b => b.category).filter(Boolean))].sort((a,b) => a.localeCompare(b));
    category.innerHTML = '<option value="all">ALL CATEGORIES</option>' + values.map(v => `<option value="${esc(v)}">${esc(v.toUpperCase())}</option>`).join('');
    category.value = values.includes(current) ? current : 'all';
  }
  function render() {
    const badges = window.EchoBadgeSystem.getBadges(); updateCategories(badges);
    const q = (search?.value || '').trim().toLowerCase(), r = rarity?.value || 'all', c = category?.value || 'all';
    let list = badges.filter(b => (!q || [b.name,b.description,b.rarity,b.category,b.howToEarn,b.id].join(' ').toLowerCase().includes(q)) && (r === 'all' || String(b.rarity).toLowerCase() === r.toLowerCase()) && (c === 'all' || b.category === c));
    if (sort?.value === 'name') list.sort((a,b) => String(a.name).localeCompare(String(b.name)));
    else if (sort?.value === 'rarity') list.sort((a,b) => { const ai=rarityOrder.indexOf(String(a.rarity).toLowerCase()), bi=rarityOrder.indexOf(String(b.rarity).toLowerCase()); return (bi < 0 ? 99 : bi) - (ai < 0 ? 99 : ai); });
    if (count) count.textContent = String(badges.length).padStart(2,'0');
    closeDetails();
    gallery.innerHTML = list.map((b,i) => `<button type="button" class="badge-card rarity-${rarityClass(b.rarity)} ${esc(b.customClass || '')}" data-badge-id="${esc(b.id)}" aria-expanded="false" style="--badge-index:${i}"><span class="badge-card-scan" aria-hidden="true"></span><span class="badge-art">${b.imageUri ? `<img src="${esc(b.imageUri)}" alt="" loading="lazy">` : '<span class="badge-fallback">✦</span>'}</span><span class="badge-card-name">${esc(b.name || 'Unknown Tome')}</span><span class="badge-card-rarity">${esc(b.rarity || 'Common')}</span><span class="badge-card-category">${esc(b.category || 'ARCHIVE')}</span><span class="badge-card-action">VIEW RECORD <span aria-hidden="true">↗</span></span></button>`).join('') || '<div class="badge-empty">NO TOME RECORDS MATCH THIS SEARCH</div>';
    gallery.querySelectorAll('.badge-card').forEach(card => {
      const b = badges.find(x => String(x.id) === card.dataset.badgeId); if (!b) return;
      card.addEventListener('mouseenter', () => { if (matchMedia('(hover: hover)').matches) showDetails(card,b); });
      card.addEventListener('mouseleave', e => { if (matchMedia('(hover: hover)').matches && activeCard === card && !document.querySelector('.badge-detail-popover')?.contains(e.relatedTarget)) closeTimer = setTimeout(closeDetails, 160); });
      card.addEventListener('focus', () => showDetails(card,b));
      card.addEventListener('click', () => showDetails(card,b,true));
      card.addEventListener('keydown', e => { if (e.key === 'Escape') { closeDetails(); card.focus(); } });
    });
  }
  [search, rarity, category, sort].forEach(el => el?.addEventListener(el === search ? 'input' : 'change', render));
  window.addEventListener('echo:badges-updated', render);
  window.addEventListener('resize', () => { const panel = document.querySelector('.badge-detail-popover'); if (panel && activeCard) positionPanel(panel,activeCard); });
  window.addEventListener('scroll', () => { const panel = document.querySelector('.badge-detail-popover'); if (panel && activeCard && !panel.classList.contains('tome-detail-mobile')) positionPanel(panel,activeCard); }, true);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDetails(); });
  document.addEventListener('click', e => { if (document.querySelector('.badge-detail-popover') && !e.target.closest('.badge-card') && !e.target.closest('.badge-detail-popover')) closeDetails(); });
  $('creatorMessageButton')?.addEventListener('click', () => { const m = $('creatorMessageModal'); m.hidden = false; document.body.classList.add('creator-message-open'); $('creatorMessageClose')?.focus(); });
  const closeMessage = () => { const m = $('creatorMessageModal'); if (m) { m.hidden = true; document.body.classList.remove('creator-message-open'); } };
  $('creatorMessageClose')?.addEventListener('click', closeMessage);
  $('creatorMessageModal')?.addEventListener('click', e => { if (e.target === $('creatorMessageModal')) closeMessage(); });
  render();
})();
