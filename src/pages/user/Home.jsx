import HeroSection from "../../DefaultPage/component/HeroSection";
import ScrollToTop from "../../DefaultPage/component/ScrollToTop";
import ChallengesSection from "../../DefaultPage/component/ChallengesSection";
import Solutions from "../../DefaultPage/component/Solutions";
import FeatureSection from "../../DefaultPage/component/FeatureSection";
import ExportSection from "../../DefaultPage/component/ExportSection";
import TestimonialsSection from "../../DefaultPage/component/TestimonialsSection";

const UserHome = () => {
  return (
    <div className=" mt-[-60px]" >
      <HeroSection />
      <ScrollToTop />
      <ChallengesSection />
      <Solutions />

      <FeatureSection />
      <ExportSection />
      <TestimonialsSection />
    </div>
  );
};

export default UserHome;
