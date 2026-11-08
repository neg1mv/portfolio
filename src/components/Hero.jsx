import { ArrowDown, ArrowUpRight, Github, Linkedin, Send } from 'lucide-react';

export default function Hero() {
  const scrollToProjects = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="hero-section">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-content">
        <div className="eyebrow"><span className="availability-dot" /> AVAILABLE FOR NEW PROJECTS</div>
        <p className="hero-kicker">HELLO, I’M ISMOIL IBRAHIMOV</p>
        <h1>I build digital<br /><span>experiences</span> that<br className="mobile-break" /> matter<span className="accent-dot">.</span></h1>
        <p className="hero-description">
          Frontend developer focused on crafting clean, responsive and engaging web experiences.
          I turn ideas into thoughtful interfaces with modern technologies.
        </p>
        <div className="hero-actions">
          <button className="button-primary" onClick={scrollToProjects}>Explore my work <ArrowUpRight size={17} /></button>
          <a className="button-secondary" href="mailto:ismoil281279@gmail.com">Get in touch <Send size={15} /></a>
        </div>
        <div className="hero-bottom">
          <div className="hero-socials">
            <a href="https://github.com/neg1mv" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
            <a href="https://www.linkedin.com/in/ismoil-ibragimov79" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
          </div>
          <button className="scroll-hint" onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}>
            SCROLL TO DISCOVER <ArrowDown size={14} />
          </button>
        </div>
      </div>
      <div className="hero-index" aria-hidden="true">01 / 04</div>
    </section>
  );
}
