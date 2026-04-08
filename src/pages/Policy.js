import React from "react";

export default function Policy() {
  return (
    <div className="page policy-page">
      <div className="policy-content">
        <h1>Privacy Policy & Terms of Use</h1>
        
        <section className="policy-section">
          <h2>Privacy Policy</h2>
          <p>
            The Ministry of Health, Botswana is committed to protecting your privacy and ensuring the security 
            of your personal information. This privacy policy explains how we collect, use, and protect your data.
          </p>
          
          <h3>Information We Collect</h3>
          <ul>
            <li>Personal information provided through feedback forms and contact requests</li>
            <li>Anonymous usage data to improve our services</li>
            <li>Health facility search queries and preferences</li>
          </ul>
          
          <h3>How We Use Your Information</h3>
          <ul>
            <li>To provide and improve health services</li>
            <li>To respond to your inquiries and feedback</li>
            <li>To analyze website usage and improve user experience</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Terms of Use</h2>
          <p>
            By using the Botswana Health Connect portal, you agree to these terms and conditions.
          </p>
          
          <h3>Acceptable Use</h3>
          <ul>
            <li>Use the portal for legitimate health information and service access</li>
            <li>Respect the privacy and rights of other users</li>
            <li>Do not attempt to disrupt or compromise the portal's security</li>
            <li>Provide accurate information in feedback and contact forms</li>
          </ul>
          
          <h3>Disclaimer</h3>
          <p>
            The health information provided on this portal is for general guidance only. 
            For medical emergencies, please contact emergency services directly.
          </p>
        </section>

        <section className="policy-section">
          <h2>Data Protection</h2>
          <p>
            We implement appropriate security measures to protect your personal information 
            against unauthorized access, alteration, or destruction.
          </p>
          
          <h3>Your Rights</h3>
          <ul>
            <li>Right to access your personal data</li>
            <li>Right to correct inaccurate information</li>
            <li>Right to request deletion of your data</li>
            <li>Right to withdraw consent</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Contact Information</h2>
          <p>
            For questions about this privacy policy or data protection, please contact:
          </p>
          <div className="contact-info">
            <p><strong>Ministry of Health Data Protection Officer</strong></p>
            <p>📞 (+267) 363-2500</p>
            <p>📧 privacy@health.gov.bw</p>
            <p>📍 Plot 54069, 24 Amos Street, Gaborone, Botswana</p>
          </div>
        </section>

        <div className="policy-update">
          <p><em>Last updated: {new Date().getFullYear()}</em></p>
        </div>
      </div>
    </div>
  );
}