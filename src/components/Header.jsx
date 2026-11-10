import { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { toggleTheme } from '../cods/theme.js';
import { useLanguage } from '../i18n.jsx';

export default function Header() {
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const links = [[t.nav.home, 'home'], [t.nav.tech, 'skills'], [t.nav.about, 'about'], [t.nav.projects, 'projects'], [t.nav.contact, 'contact']];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const html = document.documentElement;
    const sync = () => setIsDark(html.classList.contains('dark'));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(html, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const navigate = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label={t.nav.home}>
        <button className="brand-mark" onClick={() => navigate('home')} aria-label={t.nav.top}>
          <span className="brand-symbol">I.</span>
          <span>ISMOIL<span className="brand-muted">.DEV</span></span>
        </button>

        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          {links.map(([label, id]) => (
            <button key={id} onClick={() => navigate(id)}>{label}</button>
          ))}
        </div>

        <div className="nav-actions">
          <div className="language-switch" role="group" aria-label={t.nav.language}>
            {['en', 'ru', 'uz'].map((code) => <button type="button" key={code} lang={code} aria-pressed={language === code} className={language === code ? 'is-active' : ''} onClick={() => setLanguage(code)}>{code.toUpperCase()}</button>)}
          </div>
          <button
            className="icon-button theme-toggle-btn"
            aria-label={isDark ? t.nav.light : t.nav.dark}
            onClick={toggleTheme}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a className="nav-cta" href="#contact" onClick={(event) => { event.preventDefault(); navigate('contact'); }}>
            {t.nav.talk} <span>↗</span>
          </a>
          <button className="icon-button menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={t.nav.menu}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
