import HeroSection from "../../DefaultPage/component/HeroSection";
import ScrollToTop from "../../DefaultPage/component/ScrollToTop";
import ChallengesSection from "../../DefaultPage/component/ChallengesSection";
import Solutions from "../../DefaultPage/component/Solutions";
import FeatureSection from "../../DefaultPage/component/FeatureSection";
import ExportSection from "../../DefaultPage/component/ExportSection";
import TestimonialsSection from "../../DefaultPage/component/TestimonialsSection";
import Footer from "../../DefaultPage/component/Footer";
import WhatsAppButton from "../../DefaultPage/component/WhatsAppButton";
import Chatbot from "../../DefaultPage/component/ChatBot";
import { Link } from "react-router-dom";

const UserHome = () => {
  return (
    <div>
      <Link to="/user/converter" className="bg-blue-500 text-white px-4 py-2 rounded">Converter</Link>
      <HeroSection />
      <ScrollToTop />
      <ChallengesSection />
      <Solutions />
      <FeatureSection />
      <ExportSection />
      <TestimonialsSection />
      <WhatsAppButton />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default UserHome;
