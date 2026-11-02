import "./css/app.css";
import BackgroundSlideshow from "./components/BackgroundSlideshow";
import Header from "./components/Header";
import CountdownSection from "./components/CountdownSection";
import MidSection from "./components/MidSection";
import Footer from "./components/Footer";
import Timeline from "./components/Timeline";
import Disclaimer from "./components/Disclaimer";

function App() {
  return (
    <>
      <BackgroundSlideshow />
      <div className="app">
        <Header />
        <main className="app-main">
          <MidSection />
          <CountdownSection />
        </main>
        <Footer />
      </div>
      <Timeline />
      <Disclaimer />
    </>
  );
}

export default App;
