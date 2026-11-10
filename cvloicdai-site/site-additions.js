(()=>{
  const copy={
    zh:{tag:'简历下载',title:'选择适合岗位的简历版本',lead:'五份简历，分别面向内部审计、管理控制及中文岗位。',audit:'内部审计',control:'管理控制',resume:'下载 PDF',rednote:'在小红书查看我的作品集',rednoteText:'欢迎浏览我的创作、灵感与视觉项目。'},
    fr:{tag:'CV · TÉLÉCHARGEMENTS',title:'Choisissez la version adaptée au poste',lead:'Cinq versions ciblées en audit interne, contrôle de gestion et chinois.',audit:'Audit interne',control:'Contrôle de gestion',resume:'Télécharger le PDF',rednote:'Voir mon portfolio sur Xiaohongshu',rednoteText:'Retrouvez mes créations, inspirations et projets visuels.'},
    en:{tag:'RÉSUMÉ · DOWNLOADS',title:'Choose the résumé for your role',lead:'Five versions focused on internal audit, management control and Chinese roles.',audit:'Internal audit',control:'Management control',resume:'Download PDF',rednote:'View my Xiaohongshu portfolio',rednoteText:'Explore my creative work, inspiration and visual projects.'}
  };
  const files=[['FRANÇAIS','audit','CV Loïc DAI AI FR.pdf'],['FRANÇAIS','control','CV Loïc DAI CG FR.pdf'],['ENGLISH','audit','CV Loïc DAI IA EN.pdf'],['ENGLISH','control','CV Loïc DAI CG EN.pdf'],['中文','zh','CV Loïc DAI CH.pdf']];
  const currentLanguage=()=>{const b=[...document.querySelectorAll('.languages button')].find(x=>x.getAttribute('aria-pressed')==='true');const x=(b?.textContent||'').trim().toUpperCase();return x==='FR'?'fr':x==='EN'?'en':'zh'};
  function mount(){
    const gallery=document.querySelector('#gallery'),nav=document.querySelector('.navigation');
    if(!gallery||!nav)return false;
    const lang=currentLanguage(),t=copy[lang];
    let navLink=document.querySelector('[data-extra-nav]');if(!navLink){navLink=document.createElement('a');navLink.href='#cv-downloads';navLink.className='cv-nav-link';navLink.dataset.extraNav='';nav.querySelector('a[href="#skills"]')?.after(navLink)}if(navLink.textContent!==t.tag)navLink.textContent=t.tag;
    let section=document.querySelector('#cv-downloads');
    if(!section){section=document.createElement('section');section.id='cv-downloads';section.className='cv-additions';gallery.before(section)}
    if(section.dataset.lang!==lang){section.dataset.lang=lang;section.innerHTML=`<div class="cv-kicker">${t.tag}</div><h2>${t.title}</h2><p class="cv-lead">${t.lead}</p><div class="cv-downloads">${files.map(([label,key,file])=>`<a class="cv-download" href="/cv/${encodeURIComponent(file)}" download><small>${label}</small><strong>${key==='audit'?t.audit:key==='control'?t.control:'中文简历'}</strong><span>${t.resume} ↗</span></a>`).join('')}</div>`}
    let red=gallery.querySelector('.rednote-cta');
    if(!red){red=document.createElement('div');red.className='rednote-cta';gallery.append(red)}
    if(red.dataset.lang!==lang){red.dataset.lang=lang;red.innerHTML=`<p>${t.rednoteText}</p><a href="https://www.xiaohongshu.com/user/profile/67c3361a000000000d008b7b" target="_blank" rel="noopener noreferrer">${t.rednote} <span>↗</span></a>`}
    return true;
  }
  let count=0;const timer=setInterval(()=>{count++;mount();if(count>=50)clearInterval(timer)},200);
  new MutationObserver(()=>mount()).observe(document.documentElement,{childList:true,subtree:true});
  document.addEventListener('click',e=>{if(e.target.closest('.languages button'))setTimeout(mount,100)});
})();
