import { ArrowUpRight, Code2, Layers3, MonitorSmartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n.jsx';

export default function About() {
  const { t } = useLanguage();
  const highlights = [Code2, Layers3, MonitorSmartphone].map((icon, index) => ({ icon, title: t.about.highlights[index][0], text: t.about.highlights[index][1] }));
  return (
    <section id="about" className="section-shell about-section">
      <div className="about-layout">
        <motion.div className="section-heading about-heading" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-number">{t.about.label}</span>
          <h2>{t.about.titleA}<br /><span>{t.about.titleB}</span></h2>
        </motion.div>
        <div className="about-copy">
          <p className="about-lead">{t.about.lead}</p>
          <p className="about-description">{t.about.description}</p>
          <a className="about-link" href="#projects">{t.about.explore} <ArrowUpRight size={16} /></a>
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
