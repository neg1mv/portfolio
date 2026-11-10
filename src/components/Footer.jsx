import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../i18n.jsx';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <a className="footer-brand" href="#home">ISMOIL<span>.</span></a>
        <p>{t.footer.made}</p>
        <a href="#home">{t.footer.top} <ArrowUpRight size={15} /></a>
        <span className="copyright">© {new Date().getFullYear()} Ismoil Ibragimov</span>
      </div>
    </footer>
  );
}
