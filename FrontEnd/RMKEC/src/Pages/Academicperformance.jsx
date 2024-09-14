import React, { useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FormContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  background-color: #f7f7f7;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormHeading = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
`;

const SubHeading = styled.h3`
  margin-top: 1.5rem;
  font-weight: bold;
  color: #444;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #555;
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  color: white;
  background-color: #28a745;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #218838;
  }
`;

const Academicperformance = () => {
  const [data, setData] = useState({
    passPercentage: '',
    avgGpa: '',
    graduationRate: '',
    universityRank: '',
    studentName: '',
    extraCurricular: ''
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', data);
    toast.success('Form submitted successfully!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
    });
  };

  return (
    <FormContainer>
      <FormHeading>Add Academic Perfromance Records</FormHeading>

      <Form >
        <FormGroup>
          <Label htmlFor="passPercentage">Pass Percentage</Label>
          <Input
            type="text"
            name="passPercentage"
            value={data.passPercentage}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="avgGpa">Avg GPA</Label>
          <Input
            type="text"
            name="avgGpa"
            value={data.avgGpa}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="graduationRate">Graduation Rate</Label>
          <Input
            type="text"
            name="graduationRate"
            value={data.graduationRate}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="universityRank">University Rank</Label>
          <Input
            type="text"
            name="universityRank"
            placeholder="Rank"
            value={data.universityRank}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="studentName">Name of the Student</Label>
          <Input
            type="text"
            name="studentName"
            value={data.studentName}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <SubHeading>Extra-Curricular Activities</SubHeading>
        <FormGroup>
          <Label htmlFor="extraCurricular">Details</Label>
          <Input
            type="text"
            name="extraCurricular"
            value={data.extraCurricular}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <SubmitButton type="Button" onClick={handleSubmit}>Submit</SubmitButton>
      </Form>

      <ToastContainer />
    </FormContainer>
  );
};

export default Academicperformance;
