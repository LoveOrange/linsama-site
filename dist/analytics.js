(() => {
// Called only by a selected Web/itch release. Domestic builds do not load Google.
function installGoogleAnalytics(browser, doc, config) {
  const query = new URLSearchParams(browser.location.search);
  if (!/^https?:$/.test(browser.location.protocol)
    || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(browser.location.hostname)
    || ['noanalytics', 'bot', 'lab', 'acceptance'].some(key => query.has(key))) return;
  if (browser.__linsamaGaInstalled) return browser.__linsamaGaSink;
  browser.__linsamaGaInstalled = true;
  browser.dataLayer = browser.dataLayer || [];
  const gtag = browser.gtag = browser.gtag || function () { browser.dataLayer.push(arguments); };
  gtag('js', new Date());
  if (config.domains) gtag('set', 'linker', { domains: config.domains });
  gtag('config', config.id, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    site_section: config.section,
    distribution: config.distribution,
    game_id: config.gameId,
    app_version: config.version,
  });
  const script = doc.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + config.id;
  doc.head.appendChild(script);
  return browser.__linsamaGaSink = (name, params) => gtag('event', name, { ...params, send_to: config.id });
}

const track = installGoogleAnalytics(window, document, {
  id: 'G-9Y73ECF3MX', section: 'home', distribution: 'web',
  domains: ['linsama.com', 'linsama.me'],
});
document.addEventListener('click', event => {
  const link = event.target.closest?.('a[href]');
  if (!link || !track) return;
  const url = new URL(link.href);
  const project = link.closest('.project')?.id;
  if (project || url.hostname === 'linsama.me') track('project_click', {
    project_id: project || 'blog',
    destination: url.hostname === 'linsama.itch.io' ? 'itch' : url.hostname === 'linsama.me' ? 'blog' : 'web',
  });
});
})();
