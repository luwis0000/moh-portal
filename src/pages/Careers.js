import React, { useState } from "react";
import Card from "../components/Card";
import Modal from "../components/Modal";

const positions = [
  { id: 1, title: "Nurse - Gaborone", text: "Full-time, public sector" },
  { id: 2, title: "Lab Technician - Francistown", text: "Contract, 12 months" }
];

export default function Careers() {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null
  });

  const handleApplyClick = (position) => {
    setSelectedPosition(position);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPosition(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      resume: null
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      resume: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Application submitted:", {
      position: selectedPosition,
      ...formData
    });
    
    // You would typically send this data to your backend
    alert(`Application submitted for ${selectedPosition.title}`);
    handleCloseModal();
  };

  return (
    <div className="page">
      <h2>Careers & Opportunities</h2>
      <div className="card-container">
        {positions.map(p => (
          <Card 
            key={p.id} 
            title={p.title} 
            text={p.text} 
            footer={
              <button 
                className="btn" 
                onClick={() => handleApplyClick(p)}
              >
                Apply
              </button>
            } 
          />
        ))}
      </div>

      {isModalOpen && selectedPosition && (
        <Modal 
          title={`Apply for ${selectedPosition.title}`}
          onClose={handleCloseModal}
          size="large"
        >
          <form onSubmit={handleSubmit} className="application-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="resume">Upload Resume/CV *</label>
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                required
              />
              <small>Accepted formats: PDF, DOC, DOCX (Max: 5MB)</small>
            </div>

            <div className="form-group">
              <label htmlFor="coverLetter">Cover Letter</label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                rows="4"
                placeholder="Tell us why you're interested in this position..."
                onChange={handleInputChange}
              />
            </div>

            <div className="modal-footer-actions">
              <button type="button" className="btn secondary" onClick={handleCloseModal}>
                Cancel
              </button>
              <button type="submit" className="btn primary">
                Submit Application
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}