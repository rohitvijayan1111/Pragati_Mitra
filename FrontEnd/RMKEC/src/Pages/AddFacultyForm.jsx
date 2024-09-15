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

const AddFacultyForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    award: '',
    qualification: '',
    researchProjects: '',
    advancedDegree: '',
    researchPapers: '',
    patents: '',
    publicLectures: ''
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

    // After submission, navigate back to the faculty table page
    setTimeout(()=>navigate('/dashboard'),3000);
  };

  return (
    <FormContainer>
      <h2>Add Faculty Details</h2>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter faculty name"
            
          />
        </FormField>

        <FormField>
          <Label>Awards Received</Label>
          <Input
            type="text"
            name="award"
            value={formData.award}
            onChange={handleChange}
            placeholder="Enter awards"
          />
        </FormField>

        <FormField>
          <Label>Qualification</Label>
          <Input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            placeholder="Enter qualification"
          />
        </FormField>

        <FormField>
          <Label>Research Projects</Label>
          <Input
            type="text"
            name="researchProjects"
            value={formData.researchProjects}
            onChange={handleChange}
            placeholder="Enter research projects"
          />
        </FormField>

        <FormField>
          <Label>Advanced Degree/Certification</Label>
          <Input
            type="text"
            name="advancedDegree"
            value={formData.advancedDegree}
            onChange={handleChange}
            placeholder="Enter advanced degree or certification"
          />
        </FormField>

        <FormField>
          <Label>Research Papers</Label>
          <Input
            type="number"
            name="researchPapers"
            value={formData.researchPapers}
            onChange={handleChange}
            placeholder="Enter number of research papers"
          />
        </FormField>

        <FormField>
          <Label>Patents</Label>
          <Input
            type="number"
            name="patents"
            value={formData.patents}
            onChange={handleChange}
            placeholder="Enter number of patents"
          />
        </FormField>

        <FormField>
          <Label>Public Lectures</Label>
          <Input
            type="number"
            name="publicLectures"
            value={formData.publicLectures}
            onChange={handleChange}
            placeholder="Enter number of public lectures"
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

export default AddFacultyForm;
