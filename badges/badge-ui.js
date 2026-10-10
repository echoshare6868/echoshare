/* ECHO//SHARE Badge UI — gallery, hover details, touch-friendly tap details. */
(() => {
  const $ = id => document.getElementById(id);
  const gallery=$('badgeGallery'), search=$('badgeSearch'), filter=$('badgeRarityFilter'), count=$('badgeVaultCount');
  if(!gallery) return;
  let activeCard=null, audio=null;
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const rarityClass=value=>String(value||'common').toLowerCase().replace(/[^a-z0-9-]/g,'-');
  function playSound(badge){
    const settings=window.EchoBadgeSystem.getSettings();
    if(!settings.playHoverSound)return;
    const src=badge.hoverSoundUri||settings.hoverSoundUri;
    if(!src)return;
    try{if(audio){audio.pause();audio.currentTime=0;}audio=new Audio(src);audio.volume=.35;audio.play().catch(()=>{});}catch(_){}
  }
  function details(b){
    const settings=window.EchoBadgeSystem.getSettings();
    return `<div class="badge-detail-art"><img src="${esc(b.imageUri||'')}" alt=""></div><div class="badge-detail-copy"><span class="badge-detail-kicker">BADGE INTELLIGENCE // ${esc(b.category||'ARCHIVE')}</span><h3>${esc(b.name||'Unknown Badge')}</h3><span class="badge-rarity rarity-${rarityClass(b.rarity)}">${esc(b.rarity||'Common')}</span>${settings.showDescription!==false?`<p>${esc(b.description||'No description has been configured yet.')}</p>`:''}${settings.showHowToEarn!==false?`<div class="badge-howto"><b>HOW TO OBTAIN</b><p>${esc(b.howToEarn||'Unlock condition not configured.')}</p></div>`:''}<div class="badge-detail-id">RECORD // ${esc(b.id||'CUSTOM')}</div></div>`;
  }
  function closeDetails(){if(activeCard){activeCard.classList.remove('badge-selected');activeCard.setAttribute('aria-expanded','false');activeCard=null;}document.querySelector('.badge-detail-popover')?.remove();}
  function showDetails(card,badge){
    if(activeCard===card){closeDetails();return;}
    closeDetails();activeCard=card;card.classList.add('badge-selected');card.setAttribute('aria-expanded','true');
    const pop=document.createElement('div');pop.className='badge-detail-popover';pop.innerHTML=details(badge);card.appendChild(pop);playSound(badge);
  }
  function render(){
    const badges=window.EchoBadgeSystem.getBadges(),q=(search?.value||'').trim().toLowerCase(),r=filter?.value||'all';
    const list=badges.filter(b=>(!q||[b.name,b.description,b.rarity,b.category].join(' ').toLowerCase().includes(q))&&(r==='all'||String(b.rarity).toLowerCase()===r.toLowerCase()));
    if(count)count.textContent=String(badges.length).padStart(2,'0');
    closeDetails();
    gallery.innerHTML=list.map((b,i)=>`<button type="button" class="badge-card rarity-${rarityClass(b.rarity)} ${esc(b.customClass||'')}" data-badge-id="${esc(b.id)}" aria-expanded="false" style="--badge-index:${i}"><span class="badge-card-scan" aria-hidden="true"></span><span class="badge-art">${b.imageUri?`<img src="${esc(b.imageUri)}" alt="" loading="lazy">`:`<span class="badge-fallback">✦</span>`}</span><span class="badge-card-name">${esc(b.name||'Unknown Badge')}</span><span class="badge-card-rarity">${esc(b.rarity||'Common')}</span><span class="badge-card-category">${esc(b.category||'ARCHIVE')}</span></button>`).join('')||'<div class="badge-empty">NO BADGE RECORDS MATCH THIS SEARCH</div>';
    gallery.querySelectorAll('.badge-card').forEach(card=>{
      const b=badges.find(x=>String(x.id)===card.dataset.badgeId);if(!b)return;
      card.addEventListener('mouseenter',()=>{if(matchMedia('(hover: hover)').matches)showDetails(card,b);});
      card.addEventListener('mouseleave',()=>{if(matchMedia('(hover: hover)').matches&&activeCard===card)closeDetails();});
      card.addEventListener('focus',()=>showDetails(card,b));
      card.addEventListener('click',()=>showDetails(card,b));
      card.addEventListener('keydown',e=>{if(e.key==='Escape')closeDetails();});
    });
  }
  search?.addEventListener('input',render);filter?.addEventListener('change',render);
  window.addEventListener('echo:badges-updated',render);
  $('creatorMessageButton')?.addEventListener('click',()=>{const m=$('creatorMessageModal');m.hidden=false;document.body.classList.add('creator-message-open');$('creatorMessageClose')?.focus();});
  const closeMessage=()=>{const m=$('creatorMessageModal');if(m){m.hidden=true;document.body.classList.remove('creator-message-open');}};
  $('creatorMessageClose')?.addEventListener('click',closeMessage);
  $('creatorMessageModal')?.addEventListener('click',e=>{if(e.target===$('creatorMessageModal'))closeMessage();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMessage();closeDetails();}});
  render();
})();