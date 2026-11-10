import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, ExternalLink, Layers3, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { localizedText, useLanguage } from '../i18n.jsx';

const API_BASE_URL = 'https://my-app.ismoil281279.workers.dev';
const resolveMediaUrl = (url) => !url ? '' : url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

export default function Projects() {
  const { language, t } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeFilter, setActiveFilter] = useState('__all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/projects`, { signal: controller.signal });
        if (!response.ok) throw new Error(`Projects API returned ${response.status}`);
        const data = await response.json();
        const items = Array.isArray(data) ? data : Array.isArray(data.docs) ? data.docs : Array.isArray(data.items) ? data.items : Array.isArray(data.projects) ? data.projects : [];
        setProjects(items);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Failed to load projects:', err);
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    fetchProjects();
    return () => controller.abort();
  }, []);

  const filters = useMemo(() => ['All', ...new Set(projects.flatMap((project) => project.technologies || []).filter(Boolean))], [projects]);
  const filteredProjects = useMemo(() => activeFilter === '__all' ? projects : projects.filter((project) => project.technologies?.includes(activeFilter)), [projects, activeFilter]);

  useEffect(() => {
    if (!selectedProject) return undefined;
    const onKeyDown = (event) => { if (event.key === 'Escape') setSelectedProject(null); };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const scrollCarousel = (direction) => {
    const element = carouselRef.current;
    if (!element) return;
    const card = element.querySelector('.project-card');
    const distance = card ? card.getBoundingClientRect().width + 20 : element.clientWidth * 0.8;
    element.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };

  const handleCarouselScroll = () => {
    const element = carouselRef.current;
    if (!element) return;
    const card = element.querySelector('.project-card');
    if (card) setActiveSlide(Math.round(element.scrollLeft / (card.getBoundingClientRect().width + 20)));
  };

  return (
    <section id="projects" className="section-shell projects-section">
      <div className="projects-heading-row">
        <div className="section-heading">
          <span className="section-number">{t.projects.label}</span>
          <h2>{t.projects.titleA} <span>{t.projects.titleB}</span></h2>
          <p>{t.projects.description}</p>
        </div>
        <span className="project-count">{String(projects.length).padStart(2, '0')} {t.projects.count}</span>
      </div>

      {!loading && projects.length > 0 && (
        <div className="project-toolbar">
          <div className="project-filters" aria-label={t.projects.filters}>
            {[['__all', t.projects.all], ...filters.filter((filter) => filter !== 'All').map((filter) => [filter, filter])].map(([filter, label]) => (
              <button key={filter} type="button" className={`filter-chip ${activeFilter === filter ? 'is-active' : ''}`} onClick={() => { setActiveFilter(filter); setActiveSlide(0); if (carouselRef.current) carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' }); }}>
                {label}
              </button>
            ))}
          </div>
          <div className="carousel-controls">
            <span className="carousel-position">{String(Math.min(activeSlide + 1, filteredProjects.length || 1)).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}</span>
            <button type="button" className="carousel-arrow" onClick={() => scrollCarousel(-1)} aria-label={t.projects.previous}><ArrowLeft size={17} /></button>
            <button type="button" className="carousel-arrow" onClick={() => scrollCarousel(1)} aria-label={t.projects.next}><ArrowRight size={17} /></button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="project-carousel loading-carousel">{[1, 2].map((item) => <div className="project-skeleton" key={item} />)}</div>
      ) : filteredProjects.length ? (
        <div className="project-carousel" ref={carouselRef} onScroll={handleCarouselScroll}>
          {filteredProjects.map((project, index) => {
            const title = localizedText(project.title, language) || localizedText(project.name, language) || t.projects.more;
            const description = localizedText(project.description, language);
            const imageUrl = resolveMediaUrl(project.mainPhoto?.url);
            return (
              <motion.article className="project-card" key={project.id || project.slug || title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.18) }}>
                <button type="button" className="project-image-button" onClick={() => setSelectedProject(project)} aria-label={`${t.projects.view}: ${title}`}>
                  <div className="project-image-wrap">
                    {imageUrl ? <img src={imageUrl} alt={localizedText(project.mainPhoto?.alt, language) || title} loading="lazy" /> : <div className="project-image-placeholder"><Layers3 size={34} /></div>}
                    <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="project-view-label">{t.projects.view} <ArrowUpRight size={13} /></span>
                    <div className="project-image-overlay" />
                  </div>
                </button>
                <div className="project-card-content">
                  <div className="project-title-row">
                    <h3>{title}</h3>
                    {project.liveUrl && <a className="project-open" href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${t.projects.live}: ${title}`}><ArrowUpRight size={19} /></a>}
                  </div>
                  <p>{description}</p>
                  {project.technologies?.length > 0 && <div className="project-tags">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>}
                  <div className="project-links">
                    <button type="button" onClick={() => setSelectedProject(project)}>{t.projects.details} <ArrowUpRight size={14} /></button>
                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"><Github size={14} /> {t.projects.source}</a>}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      ) : (
        <div className="projects-empty"><Layers3 size={28} /><h3>{error ? t.projects.unavailable : t.projects.empty}</h3><p>{error ? t.projects.retry : t.projects.filterHint}</p></div>
      )}

      <AnimatePresence>
        {selectedProject && (
          <motion.div className="project-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProject(null); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" initial={{ opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: .98 }} transition={{ duration: .22 }}>
              {(() => { const title = localizedText(selectedProject.title, language) || localizedText(selectedProject.name, language) || t.projects.more; return <>
              <button type="button" className="project-modal-close" onClick={() => setSelectedProject(null)} aria-label={t.projects.close}><X size={19} /></button>
              {selectedProject.mainPhoto?.url && <img className="project-modal-image" src={resolveMediaUrl(selectedProject.mainPhoto.url)} alt={localizedText(selectedProject.mainPhoto?.alt, language) || title} />}
              <div className="project-modal-content">
                <span className="section-number">{t.projects.overview}</span>
                <h2 id="project-modal-title">{title}</h2>
                <p>{localizedText(selectedProject.description, language) || t.projects.more}</p>
                {selectedProject.technologies?.length > 0 && <div className="project-tags">{selectedProject.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>}
                <div className="project-modal-actions">
                  {selectedProject.liveUrl && <a className="button-primary" href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">{t.projects.live} <ExternalLink size={15} /></a>}
                  {selectedProject.githubUrl && <a className="button-secondary" href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer"><Github size={15} /> {t.projects.source}</a>}
                </div>
              </div>
              </>; })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
