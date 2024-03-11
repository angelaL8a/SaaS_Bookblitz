import Faq from "./components/faq";
import Features from "./components/features";
import Footer from "./components/footer";
import Header from "./components/header";
import Hero from "./components/hero";
import Testimonials from "./components/testimonials";
import Videos from "./components/videos";

const App = () => {
  return (
    <div className="min-h-screen page_bg">
      {/* Header */}
      <Header />

      <div className="max-w-[1000px] mx-auto px-2">
        {/* Hero */}
        <Hero />

        {/* Features */}
        <Features />

        {/* Testimonials */}
      </div>

      <Testimonials />

      <div className="max-w-[1000px] mx-auto px-2 pb-20">
        <Videos />

        <Faq />
      </div>

      <Footer />
    </div>
  );
};

export default App;
