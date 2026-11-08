import {
  CSSIcon, FIGMAIcon, GitBashIcon, GitHubIcon, HTMLIcon, JSIcon,
  NextJSIcon, NodeJSIcon, NPMIcon, ReactIcon, SASSIcon, ShadcnUiIcon,
  TailwindCSSIcon, TSIcon, VercelIcon, VScode,
} from '../assets/icon';

const technologies = [
  ['HTML', HTMLIcon], ['CSS', CSSIcon], ['JavaScript', JSIcon], ['Git', GitBashIcon],
  ['Tailwind', TailwindCSSIcon], ['React', ReactIcon], ['Next.js', NextJSIcon],
  ['GitHub', GitHubIcon], ['shadcn/ui', ShadcnUiIcon], ['VS Code', VScode],
  ['Node.js', NodeJSIcon], ['npm', NPMIcon], ['Sass', SASSIcon], ['Vercel', VercelIcon],
  ['Figma', FIGMAIcon], ['TypeScript', TSIcon],
];

export default function Tech() {
  return (
    <section id="skills" className="section-shell skills-section">
      <div className="section-heading">
        <span className="section-number">01 — TOOLKIT</span>
        <h2>Tools of the <span>trade.</span></h2>
        <p>A selection of technologies I use to bring ideas to life.</p>
      </div>
      <div className="tech-grid">
        {technologies.map(([name, Icon]) => (
          <div className="tech-card" key={name}>
            <span className="tech-icon"><Icon /></span>
            <span>{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
