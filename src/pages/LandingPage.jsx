import Header from "../components/Header";
import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import Roadmap from "../components/Roadmap";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
      <Header />
      <Hero />
      <Benefits />
      <Roadmap />
      <Pricing />
      <Footer />
    </div>
  );
};

export default LandingPage;
