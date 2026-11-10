import { useState } from 'react';
import { ArrowUpRight, Download, Github, Instagram, Linkedin, Mail, MapPin, Send } from 'lucide-react';
import { TelegramIcon } from '../assets/icon';
import { useLanguage } from '../i18n.jsx';

const API_BASE_URL = 'https://my-app.ismoil281279.workers.dev';

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(t.contact.sending);
    try {
      const response = await fetch(`${API_BASE_URL}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error(`Messages API returned ${response.status}`);
      setStatus(t.contact.sent);
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send message:', error);
      setStatus(t.contact.failed);
    }
  };

  return (
    <section id="contact" className="section-shell contact-section">
      <div className="section-heading">
        <span className="section-number">{t.contact.label}</span>
        <h2>{t.contact.titleA} <span>{t.contact.titleB}</span></h2>
        <p>{t.contact.description}</p>
      </div>

      <div className="contact-layout">
        <div className="contact-aside">
          <div className="contact-note">
            <span className="availability-dot" />
            <span>{t.contact.note}</span>
          </div>
          <h3>{t.contact.turn}<br /><span>{t.contact.idea}</span></h3>
          <a className="contact-email" href="mailto:ismoil281279@gmail.com">ismoil281279@gmail.com <ArrowUpRight size={18} /></a>
          <div className="contact-details">
            <div><MapPin size={17} /><span>Tashkent, Uzbekistan</span></div>
            <div><Mail size={17} /><a href="mailto:ismoil281279@gmail.com">{t.contact.email}</a></div>
          </div>
          <div className="social-links">
            <a href="https://github.com/neg1mv" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
            <a href="https://www.instagram.com/ibragimov.neg" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a>
            <a href="https://t.me/ibragimov.neg" target="_blank" rel="noreferrer" aria-label="Telegram"><TelegramIcon /></a>
            <a href="https://www.linkedin.com/in/ismoil-ibragimov79" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
          </div>
          <a className="resume-link" href="/files/Ibrgimov%20Ismoil.pdf" download="Ibragimov Ismoil.pdf"><Download size={16} /> {t.contact.resume}</a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-heading"><span>01 / 02</span><h3>{t.contact.formTitle}</h3></div>
          <label>{t.contact.name}<input name="name" value={form.name} minLength={2} maxLength={80} onChange={handleChange} required placeholder={t.contact.namePlaceholder} autoComplete="name" /></label>
          <label>{t.contact.emailLabel}<input name="email" type="email" value={form.email} maxLength={160} onChange={handleChange} required placeholder={t.contact.emailPlaceholder} autoComplete="email" /></label>
          <label>{t.contact.message}<textarea name="message" value={form.message} minLength={10} maxLength={2000} onChange={handleChange} required placeholder={t.contact.messagePlaceholder} rows="5" /></label>
          <button className="button-primary form-submit" type="submit" disabled={status === t.contact.sending}>
            {status === t.contact.sending ? t.contact.sending : t.contact.send} <Send size={16} />
          </button>
          {status && <p className={`form-status ${status === t.contact.failed ? 'is-error' : ''}`} role="status">{status}</p>}
        </form>
      </div>
    </section>
  );
}
