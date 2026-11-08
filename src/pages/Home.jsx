import Header from '../components/Header';
import Hero from '../components/Hero';
import Tech from '../components/Tech';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Tech />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
