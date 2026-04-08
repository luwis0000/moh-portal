import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Education from "./pages/Education";
import Chatbot from "./pages/Chatbot";
import Settings from "./pages/Settings";
import Feedback from "./pages/Feedback";
import Dashboard from "./pages/Dashboard";
import Careers from "./pages/Careers";
import Emergency from "./pages/Emergency";
import Policy from "./pages/Policy";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

export default function AppRouter() {
  const validateComponent = (name, Comp) => {
    const t = typeof Comp;
    if (t !== 'function' && t !== 'string') {
      // eslint-disable-next-line no-console
      console.error(`AppRouter: imported component "${name}" is not a valid React component (type=${t}). Replacing with error stub.`);
      return () => (
        <div style={{ padding: '2rem' }}>
          <h3 style={{ color: 'crimson' }}>Component load error</h3>
          <p>Failed to load component: <strong>{name}</strong></p>
          <p>See console for details.</p>
        </div>
      );
    }
    return Comp;
  };

  const HomeComp = validateComponent('Home', Home);
  const AboutComp = validateComponent('About', About);
  const ServicesComp = validateComponent('Services', Services);
  const EducationComp = validateComponent('Education', Education);
  const ChatbotComp = validateComponent('Chatbot', Chatbot);
  const SettingsComp = validateComponent('Settings', Settings);
  const FeedbackComp = validateComponent('Feedback', Feedback);
  const DashboardComp = validateComponent('Dashboard', Dashboard);
  const CareersComp = validateComponent('Careers', Careers);
  const EmergencyComp = validateComponent('Emergency', Emergency);
  const PolicyComp = validateComponent('Policy', Policy);
  const AnalyticsComp = validateComponent('Analytics', Analytics);
  const NotFoundComp = validateComponent('NotFound', NotFound);

  return (
    <Routes>
      <Route path="/" element={<HomeComp />} />
      <Route path="/about" element={<AboutComp />} />
      <Route path="/services" element={<ServicesComp />} />
      <Route path="/education" element={<EducationComp />} />
      <Route path="/chatbot" element={<ChatbotComp />} />
      <Route path="/settings" element={<SettingsComp />} />
      <Route path="/feedback" element={<FeedbackComp />} />
      <Route path="/dashboard" element={<DashboardComp />} />
      <Route path="/careers" element={<CareersComp />} />
      <Route path="/emergency" element={<EmergencyComp />} />
      <Route path="/policy" element={<PolicyComp />} />
      <Route path="/analytics" element={<AnalyticsComp />} />
      <Route path="*" element={<NotFoundComp />} />
    </Routes>
  );
}