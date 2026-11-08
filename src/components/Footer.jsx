import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <a className="footer-brand" href="#home">ISMOIL<span>.</span></a>
        <p>Designed & built with care.</p>
        <a href="#home">Back to top <ArrowUpRight size={15} /></a>
        <span className="copyright">© {new Date().getFullYear()} Ismoil Ibragimov</span>
      </div>
    </footer>
  );
}
