import { NavLink } from "react-router-dom";
import { useState } from "react";
import { logo } from "../assets/images";

const linkBase =
  "rounded-full px-3 py-2 text-sm sm:text-base transition text-white/80 hover:text-white hover:bg-white/10";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="header">
      <div className="w-full rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,.35)]">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          <NavLink to="/" className="flex items-center gap-3" onClick={closeMenu}>
            <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
            <span className="hidden sm:block font-poppins font-semibold tracking-wide text-white">
              Portfolio
            </span>
          </NavLink>

          {/* desktop nav */}
          <nav className="hidden md:flex items-center gap-2 sm:gap-3 font-medium">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${linkBase} ${
                  isActive
                    ? "text-amber-300 bg-white/10 border border-white/10"
                    : ""
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `${linkBase} ${
                  isActive
                    ? "text-sky-200 bg-white/10 border border-white/10"
                    : ""
                }`
              }
            >
              Projects
            </NavLink>

            <NavLink
              to="/certificates"
              className={({ isActive }) =>
                `${linkBase} ${
                  isActive
                    ? "text-emerald-300 bg-white/10 border border-white/10"
                    : ""
                }`
              }
            >
              Certificates
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${linkBase} ${
                  isActive
                    ? "text-rose-300 bg-white/10 border border-white/10"
                    : ""
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* mobile menu button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-white"
            aria-label="Toggle menu"
          >
            <span className="text-lg">{isOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        {/* mobile nav */}
        {isOpen && (
          <nav className="md:hidden px-4 pb-4 pt-1">
            <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-black/10 p-2">
              <NavLink
                to="/about"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? "text-amber-300 bg-white/10" : ""}`
                }
              >
                About
              </NavLink>

              <NavLink
                to="/projects"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? "text-sky-200 bg-white/10" : ""}`
                }
              >
                Projects
              </NavLink>

              <NavLink
                to="/certificates"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? "text-emerald-300 bg-white/10" : ""}`
                }
              >
                Certificates
              </NavLink>

              <NavLink
                to="/contact"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? "text-rose-300 bg-white/10" : ""}`
                }
              >
                Contact
              </NavLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;