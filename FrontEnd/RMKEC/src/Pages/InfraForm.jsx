import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styled Components for Form
const FormContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const FormField = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 1rem;

  &:hover {
    background-color: #c82333;
  }
`;

const InfraForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newBuildings: '',
    renovations: '',
    campusExpansion: '',
    newLab: '',
    equipmentPurchase: '',
    utilityImprovements: '',
    technologyImprovement: '',
    sustainabilityInitiatives: '',
    futureDevelopment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.info('This feature is currently being built', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom
    });

    setTimeout(()=>navigate('/dashboard'),3000);
  };

  return (
    <FormContainer>
      <h2>Add Infrastructure Improvements</h2>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label>New Academic, Administrative, or Residential Buildings Introduced</Label>
          <TextArea
            name="newBuildings"
            value={formData.newBuildings}
            onChange={handleChange}
            placeholder="Enter details about new buildings introduced"
            rows="3"
          />
        </FormField>

        <FormField>
          <Label>Renovation & Upgradation</Label>
          <TextArea
            name="renovations"
            value={formData.renovations}
            onChange={handleChange}
            placeholder="Enter details about renovations and upgrades"
            rows="3"
          />
        </FormField>

        <FormField>
          <Label>Campus Expansion</Label>
          <TextArea
            name="campusExpansion"
            value={formData.campusExpansion}
            onChange={handleChange}
            placeholder="Enter details about campus expansion"
            rows="3"
          />
        </FormField>

        <FormField>
          <Label>Introduction of New Lab</Label>
          <TextArea
            name="newLab"
            value={formData.newLab}
            onChange={handleChange}
            placeholder="Enter details about new labs introduced"
            rows="3"
          />
        </FormField>

        <FormField>
          <Label>Equipment Purchase</Label>
          <TextArea
            name="equipmentPurchase"
            value={formData.equipmentPurchase}
            onChange={handleChange}
            placeholder="Enter details about new equipment purchased"
            rows="3"
          />
        </FormField>

        <FormField>
          <Label>Utility Improvements</Label>
          <TextArea
            name="utilityImprovements"
            value={formData.utilityImprovements}
            onChange={handleChange}
            placeholder="Enter details about utility improvements (e.g., electricity, water)"
            rows="3"
          />
        </FormField>

        <FormField>
          <Label>Technology Improvement</Label>
          <TextArea
            name="technologyImprovement"
            value={formData.technologyImprovement}
            onChange={handleChange}
            placeholder="Enter details about technology improvements"
            rows="3"
          />
        </FormField>

        <FormField>
          <Label>Sustainability & Green Initiatives</Label>
          <TextArea
            name="sustainabilityInitiatives"
            value={formData.sustainabilityInitiatives}
            onChange={handleChange}
            placeholder="Enter details about sustainability and green initiatives"
            rows="3"
          />
        </FormField>

        <FormField>
          <Label>Future Development Plans</Label>
          <TextArea
            name="futureDevelopment"
            value={formData.futureDevelopment}
            onChange={handleChange}
            placeholder="Enter details about future development plans"
            rows="3"
          />
        </FormField>

        <SubmitButton type="submit">Submit</SubmitButton>
        <CancelButton type="button" onClick={() => navigate('/dashboard')}>
          Cancel
        </CancelButton>
      </form>
      <ToastContainer />
    </FormContainer>
  );
};

export default InfraForm;