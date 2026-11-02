import "../css/navbar.css";
import { trailerData } from "../data/trailer";
import { communityData } from "../data/community";

const NavBar = ({ menuNavBar }: { menuNavBar: boolean }) => {
  return (
    <nav
      style={{
        animation: menuNavBar
          ? "slideIn 0.3s forwards"
          : "slideOut 0.3s forwards",
      }}
      className="navBar-container"
      aria-label="Trailers"
    >
      <h2 className="navbar-title">Trailers</h2>
      <div className="trailers-wrapper">
        {[...trailerData].reverse().map((trailer) => (
          <a
            key={trailer.id}
            href={trailer.link}
            target="_blank"
            rel="noopener noreferrer"
            className="trailer-box"
          >
            <img src={trailer.img} alt={`${trailer.name} thumbnail`} />
            <div className="trailer-text-box">
              <h3>{trailer.name}</h3>
              <p>{trailer.release_date}</p>
            </div>
          </a>
        ))}
      </div>

      <h2 className="navbar-title navbar-title-spaced">Community</h2>
      <div className="community-wrapper">
        {communityData.map((c) => (
          <a
            key={c.id}
            href={c.link}
            target="_blank"
            rel="noopener noreferrer"
            className="community-box"
          >
            <span className={c.official ? "community-tag official" : "community-tag"}>
              {c.official ? "Official" : "Unofficial"}
            </span>
            <h3>{c.name}</h3>
            <p>{c.description}</p>
            <span className="community-join">Join on Discord →</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
