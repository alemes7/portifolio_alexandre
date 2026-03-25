// ═══════════════════════════════════════════
// LISTA DE VÍDEOS — edite aqui para adicionar/remover vídeos
// Coloque os arquivos em: assets/videos/
// ═══════════════════════════════════════════
const videosGaleria = [
    {
    titulo: "Chamada UFC — Edit Cinemática (Fake)",
    desc: `Uma edição cinematográfica que simula um dos confrontos mais aguardados da história do MMA: Conor McGregor vs Charles “do Bronxs” Oliveira.

    Inspirado no estilo de chamadas televisivas — como grandes produções da Globo — o vídeo recria toda a atmosfera de um evento real, com narração impactante, tensão e expectativa de um combate que nunca saiu do papel.

    Mesmo sendo uma produção fictícia, a proposta é explorar o “e se?”, trazendo à vida um duelo que fãs do mundo inteiro sempre imaginaram.`,
    arquivo: "assets/videos/ufc.mp4",
    thumb: "assets/videos/thumb_ufc.png"
  },
  // Para adicionar mais: copie o bloco acima e troque os dados
];


// ═══════════════════════════════════════════
// CURSOR
// ═══════════════════════════════════════════
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});
function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();
document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; follower.style.opacity = '0'; });
document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; follower.style.opacity = '1'; });


// ═══════════════════════════════════════════
// HEADER SCROLL
// ═══════════════════════════════════════════
const header = document.getElementById('header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 50));


// ═══════════════════════════════════════════
// MOBILE MENU
// ═══════════════════════════════════════════
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = menuToggle.querySelectorAll('span');
  const isOpen = mobileMenu.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity   = isOpen ? '0' : '';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});


// ═══════════════════════════════════════════
// PORTFOLIO FILTER
// ═══════════════════════════════════════════
const navItems       = document.querySelectorAll('.portfolio-nav li');
const portfolioItems = document.querySelectorAll('.portfolio-item');

function filterPortfolio(filtro) {
  portfolioItems.forEach(item => {
    item.style.display = (filtro === 'todos' || item.classList.contains(filtro)) ? 'block' : 'none';
  });
}
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navItems.forEach(i => i.classList.remove('ativo'));
    item.classList.add('ativo');
    filterPortfolio(item.getAttribute('data-filtro'));
  });
});
filterPortfolio('todos');


// ═══════════════════════════════════════════
// MODAL IMAGEM / SOFTWARE
// ═══════════════════════════════════════════
const modal        = document.getElementById('portfolioModal');
const modalImgWrap = document.getElementById('modalImgWrap');
const modalImg     = document.getElementById('modalImg');
const modalTitle   = document.getElementById('modalTitle');
const modalTag     = document.getElementById('modalTag');
const modalDesc    = document.getElementById('modalDesc');
const modalActions = document.getElementById('modalActions');
const modalGithub  = document.getElementById('modalGithub');
const modalLive    = document.getElementById('modalLive');
const modalClose   = document.getElementById('modalClose');

document.querySelectorAll('.portfolio-item:not([data-type="video-galeria"]) .ver-mais-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const item = btn.closest('.portfolio-item');
    const type = item.getAttribute('data-type');

    modalActions.classList.remove('visible');
    modalTag.textContent   = item.getAttribute('data-tag');
    modalTitle.textContent = item.getAttribute('data-title');
    modalDesc.textContent  = item.getAttribute('data-desc');
    modalImg.src = item.getAttribute('data-img');
    modalImg.alt = item.getAttribute('data-title');

    if (type === 'software') {
      const gh   = item.getAttribute('data-github');
      const live = item.getAttribute('data-live');
      if (gh)   modalGithub.href = gh;
      if (live) modalLive.href   = live;
      modalActions.classList.add('visible');
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });


// ═══════════════════════════════════════════
// MODAL GALERIA DE VÍDEOS
// ═══════════════════════════════════════════
const videoModal       = document.getElementById('videoModal');
const videoGaleriaView = document.getElementById('videoGaleriaView');
const videoPlayerView  = document.getElementById('videoPlayerView');
const videoGaleriaGrid = document.getElementById('videoGaleriaGrid');
const videoPlayer      = document.getElementById('videoPlayer');
const videoPlayerTitle = document.getElementById('videoPlayerTitle');
const videoPlayerDesc  = document.getElementById('videoPlayerDesc');
const videoVoltar      = document.getElementById('videoVoltar');
const videoModalClose  = document.getElementById('videoModalClose');

// Monta a grade de thumbnails
function buildVideoGaleria() {
  videoGaleriaGrid.innerHTML = '';
  videosGaleria.forEach((v, i) => {
    const card = document.createElement('div');
    card.className = 'vg-card';
    card.innerHTML = `
      <div class="vg-thumb">
        ${v.thumb
          ? `<img src="${v.thumb}" alt="${v.titulo}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />`
          : ''}
        <div class="vg-play-icon" ${v.thumb ? 'style="display:none"' : ''}>
          <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
      </div>
      <div class="vg-info">
        <span class="vg-titulo">${v.titulo}</span>
        <span class="vg-desc">${v.desc}</span>
      </div>
    `;
    card.addEventListener('click', () => playVideo(i));
    videoGaleriaGrid.appendChild(card);
  });
}

// Abre um vídeo específico
function playVideo(index) {
  const v = videosGaleria[index];
  videoPlayer.src = v.arquivo;
  videoPlayerTitle.textContent = v.titulo;
  videoPlayerDesc.textContent  = v.desc;
  videoGaleriaView.style.display = 'none';
  videoPlayerView.style.display  = 'block';
  videoPlayer.play();
}

// Volta pra galeria
videoVoltar.addEventListener('click', () => {
  videoPlayer.pause();
  videoPlayer.src = '';
  videoPlayerView.style.display  = 'none';
  videoGaleriaView.style.display = 'block';
});

// Abre o modal de galeria
const cardVideo = document.getElementById('cardVideo');
if (cardVideo) {
  cardVideo.querySelector('.ver-mais-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    buildVideoGaleria();
    videoGaleriaView.style.display = 'block';
    videoPlayerView.style.display  = 'none';
    videoModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
}

function closeVideoModal() {
  videoPlayer.pause();
  videoPlayer.src = '';
  videoModal.classList.remove('open');
  document.body.style.overflow = '';
}
videoModalClose.addEventListener('click', closeVideoModal);
videoModal.addEventListener('click', (e) => { if (e.target === videoModal) closeVideoModal(); });


// ═══════════════════════════════════════════
// ESC fecha qualquer modal aberto
// ═══════════════════════════════════════════
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (modal.classList.contains('open'))      closeModal();
  if (videoModal.classList.contains('open')) closeVideoModal();
});


// ═══════════════════════════════════════════
// SCROLL REVEAL
// ═══════════════════════════════════════════
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.servico-card, .skill-group, .sobre-exp-card').forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

window.addEventListener('load', () => window.scrollTo(0, 0));