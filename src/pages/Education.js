import React, { useState } from "react";
import Card from "../components/Card";
import { healthServices, serviceCategories } from "../utils/data";
import { useAppContext } from "../utils/AppContext";
import languagePack from "../utils/language";

export default function Education() {
  const { language } = useAppContext();
  const t = language === "en" ? languagePack.EN : languagePack.TN;
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedService, setExpandedService] = useState(null);

  const toggleService = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const closeExpandedService = () => {
    setExpandedService(null);
  };

  // Filter services based on category and search
  const filteredServices = healthServices.filter(service => {
    const matchesCategory = selectedCategory === 'all' || 
      service.category.toLowerCase().includes(selectedCategory);
    
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.overview.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="page education-page">
      {/* Header */}
      <section className="education-header">
        <h1>{language === 'en' ? 'Health Services & Programs' : 'Ditirelo le Mananeo a Bophelo'}</h1>
        <p className="education-subtitle">
          {language === 'en' 
            ? 'Comprehensive guide to government health services available in Botswana'
            : 'Tataiso e e Tlatsetseng ya ditirelo tsa bophelo tsa puso tse di fitlhegelang mo Botswana'}
        </p>
      </section>

      {/* Search and Filter */}
      <section className="services-filter">
        <div className="search-box">
          <input
            type="text"
            placeholder={language === 'en' ? 'Search health services...' : 'Batla ditirelo tsa bophelo...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filters">
          {serviceCategories.map(category => (
            <button
              key={category.id}
              className={`category-filter ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="filter-icon">{category.icon}</span>
              <span className="filter-text">{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid">
        <div className="services-header">
          <h2>
            {selectedCategory === 'all' 
              ? (language === 'en' ? 'All Health Services' : 'Ditirelo Tsotlhe tsa Bophelo')
              : serviceCategories.find(cat => cat.id === selectedCategory)?.name}
          </h2>
          <span className="services-count">
            {filteredServices.length} {language === 'en' ? 'services' : 'ditirelo'}
          </span>
        </div>

        <div className="services-container">
          {filteredServices.map(service => (
            <div key={service.id} className="service-card-wrapper">
              <Card
                title={service.title}
                text={service.overview}
                className={`service-card ${expandedService === service.id ? 'expanded' : ''}`}
                onClick={() => toggleService(service.id)}
                footer={
                  <div className="service-meta">
                    <span className="service-category">{service.category}</span>
                    <span className="service-cost">{service.cost.includes('No cost') || service.cost.includes('Free') 
                      ? (language === 'en' ? 'Free' : 'Mahala') 
                      : service.cost.split('.')[0]}</span>
                  </div>
                }
              />
              
              {/* Expanded Service Details */}
              {expandedService === service.id && (
                <div className="service-details">
                  {/* Close Button */}
                  <div className="service-details-header">
                    <h3>{service.title}</h3>
                    <button 
                      className="close-details-btn"
                      onClick={closeExpandedService}
                      aria-label={language === 'en' ? 'Close details' : 'Tswalela tshedimosetso'}
                    >
                      ✕
                    </button>
                  </div>

                  <div className="detail-section">
                    <h4>{language === 'en' ? 'Eligibility' : 'Botlhokwa'}</h4>
                    <p>{service.eligibility}</p>
                  </div>

                  <div className="detail-section">
                    <h4>{language === 'en' ? 'How to Apply' : 'Mokgwa wa go Kopa'}</h4>
                    <p>{service.process}</p>
                  </div>

                  <div className="detail-section">
                    <h4>{language === 'en' ? 'Required Documents' : 'Dikwalo tse di Tlhokegang'}</h4>
                    <ul>
                      {service.documents.map((doc, index) => (
                        <li key={index}>{doc}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="detail-section">
                    <h4>{language === 'en' ? 'Processing Time' : 'Nako ya Tiriso'}</h4>
                    <p>{service.duration}</p>
                  </div>

                  <div className="detail-section">
                    <h4>{language === 'en' ? 'Service Locations' : 'Mafelo a Tirelo'}</h4>
                    <ul>
                      {service.locations.map((location, index) => (
                        <li key={index}>{location}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="detail-section">
                    <h4>{language === 'en' ? 'Contact Information' : 'Tshedimosetso ya Kgolagano'}</h4>
                    <div className="contact-info">
                      {service.contact.phone && <p>📞 {service.contact.phone}</p>}
                      {service.contact.email && <p>📧 {service.contact.email}</p>}
                      {service.contact.location && <p>📍 {service.contact.location}</p>}
                      {service.contact.hours && <p>🕒 {service.contact.hours}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="no-services">
            <p>{language === 'en' 
              ? 'No services found matching your criteria. Try a different search or category.'
              : 'Ga go na ditirelo tse di fitlhegang tse di malebanang le dintlha tsa gago. Lekgosa go batla gape.'}
            </p>
          </div>
        )}
      </section>

      {/* Quick Stats */}
      <section className="services-stats">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{healthServices.length}</div>
            <div className="stat-label">{language === 'en' ? 'Health Services' : 'Ditirelo tsa Bophelo'}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{serviceCategories.length - 1}</div>
            <div className="stat-label">{language === 'en' ? 'Service Categories' : 'Dikarolo tsa Ditirelo'}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {healthServices.filter(s => s.cost.includes('Free') || s.cost.includes('No cost')).length}
            </div>
            <div className="stat-label">{language === 'en' ? 'Free Services' : 'Ditirelo tsa Mahala'}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24/7</div>
            <div className="stat-label">{language === 'en' ? 'Emergency Support' : 'Tshegetso ya Tšhogo'}</div>
          </div>
        </div>
      </section>
    </div>
  );
}