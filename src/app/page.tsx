import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Credits from '@/components/Credits';
import Clips from '@/components/Clips';
import Photos from '@/components/Photos';
import Testimonial from '@/components/Testimonial';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Credits />
        <Clips />
        <Photos />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
