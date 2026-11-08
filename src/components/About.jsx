import { ArrowUpRight, Code2, Layers3, MonitorSmartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const highlights = [
  { icon: Code2, title: 'Frontend development', text: 'Building responsive interfaces with modern web technologies.' },
  { icon: Layers3, title: 'Full-stack mindset', text: 'Connecting user experiences with APIs and content management.' },
  { icon: MonitorSmartphone, title: 'Responsive by design', text: 'Making websites feel natural on phones, tablets and desktops.' },
];

export default function About() {
  return (
    <section id="about" className="section-shell about-section">
      <div className="about-layout">
        <motion.div className="section-heading about-heading" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-number">02 — A LITTLE ABOUT ME</span>
          <h2>Curious mind.<br /><span>Builder’s mindset.</span></h2>
        </motion.div>
        <div className="about-copy">
          <p className="about-lead">I’m a frontend developer who enjoys turning ideas into clean, useful digital experiences.</p>
          <p className="about-description">I focus on thoughtful interfaces, responsive layouts and reliable integrations. I’m always learning, experimenting with new tools and improving the way I build for the web.</p>
          <a className="about-link" href="#projects">Explore my work <ArrowUpRight size={16} /></a>
        </div>
      </div>
      <div className="about-highlights">
        {highlights.map(({ icon: Icon, title, text }, index) => (
          <motion.article className="about-highlight" key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }}>
            <span className="about-icon"><Icon size={20} /></span>
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
