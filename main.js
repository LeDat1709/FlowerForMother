const MESSAGES = {
  en: "I love you, Mom. You are the most beautiful flower in my life. Happy Mother's Day! 💐",
  vi: "Con yêu mẹ. Mẹ là đóa hoa đẹp nhất trong cuộc đời con. Chúc mừng Ngày của Mẹ! 💐"
};

let currentLang = 'vi';
let isMusicPlaying = false;

let introOpened = false;
let cardOpened = false;

onload = () => {
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 1000);

    createStars(40);
    createButterflies(3);

    applyLanguage();

    document.getElementById('langToggle').addEventListener('click', toggleLanguage);
    document.getElementById('musicToggle').addEventListener('click', toggleMusic);

    initMusic();
    runCountdown();
    initIntroCard();

    document.addEventListener('click', (e) => {
      if (!introOpened) return;
      if (e.target.closest('.control-btn')) return;
      if (e.target.closest('.intro-overlay')) return;
      createFireworks(e.clientX, e.clientY);
    });
  };

  function runCountdown() {
    const overlay = document.getElementById('countdownOverlay');
    const numEl = document.getElementById('countdownNum');
    if (!overlay || !numEl) return;

    let n = 5;
    numEl.textContent = n;

    const tick = () => {
      n--;
      if (n > 0) {
        numEl.classList.remove('go');
        numEl.style.animation = 'none';
        void numEl.offsetWidth;
        numEl.style.animation = '';
        numEl.textContent = n;
      } else if (n === 0) {
        numEl.classList.add('go');
        numEl.style.animation = 'none';
        void numEl.offsetWidth;
        numEl.style.animation = '';
        numEl.textContent = currentLang === 'vi' ? 'Mở quà thôi!' : "Let's open!";
      } else {
        clearInterval(interval);
        overlay.classList.add('hidden');
        document.getElementById('introOverlay').classList.remove('hidden');
        if (bgMusic && bgMusic.paused) {
          bgMusic.play().then(() => {
            isMusicPlaying = true;
            updateMusicUI(true);
          }).catch(() => {});
        }
      }
    };
    const interval = setInterval(tick, 1000);
  }

  function initIntroCard() {
    const cover = document.getElementById('cardCover');
    const overlay = document.getElementById('introOverlay');
    const continueBtn = document.getElementById('continueBtn');
    if (!cover || !overlay || !continueBtn) return;

    const cardStage = document.querySelector('.card-stage');
    cover.addEventListener('click', () => {
      if (cardOpened) return;
      cardOpened = true;
      cardStage.classList.add('opened');

      setTimeout(() => {
        continueBtn.classList.add('visible');
      }, 1900);
    });

    continueBtn.addEventListener('click', () => {
      if (introOpened) return;
      introOpened = true;
      overlay.classList.add('hidden');
      document.body.classList.add('intro-done');
      startTypewriter(500);
    });
  }

  function applyLanguage() {
    document.getElementById('langLabel').textContent = currentLang === 'en' ? 'VI' : 'EN';
    document.querySelectorAll('[data-en][data-vi]').forEach(el => {
      el.textContent = el.getAttribute('data-' + currentLang);
    });
  }

  function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'vi' : 'en';
    applyLanguage();

    const tw = document.getElementById('typewriter');
    if (tw) {
      tw.innerHTML = '';
      if (introOpened) startTypewriter(0);
    }
  }

  function startTypewriter(delay = 0) {
    setTimeout(() => {
      typeWriter(MESSAGES[currentLang], document.getElementById('typewriter'), 50);
    }, delay);
  }

  let bgMusic = null;

  function initMusic() {
    bgMusic = document.getElementById('bgMusic');
    if (!bgMusic) return;
    bgMusic.volume = 0.5;

    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isMusicPlaying = true;
        updateMusicUI(true);
      }).catch(() => {
        const startOnInteraction = () => {
          bgMusic.play().then(() => {
            isMusicPlaying = true;
            updateMusicUI(true);
          }).catch(() => {});
          document.removeEventListener('click', startOnInteraction);
          document.removeEventListener('keydown', startOnInteraction);
          document.removeEventListener('touchstart', startOnInteraction);
        };
        document.addEventListener('click', startOnInteraction);
        document.addEventListener('keydown', startOnInteraction);
        document.addEventListener('touchstart', startOnInteraction);
      });
    }
  }

  function updateMusicUI(playing) {
    document.getElementById('musicIcon').textContent = playing ? '⏸' : '♪';
    document.getElementById('musicToggle').classList.toggle('active', playing);
  }

  function toggleMusic() {
    if (!bgMusic) return;
    if (isMusicPlaying) {
      bgMusic.pause();
      isMusicPlaying = false;
      updateMusicUI(false);
    } else {
      bgMusic.play().then(() => {
        isMusicPlaying = true;
        updateMusicUI(true);
      }).catch(() => {});
    }
  }

  function createStars(count) {
    const container = document.getElementById('stars');
    if (!container) return;
    const colors = ['', 'color-pink', 'color-purple', 'color-yellow', 'color-cyan', 'color-green'];
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star ' + colors[Math.floor(Math.random() * colors.length)];
      star.style.left = Math.random() * 100 + 'vw';
      star.style.top = Math.random() * 70 + 'vh';
      const size = Math.random() * 2 + 1;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      star.style.animationDelay = (Math.random() * 2) + 's';
      star.style.animationDuration = (1.5 + Math.random() * 2) + 's';
      container.appendChild(star);
    }
  }

  function createButterflies(count) {
    const container = document.getElementById('butterflies');
    if (!container) return;
    const palettes = [
      ['#ff8ac0', '#b56bff'],
      ['#6bf0ff', '#6bff7a'],
      ['#fff95b', '#ffb86c'],
      ['#ff61a6', '#fff95b'],
      ['#b56bff', '#6bf0ff'],
      ['#ffd54f', '#ff8ac0']
    ];
    for (let i = 0; i < count; i++) {
      const bf = document.createElement('div');
      bf.className = 'butterfly';
      const p = palettes[i % palettes.length];
      bf.style.setProperty('--bf-c1', p[0]);
      bf.style.setProperty('--bf-c2', p[1]);
      bf.style.animationDuration = (10 + Math.random() * 10) + 's';
      bf.style.animationDelay = (Math.random() * 5) + 's';
      bf.style.top = (Math.random() * 60) + 'vh';
      container.appendChild(bf);
    }
  }

  function typeWriter(text, element, speed) {
    if (!element) return;
    let i = 0;
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    element.appendChild(cursor);

    function type() {
      if (i < text.length) {
        element.insertBefore(document.createTextNode(text.charAt(i)), cursor);
        i++;
        setTimeout(type, speed);
      } else {
        setTimeout(() => cursor.remove(), 3000);
      }
    }
    type();
  }

  function createFireworks(x, y) {
    const colors = ['#ff61a6', '#ffb86c', '#fff95b', '#6bff7a', '#6bf0ff', '#b56bff', '#ff8ac0'];
    const count = 12;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      p.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 8px;
        height: 8px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 0 10px ${color}, 0 0 20px ${color};
      `;
      const angle = (Math.PI * 2 * i) / count;
      const dist = 80 + Math.random() * 100;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;
      p.animate([
        { transform: 'translate(0,0) scale(1)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.2)`, opacity: 0 }
      ], { duration: 900 + Math.random() * 400, easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)' });
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1400);
    }
  }
