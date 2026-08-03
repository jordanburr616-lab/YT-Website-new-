import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./components/pages/Home";
import Systems from "./components/pages/Systems";
import Articles from "./components/pages/Articles";
import Community from "./components/pages/Community";

import Reset from "./components/pages/systems/ThirtyDayReset";
import BuildPhase from "./components/pages/systems/BuildPhase";
import Routine from "./components/pages/systems/Routine";

import Video18Article from "./components/pages/articles/Video18Article";
import Video17Article from "./components/pages/articles/Video17Article";
import Video16Article from "./components/pages/articles/Video16Article";
import Video15Article from "./components/pages/articles/Video15Article";
import Video14Article from "./components/pages/articles/Video14Article";
import Video13Article from "./components/pages/articles/Video13Article";
import Video12Article from "./components/pages/articles/Video12Article";
import Video11Article from "./components/pages/articles/Video11Article";

import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import MobileMenu from "./components/layout/MobileMenu";
import ChatLauncher from "./components/layout/ChatLauncher";

import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Privacy from "./components/pages/Privacy";
import Terms from "./components/pages/Terms";

function AppContent() {
  const location = useLocation();

  const [chatOpen, setChatOpen] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [chatHovered, setChatHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatSessionId, setChatSessionId] = useState(0);

  useEffect(() => {
    const imagesToPreload = [
      "/images/30 day img 1.png",
      "/images/30 day img 2.png",
      "/images/30-day-title.png",
      "/images/about-me.png",
      "/images/bands-refresh-1.png",
      "/images/bands-refresh-2.png",
      "/images/bands-workout-1.png",
      "/images/bands-workout-2.png",
      "/images/building.png",
      "/images/chat-hover.png",
      "/images/chat.png",
      "/images/coming-soon-1.png",
      "/images/coming-soon-2.png",
      "/images/community-coming-soon.png",
      "/images/fav-icon.png",
      "/images/hero-title-mobile.png",
      "/images/instagram.png",
      "/images/keep-building.png",
      "/images/productivity-systems-title.png",
      "/images/systems-title.png",
      "/images/talking.png",
      "/images/thinking.png",
      "/images/tiktok.png",
      "/images/tree.png",
      "/images/waiting.png",
      "/images/youtube-icon.png",
      "/images/youtube-logo.png",
      "/images/youtube-title.png",
      "/images/bands-clock-1.png",
      "/images/bands-clock-2.png",
    ];

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f5f6ff" }}>
      <div className="no-print">
        <Navbar
          isMobile={isMobile}
          setMenuOpen={setMenuOpen}
        />

        <MobileMenu
          isMobile={isMobile}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      </div>

      <main>
        <div className="page-shell" key={location.pathname}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/systems" element={<Systems />} />
            <Route path="/systems/build" element={<BuildPhase />} />
            <Route path="/systems/reset" element={<Reset />} />
            <Route path="/systems/routine" element={<Routine />} />

            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/how-to-get-addicted-to-building-muscle" element={<Video18Article />}/>
            <Route path="/articles/how-to-get-out-of-a-rut" element={<Video17Article />}/>
            <Route path="/articles/why-you-care-so-much" element={<Video16Article />} />
            <Route path="/articles/the-7-stages-of-weight-loss" element={<Video15Article />}/>
            <Route path="/articles/the-7-levels-of-a-glow-up" element={<Video14Article />}/>
            <Route path="/articles/the-no-fap-timeline" element={<Video13Article />}/>
            <Route path="/articles/how-to-get-addicted-to-not-using-your-phone" element={<Video12Article />}/>
            <Route path="/articles/the-7-levels-of-nicotine-addiction" element={<Video11Article />}/>

            <Route path="/community" element={<Community />} />

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </div>

        <div className="no-print">
          <ChatLauncher
            chatOpen={chatOpen}
            setChatOpen={setChatOpen}
            chatMinimized={chatMinimized}
            setChatMinimized={setChatMinimized}
            chatHovered={chatHovered}
            setChatHovered={setChatHovered}
            chatSessionId={chatSessionId}
            setChatSessionId={setChatSessionId}
          />
        </div>
      </main>

      <div className="no-print">
        <Footer />
      </div>
    </div>
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
