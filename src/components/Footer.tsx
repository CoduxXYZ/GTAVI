import "../css/footer.css";
import ps5Icon from "../assets/ps5icon.png";
import xboxIcon from "../assets/xboxicon.png";

const Footer = () => {
  return (
    <footer className="footer-container">
      <p className="wishlist-text">Pre-order now</p>
      <div className="footer-button-wrapper">
        <a
          href="https://www.playstation.com/pl-pl/games/grand-theft-auto-vi/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pre-order on PlayStation 5"
        >
          <img src={ps5Icon} alt="PlayStation 5" />
        </a>
        <a
          href="https://www.xbox.com/en-US/games/store/grand-theft-auto-vi/9nl3wwnzlzzn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pre-order on Xbox Series X|S"
        >
          <img src={xboxIcon} alt="Xbox" />
        </a>
      </div>
      <p className="disclaimer">
        Fan-made and independently operated. Not affiliated with Rockstar Games
        or Take-Two Interactive. <a href="#disclaimer">Read the full disclaimer</a>.
      </p>
    </footer>
  );
};

export default Footer;
