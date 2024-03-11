import Features from "./components/features";
import Header from "./components/header";
import Hero from "./components/hero";

const App = () => {
  return (
    <div className="min-h-screen page_bg">
      {/* Header */}
      <Header />

      <div className="max-w-[1200px] mx-auto px-2">
        {/* Hero */}
        <Hero />

        {/* Features */}
        <Features />
      </div>
    </div>
  );
};

export default App;
