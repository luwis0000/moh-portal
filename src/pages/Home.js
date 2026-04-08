import React, { useState } from "react";
import Card from "../components/Card";
import DataVisualization from "../components/DataVisualization";
import languagePack from "../utils/language";
import { announcements } from "../utils/data";
import { useAppContext } from "../utils/AppContext";
import { Link } from "react-router-dom";
import VoiceAssistant from "../components/VoiceAssistant";

export default function Home() {
  const { language } = useAppContext();
  const t = language === "en" ? languagePack.EN : languagePack.TN;

  return (
    <div className="page home-page">
      {/* HERO SECTION */}
      <section className="hero">
        <h1>{t.siteTitle}</h1>
        <p className="hero-subtitle">
          {language === "en"
            ? "Ministry of Health - Botswana"
            : "Lefapha la Bophelo - Botswana"}
        </p>
        <p className="hero-description">
          {language === "en"
            ? "Quality healthcare services for all citizens of Botswana."
            : "Ditirelo tsa bophelo tsa boleng mo bathong botlhe ba Botswana."}
        </p>
        <div className="hero-actions">
          <Link to="/services" className="btn primary">
            🏥 {language === "en" ? "Find Services" : "Fumana Ditirelo"}
          </Link>
          <Link to="/education" className="btn secondary">
            📚 {language === "en" ? "Health Education" : "Thuto ya Bophelo"}
          </Link>
        </div>
      </section>

      {/* MAIN CONTENT GRID - PROFESSIONAL LAYOUT */}
      <div className="professional-layout-grid">
        
        {/* LEFT COLUMN - Minister & Quick Access */}
        <div className="left-column">
          
          {/* MINISTRY CONNECT - NOW ON TOP */}
          <section className="ministry-connect card-glossy">
            <div className="connect-header">
              <h3>{language === "en" ? "Botswana Health Connect" : "Bophelo Botswana Connect"}</h3>
              <p>
                {language === "en"
                  ? "Connecting citizens with reliable healthcare services and national programs."
                  : "Re golaganya batho le ditirelo tsa bophelo tsa boammaaruri le mananeo a naga."}
              </p>
            </div>
            <div className="minister-info">
              <div className="minister-photo">
                <img 
                  src={process.env.PUBLIC_URL + "/assets/images/nav-gallery/healthcare-3.jpg"} 
                  alt="Dr. Stephen Modise - Minister of Health"
                  className="minister-image"
                  onError={(e) => {
                    console.log('Image failed to load');
                    e.target.style.backgroundColor = '#ccc';
                    e.target.style.display = 'flex';
                    e.target.style.alignItems = 'center';
                    e.target.style.justifyContent = 'center';
                    e.target.innerHTML = 'Image Not Found';
                  }}
                />
              </div>
              <div className="minister-text">
                <h4>Dr. Stephen Modise</h4>
                <p>{language === "en" ? "Minister of Health" : "Tona ya Bophelo"}</p>
                <p className="quote">
                  "{language === "en"
                    ? "Committed to quality healthcare for all."
                    : "O ikemiseditse go naya Batho botlhe tlhokomelo ya boleng."}"
                </p>
                <Link to="/about" className="btn secondary small-btn">
                  {language === "en" ? "Learn More" : "Ithute Gape"}
                </Link>
              </div>
            </div>
          </section>

          {/* QUICK ACCESS - NOW BELOW MINISTER */}
          <section className="quick-access-section">
            <h2>{language === "en" ? "Quick Access" : "Go Fitišega ka Bonako"}</h2>
            <div className="quick-access-grid">
              <Card
                title={language === "en" ? "Health Facilities" : "Dibaka tsa Bophelo"}
                text={language === "en" ? "Find hospitals & clinics" : "Fumana dibedele le dikliniki"}
                footer={<Link to="/services" className="btn primary">{language === "en" ? "View" : "Bona"}</Link>}
                className="card-glossy primary square-card compact"
              />
              <Card
                title={language === "en" ? "Health Education" : "Thuto ya Bophelo"}
                text={language === "en" ? "Learn about prevention" : "Ithute ka thibelo"}
                footer={<Link to="/education" className="btn secondary">{language === "en" ? "Learn" : "Ithute"}</Link>}
                className="card-glossy accent square-card compact"
              />
              <Card
                title={language === "en" ? "Emergency" : "Tšhogo"}
                text={language === "en" ? "24/7 emergency help" : "Thuso diuiri tše 24"}
                footer={<Link to="/emergency" className="btn emergency">{language === "en" ? "Call" : "Bitsa"}</Link>}
                className="card-glossy emergency square-card compact"
              />
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN - Latest Updates */}
        <div className="right-column">
          
          {/* LATEST NEWS & UPDATES */}
          <section className="latest-updates-section">
            <div className="updates-header">
              <h2>{language === "en" ? "Latest News & Updates" : "Dintlha tša bofelo & Dipotlako"}</h2>
              <p className="updates-subtitle">
                {language === "en" 
                  ? "Stay informed about health initiatives, programs, and announcements"
                  : "Dula o na le tshedimosetso ka mananeo a bophelo, mananeo, le ditshedimosetso"}
              </p>
            </div>
            
            <div className="updates-grid">
              {announcements.map((a) => (
                <Card
                  key={a.id}
                  title={a.title}
                  text={a.summary}
                  footer={
                    <div className="announcement-footer">
                      <span className="announcement-date">{a.date}</span>
                      <Link to="/education" className="btn link">
                        {language === "en" ? "Read More →" : "Bala go feta →"}
                      </Link>
                    </div>
                  }
                  className="card-glossy update-card"
                />
              ))}
            </div>

            <div className="view-all-container">
              <Link to="/news" className="btn secondary">
                {language === "en" ? "View All News" : "Bona Dintlha Tsotlhe"}
              </Link>
            </div>
          </section>

        </div>
      </div>

      {/* DATA VISUALIZATION SECTION */}
      <section className="data-viz-section">
        <DataVisualization />
      </section>

      {/* CHATBOT PROMPT */}
      <section className="chatbot-prompt compact">
        <div className="prompt-content">
          <div className="prompt-icon">🤖</div>
          <div className="prompt-text">
            <h3>{language === "en" ? "Need Help?" : "O tlhoka thuso?"}</h3>
            <p>
              {language === "en"
                ? "Ask our AI assistant about health services."
                : "Botša motsaedi wa rona wa AI ka ditirelo tsa bophelo."}
            </p>
          </div>
          <Link to="/chatbot" className="btn secondary small-btn">
            {language === "en" ? "Ask Now" : "Botša Gompieno"}
          </Link>
        </div>
      </section>

      {/* VOICE ASSISTANT */}
      <VoiceAssistant />
    </div>
  );
}