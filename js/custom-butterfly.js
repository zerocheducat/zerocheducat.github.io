/* ===== Banner 轮播 & 标题特效 for Hexo Butterfly ===== */
/* === 仅修改这里的配置 === */
const BannerRotatorConfig = {
  images: [
    // 把你的轮播图放到 source/img 下，路径以 /img/ 开头（Hexo 会复制到 /img）
    '/img/top-1.png',
    '/img/top-2.png',
    '/img/top-3.png',
    '/img/top-4.png',
    '/img/top-5.png',
    '/img/top-6.png',
    '/img/top-7.png',
    '/img/top-8.png',
    '/img/top-9.png',
    '/img/top-10.png',
  ],
  interval: 6000,            // 切换间隔（ms）
  randomStart: true,         // 随机起始图
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundAttachment: 'scroll', // 'fixed' 可做轻度视差（移动端可能无效）
  homeOnly: true             // 仅在首页启用
};

const TitleFXConfig = {
  enableTypingSubtitle: true,   // 开启动态打字副标题
  // 轮播句子（会循环播放）
  subtitlePhrases: [
    '欢迎来到我的神奇妙妙屋 Ciallo~(∠・ω< )⌒☆',
    '努力做出世界上最好的赛博兽耳娘'
  ],
  typeSpeed: 90,     // 打字速度（ms/字符）
  backSpeed: 45,     // 回退速度
  pauseBetween: 1800 // 完成一句后的停顿
};
/* === 配置结束 === */

// ------- 工具与守卫 -------
const __BFX__ = window.__BFX__ || (window.__BFX__ = {});
function once(key, fn) {
  if (__BFX__[key]) return;
  __BFX__[key] = true;
  try { fn(); } catch (e) { console.error(e); }
}
function isHomePage() {
  return /(^\/$)|(^\/index\.html$)/.test(location.pathname);
}
function ready(cb){
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cb, { once: true });
  } else cb();
}

// ------- Banner 轮播 -------
function setupBannerRotation() {
  if (!BannerRotatorConfig.images?.length) return;
  if (BannerRotatorConfig.homeOnly && !isHomePage()) return;

  const header = document.querySelector('#page-header');
  if (!header) return;

  // 若用户禁用了顶图，则不做轮播（与你当前配置一致：disable_top_img: false）
  // 这里保守：若没有背景容器也直接返回
  let idx = BannerRotatorConfig.randomStart
    ? Math.floor(Math.random() * BannerRotatorConfig.images.length)
    : 0;

  // 预加载
  BannerRotatorConfig.images.forEach(src => { const i = new Image(); i.src = src; });

  const applyBg = (src, fade = true) => {
    if (fade) header.classList.add('header-fade');
    setTimeout(() => {
      header.style.backgroundImage = `url("${src}")`;
      header.style.backgroundSize = BannerRotatorConfig.backgroundSize;
      header.style.backgroundPosition = BannerRotatorConfig.backgroundPosition;
      header.style.backgroundAttachment = BannerRotatorConfig.backgroundAttachment;
      setTimeout(() => header.classList.remove('header-fade'), 50);
    }, 180);
  };

  applyBg(BannerRotatorConfig.images[idx], false);

  // 防重复 interval（PJAX 切页再回来）
  if (__BFX__.bannerTimer) clearInterval(__BFX__.bannerTimer);
  __BFX__.bannerTimer = setInterval(() => {
    idx = (idx + 1) % BannerRotatorConfig.images.length;
    applyBg(BannerRotatorConfig.images[idx], true);
  }, Math.max(2200, BannerRotatorConfig.interval));
}

// ------- 动态打字副标题 -------
function setupTypingSubtitle() {
  if (!TitleFXConfig.enableTypingSubtitle) return;

  const header = document.querySelector('#page-header');
  if (!header) return;

  // 若主题已有 #subtitle / .site-subtitle，复用其位置；否则在标题后创建
  let subtitleEl =
    document.querySelector('#subtitle') ||
    document.querySelector('.site-subtitle');

  if (!subtitleEl) {
    const titleEl = document.querySelector('#site-name, .site-title');
    if (!titleEl) return;
    subtitleEl = document.createElement('div');
    subtitleEl.className = 'typed-subtitle';
    subtitleEl.style.marginTop = '6px';
    subtitleEl.style.fontSize = '0.95rem';
    subtitleEl.style.minHeight = '1.6em';
    titleEl.parentNode.insertBefore(subtitleEl, titleEl.nextSibling);
  } else {
    subtitleEl.textContent = '';
    subtitleEl.classList.add('typed-subtitle');
  }

  const phrases = (TitleFXConfig.subtitlePhrases || []).slice();
  if (!phrases.length) return;

  // 光标
  const cursor = document.createElement('span');
  cursor.className = 'typed-cursor';
  cursor.textContent = '|';
  subtitleEl.appendChild(cursor);

  // 文本节点插到光标前
  const textNode = document.createTextNode('');
  subtitleEl.insertBefore(textNode, cursor);

  let phraseIndex = 0, charIndex = 0, typing = true;

  function tick() {
    const current = phrases[phraseIndex];
    textNode.nodeValue = current.slice(0, charIndex);

    if (typing) {
      if (charIndex < current.length) {
        charIndex++;
        setTimeout(tick, TitleFXConfig.typeSpeed);
      } else {
        typing = false;
        setTimeout(tick, TitleFXConfig.pauseBetween);
      }
    } else {
      if (charIndex > 0) {
        charIndex--;
        setTimeout(tick, TitleFXConfig.backSpeed);
      } else {
        typing = true;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, 350);
      }
    }
  }
  tick();
}

// ------- 初始化（含 PJAX 兼容） -------
function boot() {
  once('butterfly_fx_boot', () => {
    setupBannerRotation();
    setupTypingSubtitle();
  });
}

ready(boot);
// PJAX 切换完重新激活
document.addEventListener('pjax:complete', () => {
  // 重置一次性开关，让当前页能重新初始化
  __BFX__.butterfly_fx_boot = false;
  boot();
});
