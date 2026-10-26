
import { useCallback, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CollectionDetails from "./pages/CollectionDetails";
import UploadPhoto from "./pages/UploadPhoto";

import LogoIntro from "./components/LogoIntro";
import BrandHeader from "./components/BrandHeader";
import "./App.css";

function AppContent() {
  const [showIntro, setShowIntro] = useState(true);

  const finishIntro = useCallback(() => {
    setShowIntro(false);
  }, []);

  return (
    <>
      {showIntro && <LogoIntro onComplete={finishIntro} />}

      {!showIntro && <BrandHeader />}

      <div
        className={
          showIntro
            ? "app-content-hidden"
            : "app-content-visible"
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/collections/:id" element={<CollectionDetails />} />
          <Route path="/collections/:id/upload" element={<UploadPhoto />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
