import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components for the table
const TableContainer = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 1rem;
  background-color: #f4f4f4;
  border-bottom: 2px solid #ddd;
`;

const TableCell = styled.td`
  padding: 0.75rem;
  text-align: center;
  border-bottom: 1px solid #ddd;
`;

const AddButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 1rem 0;

  &:hover {
    background-color: #0056b3;
  }
`;

const FinancialStatementList = () => {
  const navigate = useNavigate();

  // Dummy data for the table
  const dummyData = [
    {
      recurringDeptExpense: 5000,
      nonRecurringDeptExpense: 2000,
      recurringOtherDeptExpense: 1500,
      nonRecurringOtherDeptExpense: 1000,
      incomeFee: 10000,
      transportExpense: 2000,
      messExpense: 1000,
      constructionExpense: 500,
      salaryExpense: 8000,
      investments: 3000
    },
    {
      recurringDeptExpense: 7000,
      nonRecurringDeptExpense: 2500,
      recurringOtherDeptExpense: 1800,
      nonRecurringOtherDeptExpense: 1200,
      incomeFee: 12000,
      transportExpense: 2200,
      messExpense: 1300,
      constructionExpense: 600,
      salaryExpense: 8500,
      investments: 4000
    },
    // Add more dummy records if needed
  ];

  return (
    <TableContainer>
      <h2>Financial Statement Records</h2>
      <AddButton onClick={() => navigate('financial-statement')}>
        Add Record
      </AddButton>
      <Table>
        <thead>
          <tr>
            <TableHeader>Recurring Dept Expense</TableHeader>
            <TableHeader>Non-Recurring Dept Expense</TableHeader>
            <TableHeader>Recurring Other Dept Expense</TableHeader>
            <TableHeader>Non-Recurring Other Dept Expense</TableHeader>
            <TableHeader>Income from Fee</TableHeader>
            <TableHeader>Transport Expense</TableHeader>
            <TableHeader>Mess Expense</TableHeader>
            <TableHeader>Construction Expense</TableHeader>
            <TableHeader>Salary Expense</TableHeader>
            <TableHeader>Investments</TableHeader>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((record, index) => (
            <tr key={index}>
              <TableCell>{record.recurringDeptExpense}</TableCell>
              <TableCell>{record.nonRecurringDeptExpense}</TableCell>
              <TableCell>{record.recurringOtherDeptExpense}</TableCell>
              <TableCell>{record.nonRecurringOtherDeptExpense}</TableCell>
              <TableCell>{record.incomeFee}</TableCell>
              <TableCell>{record.transportExpense}</TableCell>
              <TableCell>{record.messExpense}</TableCell>
              <TableCell>{record.constructionExpense}</TableCell>
              <TableCell>{record.salaryExpense}</TableCell>
              <TableCell>{record.investments}</TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
      
      {/* Add Record button to navigate to the form page */}
    
    </TableContainer>
  );
};

export default FinancialStatementList;
