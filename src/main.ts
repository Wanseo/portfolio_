import './style.css'
import { profile, projects, type Project } from './projects'

const escape = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!)
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
const external = (url: string) => /^https?:\/\//.test(url)
const arrow = '<span aria-hidden="true">↗</span>'
const art = (project: Project) => project.video
  ? `<video class="project-video" src="${escape(asset(project.video))}" ${project.poster ? `poster="${escape(asset(project.poster))}"` : ''} ${matchMedia('(prefers-reduced-motion: reduce)').matches ? '' : 'autoplay'} muted loop playsinline preload="metadata" aria-label="${escape(project.title)} 미리보기"></video><span class="video-play">▶</span>`
  : `<div class="art art-${project.theme}" aria-hidden="true"><span class="art-mark">${project.theme === 'type' ? 'Aa' : project.theme === 'form' ? 'f.' : project.theme === 'still' ? 'STILL<br>LIFE' : project.theme === 'wave' ? 'after<br>hours.' : ''}</span><i class="object object-one"></i><i class="object object-two"></i><i class="object object-three"></i><span class="art-caption">${project.theme === 'orbit' ? 'A NEW PERSPECTIVE' : project.theme === 'amber' ? 'LIGHT, IN A DIFFERENT FORM.' : 'INDEPENDENT DIGITAL EXPLORATION'}</span></div>`
const card = (project: Project, index: number) => `<button class="project-card" data-project="${project.id}" aria-label="${escape(project.title)} 프로젝트 보기">${art(project)}<span class="card-top"><span>${String(index + 1).padStart(2, '0')}</span><span>${project.video ? 'MOTION' : 'DEMO'} <span class="live-dot"></span></span></span><span class="card-bottom"><span class="card-title">${escape(project.title)}</span><span class="card-meta">${escape(project.category)} ${arrow}</span></span></button>`

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<header class="header" id="top"><div class="header-brand"><a class="wordmark" href="#top">wanseo jo<span class="wordmark-sub">WEB ARCHIVE</span></a></div><nav aria-label="주 메뉴"><details class="skill-menu"><summary>SKILL</summary><ul class="skill-list"><li>adobe illustrator</li><li>adobe photoshop</li><li>figma</li><li>AI</li><li>python</li><li>java</li><li>c++</li></ul></details><details class="skill-menu contact-menu"><summary>CONTACT</summary><ul class="skill-list"><li><a href="mailto:${escape(profile.email)}">${escape(profile.email)}</a></li></ul></details></nav></header>
<main><section class="intro"><div class="intro-top"><span>${escape(profile.introduction)}</span><a class="instagram-link intro-instagram" href="${escape(profile.instagram)}" target="_blank" rel="noopener noreferrer" aria-label="wsjoy_ 인스타그램 새 탭에서 열기"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a></div></section>
<section id="work" class="work"><a href="#work" class="work-label">WORK</a><div class="project-grid">${projects.map(card).join('')}</div></section></main>
<footer><div class="footer-bottom"><span>© ${new Date().getFullYear()} wanseo jo</span><span>Seoul, Korea</span></div></footer>
<dialog id="project-dialog" aria-labelledby="dialog-title"><button class="close-button" aria-label="닫기">×</button><div id="dialog-content"></div></dialog>
`

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
  document.querySelector('#dialog-content')!.innerHTML = `<div class="dialog-art">${art(project)}</div><div class="dialog-copy"><span class="eyebrow">${escape(project.category)} / ${project.year}</span><h2 id="dialog-title">${escape(project.title)}</h2><p>${escape(project.description)}</p>${project.url && external(project.url) ? `<a class="outline-button" href="${escape(project.url)}" target="_blank" rel="noopener noreferrer">VISIT WEBSITE ${arrow}</a>` : '<span class="sample-label">CONCEPT PREVIEW · 샘플 프로젝트</span>'}</div>`
  openDialog(projectDialog)
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
