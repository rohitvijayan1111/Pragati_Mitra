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

const FinancialStatementForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    recurringDeptExpense: '',
    nonRecurringDeptExpense: '',
    recurringOtherDeptExpense: '',
    nonRecurringOtherDeptExpense: '',
    incomeFee: '',
    transportExpense: '',
    messExpense: '',
    constructionExpense: '',
    salaryExpense: '',
    investments: ''
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
      <h2>Add Financial Statement</h2>
      <form onSubmit={handleSubmit}>
        {/* Recurring and Non-Recurring Expenses for Department */}
        <FormField>
          <Label>Recurring Expense for Department</Label>
          <Input
            type="number"
            name="recurringDeptExpense"
            value={formData.recurringDeptExpense}
            onChange={handleChange}
            placeholder="Enter recurring expense for department"
          />
        </FormField>

        <FormField>
          <Label>Non-Recurring Expense for Department</Label>
          <Input
            type="number"
            name="nonRecurringDeptExpense"
            value={formData.nonRecurringDeptExpense}
            onChange={handleChange}
            placeholder="Enter non-recurring expense for department"
          />
        </FormField>

        {/* Recurring and Non-Recurring Expenses for Other Departments */}
        <FormField>
          <Label>Recurring Expense for Other Departments</Label>
          <Input
            type="number"
            name="recurringOtherDeptExpense"
            value={formData.recurringOtherDeptExpense}
            onChange={handleChange}
            placeholder="Enter recurring expense for other departments"
          />
        </FormField>

        <FormField>
          <Label>Non-Recurring Expense for Other Departments</Label>
          <Input
            type="number"
            name="nonRecurringOtherDeptExpense"
            value={formData.nonRecurringOtherDeptExpense}
            onChange={handleChange}
            placeholder="Enter non-recurring expense for other departments"
          />
        </FormField>

        {/* Income from Fee */}
        <FormField>
          <Label>Income from Fee</Label>
          <Input
            type="number"
            name="incomeFee"
            value={formData.incomeFee}
            onChange={handleChange}
            placeholder="Enter income from fee"
          />
        </FormField>

        {/* Other Expenses: Transport, Mess, Construction, Salary */}
        <FormField>
          <Label>Transport Expense</Label>
          <Input
            type="number"
            name="transportExpense"
            value={formData.transportExpense}
            onChange={handleChange}
            placeholder="Enter transport expense"
          />
        </FormField>

        <FormField>
          <Label>Mess Expense</Label>
          <Input
            type="number"
            name="messExpense"
            value={formData.messExpense}
            onChange={handleChange}
            placeholder="Enter mess expense"
          />
        </FormField>

        <FormField>
          <Label>Construction Expense</Label>
          <Input
            type="number"
            name="constructionExpense"
            value={formData.constructionExpense}
            onChange={handleChange}
            placeholder="Enter construction expense"
          />
        </FormField>

        <FormField>
          <Label>Salary Expense</Label>
          <Input
            type="number"
            name="salaryExpense"
            value={formData.salaryExpense}
            onChange={handleChange}
            placeholder="Enter salary expense"
          />
        </FormField>

        {/* Investments */}
        <FormField>
          <Label>Investments</Label>
          <Input
            type="number"
            name="investments"
            value={formData.investments}
            onChange={handleChange}
            placeholder="Enter investments"
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


export default FinancialStatementForm;
