// src/pages/Analytics.js
import React from "react";
import DataVisualization from "../components/DataVisualization";
import { useAppContext } from "../utils/AppContext";
import languagePack from "../utils/language";

export default function Analytics() {
  const { language } = useAppContext();
  const t = language === "en" ? languagePack.EN : languagePack.TN;

  return (
    <div className="page analytics-page">
      <div className="page-header">
        <h1>{language === 'en' ? 'Health Analytics Dashboard' : 'Dashboard ya Dianalitiki tsa Bophelo'}</h1>
        <p className="page-subtitle">
          {language === 'en' 
            ? 'Comprehensive health data and statistics for Botswana'
            : 'Datha ya bophelo e e akaretsang le dipalopalo tsa Botswana'}
        </p>
      </div>

      <DataVisualization />

      {/* Additional analytics content can go here */}
      <div className="analytics-grid">
        <div className="analytics-card card-glossy">
          <h3>{language === 'en' ? 'Key Metrics' : 'Dimetri tše bohlokwa'}</h3>
          {/* Add key metrics */}
        </div>
        <div className="analytics-card card-glossy">
          <h3>{language === 'en' ? 'Recent Updates' : 'Dipotlako tša bofelo'}</h3>
          {/* Add recent updates */}
        </div>
      </div>
    </div>
  );
}