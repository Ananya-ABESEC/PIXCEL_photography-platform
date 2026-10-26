
import { Link } from "react-router-dom";
import "./BrandHeader.css";

function BrandHeader() {
  return (
    <header className="pixcel-brand-header">
      <Link to="/dashboard" className="pixcel-brand-lockup">
        <img src="/images/pixcel-camera.png" alt="" />
        <span>PIXCEL</span>
      </Link>
    </header>
  );
}

export default BrandHeader;
