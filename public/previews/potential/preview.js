(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`sticker-01`,name:`POTENTIAL sticker`,category:`laptop-stickers`,image:`products/sticker-01-sky-cyan.png`,price:6e3,color:`Mint / Blue / Pink`},{id:`sticker-02`,name:`POTENTIAL sticker (circular)`,category:`laptop-stickers`,image:`products/sticker-02-sky-cyan.png`,price:6e3,color:`Mint / Blue / Pink`}];function t(e,t){return t?e.filter(e=>e.category===t):[...e]}function n(e,t){e.innerHTML=`
    <article class="product-detail">
      <div class="detail-gallery"><img alt="" /></div>
      <div class="detail-info">
        <h1></h1>
        <p class="detail-price"></p>
        <p class="detail-description">POTENTIAL 로고 스티커</p>
        <div class="detail-option"><span>Color</span><span class="detail-color"></span></div>
        <div class="detail-option">
          <span>Quantity</span>
          <div class="quantity-control">
            <button type="button" class="quantity-minus" aria-label="수량 줄이기">−</button>
            <input type="number" min="1" max="99" value="1" aria-label="상품 수량" />
            <button type="button" class="quantity-plus" aria-label="수량 늘리기">+</button>
          </div>
        </div>
        <button class="purchase-button" type="button" disabled>구매 준비 중</button>
      </div>
    </article>
  `,e.querySelector(`.product-detail`).dataset.productId=t.id;let n=e.querySelector(`.detail-gallery img`);if(n.src=`https://wanseo.github.io/potential/${t.image}`,n.alt=t.name,e.querySelector(`h1`).textContent=t.name,e.querySelector(`.detail-color`).textContent=t.color??`—`,e.querySelector(`.detail-price`).textContent=t.price===void 0?``:new Intl.NumberFormat(`ko-KR`,{style:`currency`,currency:`KRW`,maximumFractionDigits:0}).format(t.price),t.price!==void 0&&t.category===`laptop-stickers`){let t=document.createElement(`span`);t.className=`product-status`,t.textContent=`준비 중`,e.querySelector(`.detail-price`).replaceChildren(),e.querySelector(`.detail-price`).append(t)}let r=e.querySelector(`.quantity-control input`),i=e.querySelector(`.quantity-minus`),a=e.querySelector(`.quantity-plus`);function o(e=0){let t=Math.min(99,Math.max(1,Math.trunc(Number(r.value)||1)+e));r.value=String(t),i.disabled=t===1,a.disabled=t===99}i.addEventListener(`click`,()=>o(-1)),a.addEventListener(`click`,()=>o(1)),r.addEventListener(`change`,()=>o()),o()}var r=document.querySelector(`#app`);r.innerHTML=`
  <header class="site-header">
    <a class="brand" href="https://wanseo.github.io/potential/" aria-label="Potential 홈">
      <span class="brand-logo">
        <span class="brand-text" aria-hidden="true">POTENTIAL</span>
        <img class="brand-image" alt="POTENTIAL" hidden />
      </span>
    </a>
    <div class="header-menu-row">
    <nav class="site-nav" aria-label="메인 메뉴">
      <details class="shop-menu">
        <summary>Shop</summary>
        <ul class="shop-dropdown" aria-label="Shop 상품 분류">
          <li><a href="#shop">ALL</a></li>
          <li><a href="#shop/laptop-stickers">Laptop Sticker</a></li>
          <li><a href="#shop/calendar">Calendar</a></li>
          <li><a href="#shop/griptok">Phone Grip</a></li>
          <li><a href="#shop/phone-case">Phone Case</a></li>
          <li><a href="#shop/memo-pad">Memo Pad</a></li>
          <li><a href="#shop/eco-bag">Eco Bag</a></li>
        </ul>
      </details>
      <a href="#about">About</a>
      <a href="#archive">Archive</a>
      <details class="shop-menu contact-menu">
        <summary>Contact</summary>
        <ul class="shop-dropdown contact-dropdown" aria-label="Contact 연락처">
          <li><a href="https://www.instagram.com/youaremypotential/" target="_blank" rel="noopener noreferrer">@youaremypotential</a></li>
        </ul>
      </details>
    </nav>
    <div class="header-actions">
      <span class="search-icon" role="img" aria-label="검색">
        <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <circle cx="17" cy="17" r="13" />
          <path d="m27 27 10 10" />
        </svg>
      </span>
      <span class="login-label">LogIn</span>
      <span class="cart-label">Cart</span>
    </div>
    </div>
  </header>
  <div class="page-breadcrumb" hidden></div>
  <main class="home-content" aria-label="POTENTIAL 홈">
    <img class="home-image" src="https://wanseo.github.io/potential/main-image-07.png" alt="파란색과 보라색 POTENTIAL 패키지 상자" fetchpriority="high" />
  </main>
  <main class="page-content" tabindex="-1" hidden></main>
  <footer class="site-footer">
    <span>© 2026 POTENTIAL. Site by <a href="https://www.instagram.com/wsjoy_/" target="_blank" rel="noopener noreferrer">@wsjoy_</a></span>
    <span class="site-location">Seoul, Korea</span>
  </footer>
  <img class="rotating-logo" src="https://wanseo.github.io/potential/potential-circle-03-cutout.png" alt="" aria-hidden="true" width="112" height="112" />
`;var i=document.querySelector(`.brand`),a=document.querySelector(`.site-header`),o=document.querySelector(`.page-breadcrumb`),s=document.querySelector(`.header-actions`),c=document.querySelector(`.brand-logo`),l=document.querySelector(`.brand-image`),u=document.querySelector(`.home-image`),d=document.querySelector(`.brand-text`),f=window.matchMedia(`(prefers-reduced-motion: reduce)`),p,m=!1,h={shop:`Shop`,"shop/laptop-stickers":`Laptop Sticker`,"shop/calendar":`Calendar`,"shop/griptok":`Phone Grip`,"shop/phone-case":`Phone Case`,"shop/memo-pad":`Memo Pad`,"shop/eco-bag":`Eco Bag`,about:`About`,archive:`Archive`},g=document.querySelector(`.page-content`),_=document.querySelector(`.home-content`),v=document.querySelectorAll(`.site-nav a`),y=document.querySelector(`.site-nav .shop-menu`),b=!1;y.querySelector(`summary`).addEventListener(`click`,e=>{e.preventDefault(),b=!b,y.open=b}),y.addEventListener(`pointerenter`,e=>{e.pointerType!==`touch`&&!a.classList.contains(`is-content-page`)&&(y.open=!0)}),y.addEventListener(`pointerleave`,e=>{e.pointerType!==`touch`&&!b&&(y.open=!1)}),document.querySelector(`.site-nav`).addEventListener(`click`,e=>{e.target instanceof Node&&(document.querySelectorAll(`.site-nav > details`).forEach(t=>{t.contains(e.target)||(t.open=!1)}),y.contains(e.target)||(b=!1,y.open=!1))}),document.addEventListener(`click`,e=>{e.target instanceof Node&&document.querySelectorAll(`.site-nav > details`).forEach(t=>{t.contains(e.target)||(t.open=!1,t===y&&(b=!1))})});function x(n){if(g.replaceChildren(),n!==`shop`&&!n.startsWith(`shop/`))return;let r=t(e,n.split(`/`)[1]);if(!r.length){let e=document.createElement(`p`);e.className=`products-empty`,e.textContent=`아직 등록된 상품이 없습니다.`,g.append(e);return}let i=document.createElement(`ul`);i.className=`product-grid`,r.forEach(e=>{let t=document.createElement(`li`);t.className=`product-card`,t.dataset.productId=e.id;let n=document.createElement(`a`);n.className=`product-link`,n.href=`#product/${e.id}`;let r=document.createElement(`img`);r.src=`https://wanseo.github.io/potential/${e.image.replace(/^\/+/,``)}`,r.alt=e.name,r.loading=`lazy`;let a=document.createElement(`p`);if(a.className=`product-name`,a.textContent=e.name,n.append(r,a),e.price!==void 0){let t=document.createElement(`p`);if(t.className=`product-price`,t.textContent=new Intl.NumberFormat(`ko-KR`,{style:`currency`,currency:`KRW`,maximumFractionDigits:0}).format(e.price),e.category===`laptop-stickers`){let e=document.createElement(`span`);e.className=`product-status`,e.textContent=`준비 중`,t.replaceChildren(),t.append(e)}n.append(t)}t.append(n),i.append(t)}),g.append(i)}function S(t=!1){let r=window.location.hash.slice(1),i=r.startsWith(`product/`)?e.find(e=>e.id===r.slice(8)):void 0,c=i?.name??(Object.hasOwn(h,r)?h[r]:void 0);if(b=!1,y.open=!1,a.classList.toggle(`is-content-page`,!!c),a.classList.toggle(`is-shop-page`,!!(c&&(r===`shop`||r.startsWith(`shop/`)||i))),o.hidden=!c,o.replaceChildren(),c){let e=document.createElement(`details`);e.className=`breadcrumb-menu`;let t=document.createElement(`summary`);t.innerHTML=`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 5h18M3 12h18M3 19h18" /></svg>`,t.setAttribute(`aria-label`,`전체 메뉴 열기`);let n=document.createElement(`nav`);n.className=`breadcrumb-dropdown`,n.setAttribute(`aria-label`,`전체 메뉴`);let a=document.createElement(`details`);a.className=`breadcrumb-shop-group`;let s=document.createElement(`summary`);s.setAttribute(`aria-label`,`Shop 상품 분류 펼치기`),s.textContent=`Shop`;let l=document.createElement(`span`);l.className=`shop-short-arrow`,l.setAttribute(`aria-hidden`,`true`),l.innerHTML=`<svg viewBox="0 0 16 16" fill="none"><path d="M8 5v6M4 8l4 4 4-4" /></svg>`,s.append(l);let u=document.createElement(`nav`);u.className=`breadcrumb-categories`,u.setAttribute(`aria-label`,`Shop 상품 분류`),Object.entries(h).filter(([e])=>e===`shop`||e.startsWith(`shop/`)).forEach(([t,n])=>{let i=document.createElement(`a`);i.href=`#${t}`,i.textContent=t===`shop`?`ALL`:n,t===r&&i.setAttribute(`aria-current`,`page`),i.addEventListener(`click`,()=>{e.open=!1}),u.append(i)}),a.append(s,u),n.append(a);for(let t of[`about`,`archive`]){let r=document.createElement(`a`);r.href=`#${t}`,r.textContent=h[t],r.addEventListener(`click`,()=>{e.open=!1}),n.append(r)}let d=document.createElement(`details`);d.className=`breadcrumb-shop-group`;let f=document.createElement(`summary`);f.textContent=`Contact`;let p=document.createElement(`div`);p.className=`breadcrumb-categories contact-links`,p.innerHTML=`<a href="https://www.instagram.com/youaremypotential/" target="_blank" rel="noopener noreferrer">@youaremypotential</a>`,d.append(f,p),n.append(d),e.append(t,n),e.addEventListener(`keydown`,n=>{n.key===`Escape`&&(e.open=!1,t.focus())}),o.append(e);let m=document.createElement(`span`);m.className=`breadcrumb-path`;let g=r===`shop`?[`Shop`,`ALL`]:i?[`Shop`,h[`shop/${i.category}`]??i.category]:r.startsWith(`shop/`)?[`Shop`,c]:[c];g.forEach((e,t)=>{if(t&&m.append(` / `),t===0&&g.length>1){let t=document.createElement(`a`);t.href=`#shop`,t.textContent=e,m.append(t)}else{let t=document.createElement(`span`);t.textContent=e,t.setAttribute(`aria-current`,`page`),m.append(t)}}),o.append(m)}g.hidden=!c,a.append(s),_.hidden=!!c,x(c?r:``),r===`about`&&(g.innerHTML=`<p class="about-story">He said to me, “You are my potential”<br />
      So I started making all sorts of things.<br />
      Maybe I take after my dad<br />
      I love making beautiful things.<br />
      I hope the things I make bring you joy.</p>`),i&&n(g,i),c?g.setAttribute(`aria-label`,c):g.removeAttribute(`aria-label`),document.title=c?`${c} | POTENTIAL`:`POTENTIAL`,v.forEach(e=>{c&&(e.hash===`#${r}`||i&&e.hash===`#shop`)?e.setAttribute(`aria-current`,`page`):e.removeAttribute(`aria-current`)}),c&&(p?.cancel(),m=!0,a.classList.add(`is-settled`),t&&g.focus({preventScroll:!0}))}window.addEventListener(`hashchange`,()=>S(!0)),window.addEventListener(`popstate`,()=>S(!0)),i.addEventListener(`click`,e=>{e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||(e.preventDefault(),p?.cancel(),m=!0,a.classList.add(`is-settled`),window.location.hash&&window.history.pushState(null,``,`${window.location.pathname}${window.location.search}`),S(),window.scrollTo({top:0,behavior:`instant`}))}),S();function C(){if(f.matches||m){a.classList.add(`is-settled`);return}p?.cancel();let e=i.getBoundingClientRect(),t=c.getBoundingClientRect(),n=Math.max(1,Math.min(window.innerWidth*.625/t.width,3.5)),r=`translate(${(window.innerWidth-t.width*n)/2-e.left-(t.left-e.left)*n}px, ${(window.innerHeight-t.height*n)/2-e.top-(t.top-e.top)*n}px) scale(${n})`,o=1050;p=i.animate([{transform:r,opacity:0,offset:0},{transform:r,opacity:1,offset:250/o},{transform:r,opacity:1,offset:750/o,easing:`cubic-bezier(0.4, 0, 0.2, 1)`},{transform:`translate(0, 0) scale(1)`,opacity:1,offset:1}],{duration:o,easing:`linear`}),p.onfinish=()=>{m=!0,p?.cancel(),a.classList.add(`is-settled`)}}l.onload=async()=>{await u.decode().catch(()=>void 0),d.hidden=!0,l.hidden=!1,i.classList.add(`is-ready`),C()},l.onerror=()=>{l.hidden=!0,d.hidden=!1,i.classList.add(`is-ready`),C()},l.src=`https://wanseo.github.io/potential/potential-logo-02.png`,window.addEventListener(`resize`,()=>{p?.cancel(),m=!0,a.classList.add(`is-settled`)}),f.addEventListener(`change`,()=>{f.matches&&(p?.cancel(),m=!0,a.classList.add(`is-settled`))});