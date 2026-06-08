import { useState } from "react";
import { useEffect } from "react";


import Home from "./components/pages/Home";
import Systems from "./components/pages/Systems";
import About from "./components/pages/About";
import Community from "./components/pages/Community";
import Reset from "./components/pages/systems/ThirtyDayReset";

import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import MobileMenu from "./components/layout/MobileMenu";
import ChatLauncher from "./components/layout/ChatLauncher";


function App() {
  const [activeSystem, setActiveSystem] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
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
    }, [activeTab]);

  const renderTab = () => {
    if (activeTab === "systems") {
      if (activeSystem === "reset") {
        return <Reset onBack={() => setActiveSystem(null)} />;
      }

      return <Systems
        activeSystem={activeSystem}
        setActiveSystem={setActiveSystem}
      />;
    }

    switch (activeTab) {
      case "about":
        return <About />;
      case "community":
        return <Community/>;
      default:
        return <Home setActiveTab={setActiveTab} setActiveSystem={setActiveSystem} />;
    }
  };


  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f5f6ff" }}>

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setActiveSystem={setActiveSystem}
        isMobile={isMobile}
        setMenuOpen={setMenuOpen}
      />
      

      <MobileMenu
        isMobile={isMobile}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        setActiveTab={setActiveTab}
        setActiveSystem={setActiveSystem}
      />
        


        
      {/* CONTENT */}
      <main>
        <div className="page-shell" key={activeTab}>
          {renderTab()}
        </div>

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
        

      </main>

      <Footer />
      
    </div>
  );
}



export default App;
