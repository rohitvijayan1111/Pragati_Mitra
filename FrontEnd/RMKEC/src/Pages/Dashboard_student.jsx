// StudentDashboard.js
import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
  padding: 30px;
  border-radius: 10px;
  width: 80%;
  margin: 50px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3436;
  margin-bottom: 30px;
`;

const InfoCard = styled.div`
  background-color: #ffffff;
  width: 100%;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const AchievementsContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
  border-radius: 10px;
  padding: 20px;
  margin-top: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const AchievementsTitle = styled.h2`
  font-size: 1.8rem;
  color: #2d3436;
  margin-bottom: 15px;
`;

const AchievementItem = styled.li`
  font-size: 1.2rem;
  color: #636e72;
  margin-bottom: 10px;
`;

const AchievementsList = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
`;

const Label = styled.div`
  font-size: 1.2rem;
  color: #636e72;
  font-weight: bold;
`;

const Value = styled.div`
  font-size: 1.2rem;
  color: #2d3436;
`;

const Dashboard_student = () => {
  const studentData = {
    name: "Rohit Vijayan B",
    rollNumber: "111722203012",
    email: "rohit@example.com",
    phone: "9876543210",
    parentMail: "parent@example.com",
    department: "Information Technology",
    academicYear: "2022-2026",
    placementsStatus: "pending",
    higherStudiesStatus: "not applicable",
    cgpa: "9.00",
    studentType: "Day Scholar",
    achievements: [
        "Winner of Hackathon 2023",
        "Published paper on AI in Education",
        "Organized National Level Coding Event",
      ],
  };

  return (
    <DashboardContainer>
      <Title>Student Dashboard</Title>

      <InfoCard>
        <Label>Name:</Label>
        <Value>{studentData.name}</Value>
      </InfoCard>

      <InfoCard>
        <Label>Roll Number:</Label>
        <Value>{studentData.rollNumber}</Value>
      </InfoCard>

      <InfoCard>
        <Label>Email:</Label>
        <Value>{studentData.email}</Value>
      </InfoCard>

      <InfoCard>
        <Label>Phone:</Label>
        <Value>{studentData.phone}</Value>
      </InfoCard>

      <InfoCard>
        <Label>Parent Email:</Label>
        <Value>{studentData.parentMail}</Value>
      </InfoCard>

      <InfoCard>
        <Label>Department:</Label>
        <Value>{studentData.department}</Value>
      </InfoCard>

      <InfoCard>
        <Label>Academic Year:</Label>
        <Value>{studentData.academicYear}</Value>
      </InfoCard>

      <InfoCard>
        <Label>Placement Status:</Label>
        <Value>{studentData.placementsStatus}</Value>
      </InfoCard>

      <InfoCard>
        <Label>Higher Studies Status:</Label>
        <Value>{studentData.higherStudiesStatus}</Value>
      </InfoCard>

      <InfoCard>
        <Label>CGPA:</Label>
        <Value>{studentData.cgpa}</Value>
      </InfoCard>

      <InfoCard>
        <Label>Student Type:</Label>
        <Value>{studentData.studentType}</Value>
      </InfoCard>
      <AchievementsContainer>
        <AchievementsTitle>Achievements</AchievementsTitle>
        <AchievementsList>
            {studentData.achievements.map((achievement, index) => (
            <AchievementItem key={index}>{achievement}</AchievementItem>
            ))}
        </AchievementsList>
        </AchievementsContainer>

    </DashboardContainer>
  );
};

export default Dashboard_student;
