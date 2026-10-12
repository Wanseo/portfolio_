import './style.css'
import { profile, projects, type Project } from './projects'

const escape = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!)
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
const external = (url: string) => /^https?:\/\//.test(url)
const arrow = '<span aria-hidden="true">↗</span>'
const art = (project: Project, livePreview = false) => project.id === 'potential' && livePreview
  ? `<div class="potential-logo-cover"><img src="${escape(asset('images/potential-logo.png'))}" alt="POTENTIAL" /></div>`
  : project.id === 'glyfing' && livePreview
  ? `<video class="project-video" src="${escape(asset('videos/glyfing.mp4'))}" poster="${escape(asset('videos/glyfing.jpg'))}" muted loop playsinline preload="auto" aria-label="GLYFING 캐릭터와 젤리의 움직이는 미리보기"></video>`
  : project.id === 'everylife'
  ? `<div class="everylife-cover"><img class="everylife-card-logo" src="${escape(asset('images/everylife-logo.svg'))}" alt="everylife" /><div class="everylife-card-stickers"><svg viewBox="195 0 1335 235" role="img" aria-label="everylife 기저귀 패키지"><image href="${escape(asset('images/everylife-stickers.png'))}" width="1765" height="891" /></svg><svg viewBox="195 240 1335 432" role="img" aria-label="everylife 아기 캐릭터"><image href="${escape(asset('images/everylife-stickers.png'))}" width="1765" height="891" /></svg></div></div>`
  : project.image
  ? `<img class="project-preview-image" src="${escape(asset(project.image))}" alt="${escape(project.title)} 웹사이트 미리보기" />`
  : project.video
  ? `<video class="project-video" src="${escape(asset(project.video))}" ${project.poster ? `poster="${escape(asset(project.poster))}"` : ''} ${matchMedia('(prefers-reduced-motion: reduce)').matches ? '' : 'autoplay'} muted loop playsinline preload="metadata" aria-label="${escape(project.title)} 미리보기"></video><span class="video-play">▶</span>`
  : `<div class="art art-${project.theme}" aria-hidden="true"><span class="art-mark">${project.theme === 'type' ? 'Aa' : project.theme === 'form' ? 'f.' : project.theme === 'still' ? 'STILL<br>LIFE' : project.theme === 'wave' ? 'after<br>hours.' : ''}</span><i class="object object-one"></i><i class="object object-two"></i><i class="object object-three"></i><span class="art-caption">${project.theme === 'orbit' ? 'A NEW PERSPECTIVE' : project.theme === 'amber' ? 'LIGHT, IN A DIFFERENT FORM.' : 'INDEPENDENT DIGITAL EXPLORATION'}</span></div>`
