import "../css/midsection.css";
import Logo from "../assets/logo.webp";

const MidSection = () => {
  return (
    <section className="mid-section-container">
      <h1>
        <img src={Logo} alt="Grand Theft Auto VI" />
      </h1>
      <p className="eyebrow">Coming 19 November 2026</p>
    </section>
  );
};

export default MidSection;
