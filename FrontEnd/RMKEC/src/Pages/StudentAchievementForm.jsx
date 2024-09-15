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

const StudentAchievementForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    comment: '',
    topPerformer: '',
    awards: '',
    scholarships: '',
    publications: '',
    competitionsWon: '',
    internships: '',
    projects: '',
    sports: ''
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
    // Show a notification with react-toastify
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

    
    setTimeout(()=>navigate('/dashboard'),3000); // Uncomment if you want to navigate
  };

  return (
    <FormContainer>
      <h2>Add Student Achievements</h2>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label>Comment about Institution's Student</Label>
          <TextArea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Enter comments about the student"
            rows="3"
          />
        </FormField>

        <FormField>
          <Label>Academic Top Performer</Label>
          <Input
            type="text"
            name="topPerformer"
            value={formData.topPerformer}
            onChange={handleChange}
            placeholder="Enter name of the top performer"
          />
        </FormField>

        <FormField>
          <Label>Awards Received by Students</Label>
          <Input
            type="text"
            name="awards"
            value={formData.awards}
            onChange={handleChange}
            placeholder="Enter awards received by students"
          />
        </FormField>

        <FormField>
          <Label>Scholarships Received by Students</Label>
          <Input
            type="text"
            name="scholarships"
            value={formData.scholarships}
            onChange={handleChange}
            placeholder="Enter scholarships received"
          />
        </FormField>

        <FormField>
          <Label>Research Publications</Label>
          <Input
            type="text"
            name="publications"
            value={formData.publications}
            onChange={handleChange}
            placeholder="Enter research publications"
          />
        </FormField>

        <FormField>
          <Label>Competitions Won</Label>
          <Input
            type="text"
            name="competitionsWon"
            value={formData.competitionsWon}
            onChange={handleChange}
            placeholder="Enter competitions won"
          />
        </FormField>

        <FormField>
          <Label>Internships</Label>
          <Input
            type="text"
            name="internships"
            value={formData.internships}
            onChange={handleChange}
            placeholder="Enter internships"
          />
        </FormField>

        <FormField>
          <Label>Projects Achieved</Label>
          <Input
            type="text"
            name="projects"
            value={formData.projects}
            onChange={handleChange}
            placeholder="Enter projects achieved"
          />
        </FormField>

        <FormField>
          <Label>Sports Achievements</Label>
          <Input
            type="text"
            name="sports"
            value={formData.sports}
            onChange={handleChange}
            placeholder="Enter sports achievements"
          />
        </FormField>

        <SubmitButton type="submit">Submit</SubmitButton>
        <CancelButton type="button" onClick={() => navigate('/dashboard')} >
          Cancel
        </CancelButton>
      </form>
      {/* ToastContainer to display the toast notifications */}
      <ToastContainer />
    </FormContainer>
  );
};

export default StudentAchievementForm;
