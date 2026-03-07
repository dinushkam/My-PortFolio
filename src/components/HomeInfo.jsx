import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";

const HomeInfo = ({ currentStage }) => {
  const content = (() => {
    if (currentStage === 1)
    
  return (
    <div className="homeinfo-solid">
      <p className="homeinfo-title">Hi I'm Dinushka! 👋</p>
      <p className="homeinfo-text">
        <span className="font-semibold">Drag</span> (or swipe) to rotate the island
        <br />
        and explore my journey .
      </p>
      <p className="homeinfo-tip">Tip: Use ← → keys too</p>
    </div>
  );

    if (currentStage === 2)
      return (
        <div className="text-center">
          <p className="font-medium sm:text-xl text-[#0b1220]">
            I'm a passionate developer with a knack for crafting elegant solutions. <br /> Curious about my story?
          </p>

          <Link to="/about" className="homeinfo-solid-btn">
            Learn more
            <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
          </Link>
        </div>
      );

    if (currentStage === 3)
      return (
        <div className="text-center">
          <p className="font-medium sm:text-xl text-[#0b1220]">
            Interested in my work? <br /> Dive into my projects and see what I've been up to!
          </p>

          <Link to="/projects" className="homeinfo-solid-btn">
            Visit my portfolio
            <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
          </Link>
        </div>
      );

    if (currentStage === 4)
      return (
        <div className="text-center">
          <p className="font-medium sm:text-xl text-[#0b1220]">
            Got a project in mind? <br /> Let's connect and create something amazing together!
          </p>

          <Link to="/contact" className="homeinfo-solid-btn">
            Let's talk
            <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
          </Link>
        </div>
      );

    if (currentStage === 5)
      return (
        <div className="text-center">
          <p className="font-medium sm:text-xl text-[#0b1220]">
            Want to see my <br /> Certificates & Achievements?
          </p>

          <Link to="/certificates" className="homeinfo-solid-btn">
            View Certificates
            <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
          </Link>
        </div>
      );

    return null;
  })();

  if (!content) return null;

  return (
  <div className="homeinfo-pro">
    {content}
  </div>
);
};

export default HomeInfo;