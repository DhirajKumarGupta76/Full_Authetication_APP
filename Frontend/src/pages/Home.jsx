// import Hero from "../components/home/Hero";
// import Stats from "../components/home/Stats";
// import Features from "../components/home/Features";
// import HowItWorks from "../components/home/HowItWorks";
// import Testimonials from "../components/home/Testimonials";
// import CTA from "../components/home/CTA";
// import Contact from "../components/home/Contact";
// import Footer from "../components/home/Footer";

import Hero from "../components/Home/Hero.jsx";
import Stats from "../components/Home/Stats.jsx";
import Features from "../components/Home/Features.jsx";
import HowItWorks from "../components/Home/HowItWorks.jsx";
import Testimonials from "../components/Home/Testimonials.jsx";
import CTA from "../components/Home/CTA.jsx";
import Contact from "../components/Home/Contact.jsx";
import Footer from "../components/Home/Footer.jsx";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">

      <Hero />

      <Stats />

      <section id="features">
        <Features />
      </section>

      <section id="how-it-works">
        <HowItWorks />
      </section>

      <Testimonials />

      <CTA />

      <Contact />

      <Footer />

    </div>
  );
};

export default Home;