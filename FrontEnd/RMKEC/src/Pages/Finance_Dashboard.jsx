import React from 'react';
import styled from 'styled-components';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';

// Styled Components for Dashboard
const DashboardContainer = styled.div`
  max-width: 1200px;
  max-height:1400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const ChartWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const SummaryBox = styled.div`
  display: inline-block;
  background-color: #fff;
  padding: 1rem;
  margin: 0.5rem;
  width: 30%;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Value = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #28a745;
`;

const Label = styled.div`
  font-size: 1rem;
  color: #666;
`;

const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F', '#FFBB28', '#0088FE'];

// Static financial data
const financialData = {
  recurringDeptExpense: 30000,
  nonRecurringDeptExpense: 15000,
  recurringOtherDeptExpense: 10000,
  nonRecurringOtherDeptExpense: 5000,
  transportExpense: 12000,
  messExpense: 20000,
  constructionExpense: 25000,
  salaryExpense: 60000,
  incomeFee: 200000,
  investments: 50000
};

const FinancialDashboard = () => {
    
  const expenseData = [
    { name: 'Recurring Dept Expenses', value: financialData.recurringDeptExpense },
    { name: 'Non-Recurring Dept Expenses', value: financialData.nonRecurringDeptExpense },
    { name: 'Recurring Other Dept Expenses', value: financialData.recurringOtherDeptExpense },
    { name: 'Non-Recurring Other Dept Expenses', value: financialData.nonRecurringOtherDeptExpense },
    { name: 'Transport Expense', value: financialData.transportExpense },
    { name: 'Mess Expense', value: financialData.messExpense },
    { name: 'Construction Expense', value: financialData.constructionExpense },
    { name: 'Salary Expense', value: financialData.salaryExpense }
  ];

  // Data for bar chart (income vs expenses)
  const incomeExpenseData = [
    { name: 'Income (Fees)', income: financialData.incomeFee },
    {
      name: 'Expenses',
      expenses:
        financialData.recurringDeptExpense +
        financialData.nonRecurringDeptExpense +
        financialData.recurringOtherDeptExpense +
        financialData.nonRecurringOtherDeptExpense +
        financialData.transportExpense +
        financialData.messExpense +
        financialData.constructionExpense +
        financialData.salaryExpense
    }
  ];

  return (
    <DashboardContainer>
      <Section>
        <SectionTitle>Financial Summary</SectionTitle>
        <ChartWrapper>
          <SummaryBox>
            <Value>{financialData.incomeFee}</Value>
            <Label>Total Income (Fees)</Label>
          </SummaryBox>
          <SummaryBox>
            <Value>{financialData.salaryExpense}</Value>
            <Label>Total Salary Expense</Label>
          </SummaryBox>
          <SummaryBox>
            <Value>{financialData.investments}</Value>
            <Label>Total Investments</Label>
          </SummaryBox>
        </ChartWrapper>
      </Section>

      <Section>
        <SectionTitle>Expenses Distribution</SectionTitle>
        <ChartWrapper>
          <PieChart width={400} height={500}>
            <Pie
              data={expenseData}
              cx={200}
              cy={200}
              innerRadius={60}
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label
            >
              {expenseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              wrapperStyle={{paddingLeft: 20}}
            />
          </PieChart>

          <BarChart width={500} height={500} barGap={0}   data={incomeExpenseData}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#82ca9d" barSize={40} />
            <Bar dataKey="expenses" fill="#8884d8" barSize={40} />
          </BarChart>
        </ChartWrapper>
      </Section>
    </DashboardContainer>
  );
};

export default FinancialDashboard;
