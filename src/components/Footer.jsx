import { Link } from "react-router-dom";
import { socialLinks } from "../constants";

const Footer = () => {
  return (
    <footer style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      background: "rgba(3, 7, 18, 0.75)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderTop: "1px solid rgba(255,255,255,0.08)",
    }}>
      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
      }}>
        <p style={{
          fontSize: 12,
          color: "rgba(255,255,255,0.45)",
          fontFamily: "'Work Sans', sans-serif",
          margin: 0,
        }}>
          © 2026 <strong style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Poppins', sans-serif" }}>Dinushka Malshan</strong>. All rights reserved.
        </p>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              to={link.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 32, height: 32, borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                transition: "background 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(125,211,252,0.12)";
                e.currentTarget.style.borderColor = "rgba(125,211,252,0.3)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <img
                src={link.iconUrl}
                alt={link.name}
                style={{ width: 16, height: 16, objectFit: "contain", opacity: 0.7 }}
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;