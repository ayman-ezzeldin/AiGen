// App.js
import './root.css'
import './App.css';
import Navbar from './component/Navbar';
import HeroSection from './component/HeroSection';
import ScrollToTop from './component/ScrollToTop';
import ChallengesSection from './component/ChallengesSection';
import Solutions from './component/Solutions';
import FeatureSection from './component/FeatureSection';
import ExportSection from './component/ExportSection';
import TestimonialsSection from './component/TestimonialsSection';
import Footer from './component/Footer';


function Default() {
  return (
    <div className="App">

      <Navbar />
      <HeroSection />
      <ScrollToTop />
      <ChallengesSection />
      <Solutions />

      <FeatureSection />
      <ExportSection />
      <TestimonialsSection />
      <Footer />

    </div>
  );
}

export default Default;
