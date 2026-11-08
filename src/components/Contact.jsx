import { useState } from 'react';
import { ArrowUpRight, Download, Github, Instagram, Linkedin, Mail, MapPin, Send } from 'lucide-react';
import { TelegramIcon } from '../assets/icon';

const API_BASE_URL = 'https://my-app.ismoil281279.workers.dev';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('Sending your message…');
    try {
      const response = await fetch(`${API_BASE_URL}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error(`Messages API returned ${response.status}`);
      setStatus('Message sent. Thanks for reaching out!');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send message:', error);
      setStatus('Could not send your message. Please try again later.');
    }
  };

  return (
    <section id="contact" className="section-shell contact-section">
      <div className="section-heading">
        <span className="section-number">04 — GET IN TOUCH</span>
        <h2>Have a project in <span>mind?</span></h2>
        <p>Have an idea, a question, or just want to say hello? My inbox is open.</p>
      </div>

      <div className="contact-layout">
        <div className="contact-aside">
          <div className="contact-note">
            <span className="availability-dot" />
            <span>Let’s create something meaningful.</span>
          </div>
          <h3>Let’s turn your<br /><span>idea into reality.</span></h3>
          <a className="contact-email" href="mailto:ismoil281279@gmail.com">ismoil281279@gmail.com <ArrowUpRight size={18} /></a>
          <div className="contact-details">
            <div><MapPin size={17} /><span>Tashkent, Uzbekistan</span></div>
            <div><Mail size={17} /><a href="mailto:ismoil281279@gmail.com">Send me an email</a></div>
          </div>
          <div className="social-links">
            <a href="https://github.com/neg1mv" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
            <a href="https://www.instagram.com/ibragimov.neg" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a>
            <a href="https://t.me/ibragimov.neg" target="_blank" rel="noreferrer" aria-label="Telegram"><TelegramIcon /></a>
            <a href="https://www.linkedin.com/in/ismoil-ibragimov79" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
          </div>
          <a className="resume-link" href="/files/Ibrgimov%20Ismoil.pdf" download="Ibragimov Ismoil.pdf"><Download size={16} /> Download resume</a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-heading"><span>01 / 02</span><h3>Send a message</h3></div>
          <label>Your name<input name="name" value={form.name} minLength={2} maxLength={80} onChange={handleChange} required placeholder="John Doe" autoComplete="name" /></label>
          <label>Email address<input name="email" type="email" value={form.email} maxLength={160} onChange={handleChange} required placeholder="john@example.com" autoComplete="email" /></label>
          <label>Your message<textarea name="message" value={form.message} minLength={10} maxLength={2000} onChange={handleChange} required placeholder="Tell me a little about your project…" rows="5" /></label>
          <button className="button-primary form-submit" type="submit" disabled={status.startsWith('Sending')}>
            {status.startsWith('Sending') ? 'Sending…' : 'Send message'} <Send size={16} />
          </button>
          {status && <p className={`form-status ${status.startsWith('Could') ? 'is-error' : ''}`} role="status">{status}</p>}
        </form>
      </div>
    </section>
  );
}
