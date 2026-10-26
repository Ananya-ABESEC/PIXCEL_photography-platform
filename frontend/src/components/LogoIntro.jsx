
import { useEffect } from "react";
import "./LogoIntro.css";

function LogoIntro({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="pixcel-intro">
      <div className="pixcel-intro-logo">
        <img
          className="pixcel-intro-camera"
          src="/images/pixcel-camera.png"
          alt=""
        />

        <span className="pixcel-intro-wordmark">PIXCEL</span>
      </div>
    </div>
  );
}

export default LogoIntro;