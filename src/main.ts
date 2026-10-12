import './style.css'
import { profile, projects, type Project } from './projects'

const escape = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!)
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
const external = (url: string) => /^https?:\/\//.test(url)
const projectType = (project: Project) => project.id === 'everylife' ? 'Merch Sticker' : project.id === 'potential' ? 'Website' : 'Interactive Website'
const arrow = '<span aria-hidden="true">↗</span>'
const art = (project: Project, livePreview = false) => project.id === 'potential' && livePreview
  ? `<div class="potential-logo-cover"><div class="potential-card-content"><img src="${escape(asset('images/potential-logo.png'))}" alt="POTENTIAL" /><p class="potential-card-story">He said to me, “You are my potential”<br>So I started making all sorts of things.<br>Maybe I take after my dad<br>I love making beautiful things.<br>I hope the things I make bring you joy.</p></div></div>`
  : project.id === 'glyfing' && livePreview
  ? `<video class="project-video" src="${escape(asset('videos/glyfing.mp4'))}" poster="${escape(asset('videos/glyfing.jpg'))}" muted loop playsinline preload="auto" aria-label="GLYF 캐릭터와 젤리의 움직이는 미리보기"></video>`
  : project.id === 'everylife'
  ? `<img class="project-preview-image" src="${escape(asset('images/everylife-card.webp'))}" alt="everylife 로고와 기저귀·아기 스티커" width="822" height="822" fetchpriority="high" loading="eager" decoding="async" />`
  : project.image
  ? `<img class="project-preview-image" src="${escape(asset(project.image))}" alt="${escape(project.title)} 웹사이트 미리보기" />`
  : project.video
  ? `<video class="project-video" src="${escape(asset(project.video))}" ${project.poster ? `poster="${escape(asset(project.poster))}"` : ''} ${matchMedia('(prefers-reduced-motion: reduce)').matches ? '' : 'autoplay'} muted loop playsinline preload="metadata" aria-label="${escape(project.title)} 미리보기"></video><span class="video-play">▶</span>`
  : `<div class="art art-${project.theme}" aria-hidden="true"><span class="art-mark">${project.theme === 'type' ? 'Aa' : project.theme === 'form' ? 'f.' : project.theme === 'still' ? 'STILL<br>LIFE' : project.theme === 'wave' ? 'after<br>hours.' : ''}</span><i class="object object-one"></i><i class="object object-two"></i><i class="object object-three"></i><span class="art-caption">${project.theme === 'orbit' ? 'A NEW PERSPECTIVE' : project.theme === 'amber' ? 'LIGHT · IN A DIFFERENT FORM.' : 'INDEPENDENT DIGITAL EXPLORATION'}</span></div>`
