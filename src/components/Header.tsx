import "../css/header.css";
import IconLogo from "../assets/logo-white.png";
import NavBar from "./NavBar";
import { useState, useEffect } from "react";

const Header = () => {
  const [menuNavBar, toggleMenuNavBar] = useState<boolean>(false);
  const [isNavBarRendered, setIsNavBarRendered] = useState<boolean>(false);

  useEffect(() => {
    if (menuNavBar) {
      setIsNavBarRendered(true);
    } else {
      // Wait for the slide-out animation before unmounting.
      const timer = setTimeout(() => setIsNavBarRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [menuNavBar]);

  useEffect(() => {
    if (!menuNavBar) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggleMenuNavBar(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuNavBar]);

  const toggleMenu = () => toggleMenuNavBar((prev) => !prev);

  return (
    <header className="header-container">
      <div className="logo-icon-wrapper">
        <img src={IconLogo} alt="" />
      </div>
      <div className="navbar-wrapper">
        <button
          type="button"
          className="menu-button"
          onClick={toggleMenu}
          aria-expanded={menuNavBar}
          aria-label={menuNavBar ? "Close trailers" : "Open trailers"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40"
            width="40"
            viewBox="0 -960 960 960"
            fill="currentColor"
            aria-hidden="true"
          >
            {menuNavBar ? (
              <path d="m300-258-42-42 180-180-180-179 42-42 180 180 179-180 42 42-180 179 180 180-42 42-179-180-180 180Z" />
            ) : (
              <path d="M160-280v-120h640v120H160Zm0-280v-120h640v120H160Z" />
            )}
          </svg>
        </button>
      </div>
      {isNavBarRendered ? <NavBar menuNavBar={menuNavBar} /> : null}
    </header>
  );
};

export default Header;
