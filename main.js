const YOUTUBE_VIDEO_ID = '1lZB1IBaXxU';

const MESSAGES = {
  en: "I love you, Mom. You are the most beautiful flower in my life. Happy Mother's Day! 💐",
  vi: "Con yêu mẹ. Mẹ là đóa hoa đẹp nhất trong cuộc đời con. Chúc mừng Ngày của Mẹ! 💐"
};

let currentLang = 'en';
let ytPlayer = null;
let isMusicPlaying = false;

onload = () => {
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 1000);

    createStars(40);
    createButterflies(3);

    setTimeout(() => startTypewriter(), 2000);

    document.getElementById('langToggle').addEventListener('click', toggleLanguage);
    document.getElementById('musicToggle').addEventListener('click', toggleMusic);

    loadYouTubeAPI();

    document.addEventListener('click', (e) => {
      if (e.target.closest('.control-btn')) return;
      createFireworks(e.clientX, e.clientY);
    });
  };

  function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'vi' : 'en';
    document.getElementById('langLabel').textContent = currentLang === 'en' ? 'VI' : 'EN';

    document.querySelectorAll('[data-en][data-vi]').forEach(el => {
      el.textContent = el.getAttribute('data-' + currentLang);
    });

    const tw = document.getElementById('typewriter');
    tw.innerHTML = '';
    startTypewriter(0);
  }

  function startTypewriter(delay = 0) {
    setTimeout(() => {
      typeWriter(MESSAGES[currentLang], document.getElementById('typewriter'), 50);
    }, delay);
  }

  function loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  }

  let ytReady = false;
  let pendingPlay = false;

  window.onYouTubeIframeAPIReady = function() {
    ytPlayer = new YT.Player('ytPlayer', {
      width: '200',
      height: '200',
      videoId: YOUTUBE_VIDEO_ID,
      playerVars: {
        autoplay: 1,
        mute: 1,
        loop: 1,
        playlist: YOUTUBE_VIDEO_ID,
        controls: 0,
        playsinline: 1
      },
      events: {
        onReady: () => {
          ytReady = true;
          ytPlayer.playVideo();
          document.getElementById('musicIcon').textContent = '⏸';
          document.getElementById('musicToggle').classList.add('active');
          isMusicPlaying = true;

          const unmuteOnFirstInteraction = () => {
            if (ytPlayer && isMusicPlaying) {
              ytPlayer.unMute();
              ytPlayer.setVolume(50);
            }
            document.removeEventListener('click', unmuteOnFirstInteraction);
            document.removeEventListener('keydown', unmuteOnFirstInteraction);
            document.removeEventListener('touchstart', unmuteOnFirstInteraction);
          };
          document.addEventListener('click', unmuteOnFirstInteraction);
          document.addEventListener('keydown', unmuteOnFirstInteraction);
          document.addEventListener('touchstart', unmuteOnFirstInteraction);
        },
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.ENDED) ytPlayer.playVideo();
        },
        onError: () => {}
      }
    });
  };

  function playMusic() {
    try {
      ytPlayer.unMute();
      ytPlayer.setVolume(50);
      ytPlayer.playVideo();
      document.getElementById('musicIcon').textContent = '⏸';
      document.getElementById('musicToggle').classList.add('active');
      isMusicPlaying = true;
    } catch (err) {}
  }

  function toggleMusic() {
    if (!ytReady) {
      pendingPlay = true;
      return;
    }
    if (isMusicPlaying) {
      ytPlayer.pauseVideo();
      document.getElementById('musicIcon').textContent = '♪';
      document.getElementById('musicToggle').classList.remove('active');
      isMusicPlaying = false;
    } else {
      playMusic();
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