const card = (project: Project, index: number) => `<button class="project-card" data-project="${project.id}" aria-label="${escape(project.title)} 프로젝트 보기">${art(project, true)}<span class="card-top"><span>${String(projects.length - index).padStart(2, '0')}</span></span><span class="card-bottom"><span class="card-title">${escape(project.title)}</span><span class="card-meta">${escape(project.category)} ${arrow}</span></span></button>`

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<header class="header" id="top"><div class="header-brand"><a class="wordmark" href="#top">wanseo jo<span class="wordmark-sub">WEB ARCHIVE</span></a></div><nav aria-label="주 메뉴"><details class="skill-menu"><summary>SKILL</summary><ul class="skill-list"><li>adobe illustrator</li><li>adobe photoshop</li><li>figma</li><li>AI</li><li>python</li><li>java</li><li>c++</li></ul></details><details class="skill-menu contact-menu"><summary>CONTACT</summary><ul class="skill-list"><li><a href="mailto:${escape(profile.email)}">${escape(profile.email)}</a></li></ul></details></nav></header>
<main><section class="intro"><div class="intro-top"><span>${escape(profile.introduction)}</span><a class="instagram-link intro-instagram" href="${escape(profile.instagram)}" target="_blank" rel="noopener noreferrer" aria-label="wsjoy_ 인스타그램 새 탭에서 열기"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a></div></section>
<section id="work" class="work"><a href="#work" class="work-label">WORK</a><div class="project-grid">${projects.map(card).join('')}</div></section></main>
<footer><div class="footer-bottom"><span>© ${new Date().getFullYear()} wanseo jo</span><span>Seoul, Korea</span></div></footer>
<dialog id="project-dialog" aria-labelledby="dialog-title"><button class="close-button" aria-label="닫기">×</button><div id="dialog-content"></div></dialog>
`


const everylifeDetail = (project: Project) => `
  <article class="goods-case">
    <header class="goods-hero">
      <span class="eyebrow">merch graphic design</span>
      <h2><img class="goods-hero-logo" src="${escape(asset('images/everylife-logo.svg'))}" alt="everylife" /></h2>

    </header>
    <section class="goods-section goods-overview dialog-copy">
      <span class="eyebrow">${escape(project.category)}${project.year ? ` / ${escape(project.year)}` : ''}</span>
      <h2 id="dialog-title">${escape(project.title)}</h2>
      <div><p>${escape(project.description)}</p><p>서로 다른 헤어스타일과 피부색의 캐릭터, 다섯 가지 파스텔 컬러, 간결한 로고를 하나의 시각 언어로 연결했습니다.</p>
      <dl class="goods-facts"><div><dt>ROLE</dt><dd>${escape(project.role ?? '')}</dd></div><div><dt>OUTPUT</dt><dd>Character Illustration, Sticker Graphics</dd></div></dl></div>
    </section>
    <section class="goods-section"><div class="goods-section-heading"><span class="goods-index">02 / DESIGN BOARD</span><h3>하나의 브랜드, 다양한 표정</h3></div>
      <a class="goods-board-link" href="${escape(asset(project.image!))}" target="_blank" rel="noopener noreferrer" aria-label="everylife 디자인 원본 크게 보기"><img class="goods-board" src="${escape(asset(project.image!))}" alt="네 가지 캐릭터, 패키지 그래픽, 다섯 가지 원형 스티커와 로고 컬러 조합" loading="lazy"/><span>DESIGN BOARD · 원본 크게 보기 ↗</span></a>
    </section>
    <section class="goods-section"><div class="goods-section-heading"><span class="goods-index">03 / COLOR & TYPE</span><h3>부드러운 색, 선명한 개성</h3></div>
      <div class="goods-palette">${[['Rose','#DEBBBB'],['Sky','#B3D1DE'],['Mauve','#777083'],['Blush','#E1D5D7'],['Mint','#DBE9E5']].map(([name,color]) => `<div><i style="background:${color}"></i><span>${name}</span><small>${color}</small></div>`).join('')}</div>
      <div class="goods-type"><span>everylife</span><p>캐릭터의 자유로운 선과 대비되는<br>차분한 세리프 로고.</p></div>
    </section>
    <section class="goods-section goods-notes"><span class="goods-index">04 / DESIGN NOTES</span><div><h3>캐릭터에서 굿즈까지</h3><p>캐릭터의 뒷모습과 원형 로고를 결합해 시리즈의 통일감을 만들고, 컬러 변주로 각 디자인의 개성을 살렸습니다. 원형과 직사각형으로 확장한 로고 그래픽은 다양한 굿즈에 적용할 수 있도록 구성했습니다.</p></div></section>
    <footer class="goods-end"><span>everylife</span><span>GOODS DESIGN · WANSEO JO</span></footer>
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
  projectDialog.classList.toggle('goods-dialog', project.id === 'everylife')
  document.querySelector('#dialog-content')!.innerHTML = project.id === 'everylife' ? everylifeDetail(project) : `<div class="dialog-art${project.id === 'glyfing' ? ' glyfing-dialog-art' : project.id === 'potential' ? ' potential-dialog-art' : ''}">${project.id === 'glyfing' ? `<video class="glyfing-detail-video" src="${escape(asset('videos/glyfing-detail.mp4?v=2'))}" poster="${escape(asset('videos/glyfing-detail.jpg?v=2'))}" muted loop playsinline preload="auto" aria-label="GLYFING 최신 웹사이트 녹화"></video>` : project.id === 'potential' ? `<video class="potential-detail-video" src="${escape(asset('videos/potential.mp4?v=11'))}" poster="${escape(asset('videos/potential.jpg?v=11'))}" muted loop playsinline preload="auto" aria-label="POTENTIAL 웹사이트 미리보기"></video>` : art(project)}</div><div class="dialog-copy"><span class="eyebrow">${escape(project.category)} / ${project.year}</span><h2 id="dialog-title">${escape(project.title)}</h2><p>${escape(project.description)}</p>${project.role ? `<dl class="project-role"><dt>ROLE</dt><dd>${escape(project.role)}</dd></dl>` : ''}${project.url && external(project.url) ? `<a class="outline-button" href="${escape(project.url)}" target="_blank" rel="noopener noreferrer">VISIT WEBSITE ${arrow}</a>` : '<span class="sample-label">CONCEPT PREVIEW · 샘플 프로젝트</span>'}</div>`
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
