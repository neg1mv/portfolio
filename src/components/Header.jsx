import { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { toggleTheme } from '../cods/theme.js';

const links = [
  ['Home', 'home'],
  ['Stack', 'skills'],
  ['About', 'about'],
  ['Projects', 'projects'],
  ['Contact', 'contact'],
];

export default function Header() {
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

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
      <nav className="nav-shell" aria-label="Main navigation">
        <button className="brand-mark" onClick={() => navigate('home')} aria-label="Go to top">
          <span className="brand-symbol">I.</span>
          <span>ISMOIL<span className="brand-muted">.DEV</span></span>
        </button>

        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          {links.map(([label, id]) => (
            <button key={id} onClick={() => navigate(id)}>{label}</button>
          ))}
        </div>

        <div className="nav-actions">
          <button
            className="icon-button theme-toggle-btn"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            onClick={toggleTheme}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a className="nav-cta" href="#contact" onClick={(event) => { event.preventDefault(); navigate('contact'); }}>
            Let’s talk <span>↗</span>
          </a>
          <button className="icon-button menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
