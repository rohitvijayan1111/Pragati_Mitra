import React, { useState,useEffect } from 'react';
import './ComplianceOverlay.css';

const ComplianceOverlay = () => {
    const [isVisible, setIsVisible] = useState(() => {
        const hasAgreed = localStorage.getItem('hasAgreedToTerms');
        return !hasAgreed;  // Only show if they haven't agreed
      });
      const [isChecked, setIsChecked] = useState(false);
    
      const handleAgree = () => {
        // Save the agreement in localStorage
        localStorage.setItem('hasAgreedToTerms', 'true');
        setIsVisible(false);  // Hide the overlay
      };
    
      const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
      };
    
      if (!isVisible) {
        return null;  // If the overlay is not visible, render nothing
      }

  return (
    <>
      {isVisible && (
        <div className="overlay">
          <div className="overlay-content">
            <h2 className="overlay-heading">Data Privacy and Protection Compliance Notification</h2>
            <p>Welcome to <strong>PRAGATI MITRA</strong>. Our platform is committed to ensuring the privacy and security of your personal data. As part of our compliance with global and regional data protection laws, we adhere to the regulations outlined by the <strong>General Data Protection Regulation (GDPR)</strong> and the <strong>Family Educational Rights and Privacy Act (FERPA)</strong> to safeguard your information.</p>
            
            <div className="section">
              <h3>1. Overview of Data Collection and Use</h3>
              <p>Our application processes data to provide essential services and insights related to educational performance, achievements, financial records, and more. This data may include:</p>
              <ul>
                <li>Personal information (e.g., name, email, student ID)</li>
                <li>Academic records (e.g., grades, attendance)</li>
                <li>Faculty and staff details (e.g., positions, research output)</li>
                <li>Financial information (e.g., budgets, expenditure)</li>
              </ul>
            </div>

            <div className="section">
              <h3>2. GDPR Compliance: Your Rights and Our Responsibilities</h3>
              <p>If you are located within the European Union (EU), the General Data Protection Regulation (GDPR) provides you with specific rights regarding your personal data, including:</p>
              <ul>
                <li><strong>Right to Access:</strong> You can request to see the data we have collected about you at any time.</li>
                <li><strong>Right to Rectification:</strong> If your personal data is incorrect or incomplete, you have the right to request a correction.</li>
                <li><strong>Right to Erasure:</strong> You can request the deletion of your personal data if it is no longer necessary for the purposes for which it was collected.</li>
                <li><strong>Right to Data Portability:</strong> You can ask us to provide your data in a structured, commonly used, and machine-readable format.</li>
                <li><strong>Consent and Purpose Limitation:</strong> We will only process your personal data after obtaining your explicit consent and for the specific purposes you agree to.</li>
              </ul>
            </div>

            <div className="section">
              <h3>3. FERPA Compliance: Protection of Educational Records</h3>
              <p>For users in the United States, the Family Educational Rights and Privacy Act (FERPA) provides protection for educational records, and we strictly adhere to these regulations:</p>
              <ul>
                <li><strong>Access to Records:</strong> Students and eligible parents have the right to access and review the educational records stored within the platform.</li>
                <li><strong>Consent for Disclosure:</strong> Non-directory information (such as academic records) will not be shared with third parties without your explicit consent.</li>
                <li><strong>Amendments and Corrections:</strong> You can request changes to inaccurate or misleading information contained in your educational records.</li>
              </ul>
            </div>

            <div className="section">
              <h3>4. Data Security Measures</h3>
              <p>To ensure the safety of your data, <strong>PRAGATI MITRA</strong> uses advanced security measures:</p>
              <ul>
                <li><strong>Encryption:</strong> All sensitive data is encrypted both during transmission and while at rest, using industry-standard encryption technologies.</li>
                <li><strong>Access Controls:</strong> Only authorized users have access to specific datasets based on their roles within the platform.</li>
                <li><strong>Data Integrity:</strong> Our system is designed to maintain the accuracy and consistency of data through regular validation checks and audit trails.</li>
              </ul>
            </div>

            <div className="section">
              <h3>5. Your Consent</h3>
              <p>By continuing to use <strong>PRAGATI MITRA</strong>, you acknowledge and agree to our data collection and processing practices in accordance with GDPR and FERPA. We are committed to safeguarding your data and ensuring that your rights are fully protected.</p>
              <p>If you have any concerns about how your data is used or would like to exercise any of your rights under GDPR or FERPA, you can contact our Data Protection Officer at [Contact Information].</p>
            </div>

            <p>Thank you for being a valued user of <strong>PRAGATI MITRA.</strong> We take your privacy seriously and are dedicated to protecting your personal information while providing valuable services.</p>

            <div className="checkbox-container">
              <input 
                type="checkbox" 
                id="agreeCheckbox" 
                checked={isChecked} 
                onChange={handleCheckboxChange} 
              />
              <label htmlFor="agreeCheckbox">I have read and agree to the terms and conditions.</label>
            </div>
            
            <button 
              className={`agree-button ${isChecked ? 'active' : 'inactive'}`} 
              onClick={isChecked ? handleAgree : undefined}
              disabled={!isChecked}
            >
              Proceed
            </button>
          </div>
          <div className="overlay-background" />
        </div>
      )}
    </>
  );
};

export default ComplianceOverlay;
