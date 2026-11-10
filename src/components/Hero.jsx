import { ArrowDown, ArrowUpRight, Github, Linkedin, Send } from 'lucide-react';
import { useLanguage } from '../i18n.jsx';

export default function Hero() {
  const { t } = useLanguage();
  const scrollToProjects = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="hero-section">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-content">
        <div className="eyebrow"><span className="availability-dot" /> {t.hero.available}</div>
        <p className="hero-kicker">{t.hero.kicker}</p>
        <h1>{t.hero.leadA}<br /><span>{t.hero.leadB}</span> {t.hero.leadC}<br className="mobile-break" /> {t.hero.leadD}<span className="accent-dot">.</span></h1>
        <p className="hero-description">{t.hero.description}</p>
        <div className="hero-actions">
          <button className="button-primary" onClick={scrollToProjects}>{t.hero.explore} <ArrowUpRight size={17} /></button>
          <a className="button-secondary" href="mailto:ismoil281279@gmail.com">{t.hero.getInTouch} <Send size={15} /></a>
        </div>
        <div className="hero-bottom">
          <div className="hero-socials">
            <a href="https://github.com/neg1mv" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
            <a href="https://www.linkedin.com/in/ismoil-ibragimov79" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
          </div>
          <button className="scroll-hint" onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}>
            {t.hero.scroll} <ArrowDown size={14} />
          </button>
        </div>
      </div>
      <div className="hero-index" aria-hidden="true">01 / 04</div>
    </section>
  );
}