const card = (project: Project, index: number) => `<button class="project-card" data-project="${project.id}" aria-label="${escape(project.title)} 프로젝트 보기">${art(project, true)}<span class="card-top"><span>${String(projects.length - index).padStart(2, '0')}</span></span><span class="card-bottom"><span class="card-title">${escape(project.title)}</span><span class="card-meta">${(project.id === 'guestbook' || project.id === 'glyfing') ? '<span class="card-category">Interactive Website</span>' : project.id === 'everylife' ? '<span class="card-category">Merch Sticker</span>' : project.id === 'potential' ? '<span class="card-category">Website</span>' : escape(project.category)} ${arrow}</span></span></button>`

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<header class="header" id="top"><div class="header-brand"><a class="wordmark" href="#top">wanseo jo<span class="wordmark-sub">PORTFOLIO</span></a></div><nav aria-label="주 메뉴"><details class="skill-menu"><summary>SKILL</summary><ul class="skill-list"><li>adobe illustrator</li><li>adobe photoshop</li><li>figma</li><li>AI</li><li>python</li><li>java</li><li>c++</li></ul></details><details class="skill-menu contact-menu"><summary>CONTACT</summary><ul class="skill-list"><li><a href="mailto:${escape(profile.email)}">${escape(profile.email)}</a></li></ul></details></nav></header>
<main><section class="intro"><div class="intro-top"><span>${escape(profile.introduction)}</span></div></section>
<section id="work" class="work"><a href="#work" class="work-label">WORK</a><div class="project-grid">${projects.map(card).join('')}</div></section></main>
<footer><div class="footer-bottom"><span>© ${new Date().getFullYear()} wanseo jo</span><span>Seoul · Korea</span></div></footer>
<dialog id="project-dialog" aria-labelledby="dialog-title"><button class="close-button" aria-label="닫기">×</button><div id="dialog-content"></div></dialog>
`


const everylifeDetail = (project: Project) => `
  <article class="goods-case">
    <header class="goods-hero">
      <h2><img class="goods-hero-logo" src="${escape(asset('images/everylife-logo.svg'))}" alt="everylife" /></h2>

    </header>
    <section class="goods-section goods-overview dialog-copy">
      <span class="eyebrow">${projectType(project)} ${escape(project.year)}</span>
      <h2 id="dialog-title">${escape(project.title)}</h2>
      <div><p>${escape(project.description).replace(/\n/g, '<br>')}</p>
      <dl class="goods-facts"><div><dt>Role</dt><dd>${escape(project.role ?? '')}</dd></div><div><dt>Tool</dt><dd>Adobe Illustrator</dd></div></dl></div>
    </section>
    <section class="goods-section"><div class="goods-section-heading"><span class="goods-index">COLOR PALETTE</span></div>
      <div class="goods-palette">${[['Rose','#DEBBBB'],['Sky','#B3D1DE'],['Mauve','#777083'],['Blush','#E1D5D7'],['Mint','#DBE9E5']].map(([name,color]) => `<div><i style="background:${color}"></i><span>${name}</span><small>${color}</small></div>`).join('')}</div>

    </section>
    <section class="goods-section goods-design-board"><div class="goods-section-heading"><span class="goods-index">DESIGN BOARD</span></div>
      <a class="goods-board-link" href="${escape(asset(project.image!))}" target="_blank" rel="noopener noreferrer" aria-label="everylife 디자인 원본 크게 보기"><img class="goods-board" src="${escape(asset(project.image!))}" alt="흰색 칼선이 있는 기저귀 스티커 네 개 · 아기 캐릭터 네 개 · 원형 로고 스티커 다섯 개" loading="lazy"/></a>
    </section>
    <section class="goods-section goods-application"><div class="goods-section-heading"><span class="goods-index">APPLICATION</span></div><img class="goods-application-image goods-macbook-image" width="2536" height="1668" decoding="async" src="${escape(asset('images/everylife-macbook-application-hires.webp'))}" alt="맥북에 everylife 아기 스티커 두 개 · 원형 로고 두 개와 기저귀 스티커 한 개를 붙인 굿즈 적용 목업" loading="lazy" /><img class="goods-application-image goods-notebook-image" src="${escape(asset('images/everylife-notebook-application.svg?v=2'))}" alt="오프화이트 배경의 노트에 원본 보라색 원형 로고 · 갈색머리 아기와 기저귀 스티커를 붙인 목업" loading="lazy" /><img class="goods-application-image goods-bottle-image" src="${escape(asset('images/everylife-bottle-curly.png'))}" alt="everylife 원형 로고 · 기저귀와 하늘색 기저귀를 입은 뽀글머리 아기 스티커를 붙인 투명 물병 적용 사진" loading="lazy" /></section>

  </article>`

const projectDialog = document.querySelector<HTMLDialogElement>('#project-dialog')!
function openDialog(dialog: HTMLDialogElement) { dialog.showModal(); document.body.classList.add('modal-open') }
function closeDialog(dialog: HTMLDialogElement) { dialog.close() }
for (const dialog of [projectDialog]) {
  dialog.querySelector('.close-button')!.addEventListener('click', () => closeDialog(dialog))
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); const e = event as MouseEvent; if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closeDialog(dialog) } })
  dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); dialog.querySelectorAll('video').forEach(video => video.pause()) })
}
document.querySelectorAll<HTMLButtonElement>('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects.find(item => item.id === button.dataset.project)!
  projectDialog.dataset.project = project.id
  projectDialog.classList.toggle('goods-dialog', project.id === 'everylife')
  document.querySelector('#dialog-content')!.innerHTML = project.id === 'everylife' ? everylifeDetail(project) : `<div class="dialog-art${project.id === 'glyfing' ? ' glyfing-dialog-art' : project.id === 'potential' ? ' potential-dialog-art' : ''}">${project.id === 'glyfing' ? `<video class="glyfing-detail-video" src="${escape(asset('videos/glyfing-detail.mp4?v=6'))}" poster="${escape(asset('videos/glyfing-detail.jpg?v=6'))}" muted loop playsinline preload="auto" aria-label="GLYF 최신 웹사이트 녹화"></video>` : project.id === 'potential' ? `<video class="potential-detail-video" src="${escape(asset('videos/potential.mp4?v=11'))}" poster="${escape(asset('videos/potential.jpg?v=11'))}" muted loop playsinline preload="auto" aria-label="POTENTIAL 웹사이트 미리보기"></video>` : art(project)}</div><div class="dialog-copy"><span class="eyebrow">${projectType(project)} ${escape(project.year)}</span><h2 id="dialog-title">${escape(project.title)}</h2><p>${escape(project.description).replace(/\n/g, '<br>')}</p>${project.role ? `<dl class="project-role"><dt>Role</dt><dd>${escape(project.role)}</dd></dl>` : ''}${project.url && external(project.url) ? `<a class="outline-button" href="${escape(project.url)}" target="_blank" rel="noopener noreferrer">VISIT WEBSITE ${arrow}</a>` : '<span class="sample-label">CONCEPT PREVIEW · 샘플 프로젝트</span>'}</div>`
  openDialog(projectDialog)
  projectDialog.scrollTop = 0
  projectDialog.querySelectorAll('video').forEach(video => { video.muted = true; video.controls = true; if (!reducedMotion.matches) void video.play().catch(() => {}) })
}))
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  entry.target.classList.toggle('in-view', entry.isIntersecting)
  const video = entry.target.querySelector('video')
  if (video) { video.muted = true; if (entry.isIntersecting && !reducedMotion.matches) void video.play().catch(() => entry.target.classList.add('video-paused')); else video.pause() }
}), { threshold: 0.05 })
document.querySelectorAll('.project-card').forEach(card => observer.observe(card))

const menus = document.querySelectorAll<HTMLDetailsElement>('.skill-menu')
menus.forEach(menu => {
  menu.querySelector('summary')!.addEventListener('click', () => { menus.forEach(other => { if (other !== menu) other.open = false }) })
})
document.addEventListener('click', event => { menus.forEach(menu => { if (!menu.contains(event.target as Node)) menu.open = false }) })
document.addEventListener('keydown', event => { if (event.key === 'Escape') menus.forEach(menu => { if (menu.open) { menu.open = false; menu.querySelector('summary')!.focus() } }) })
