import React from 'react';
import styled from 'styled-components';
import { FaBook, FaChalkboardTeacher, FaTrophy, FaChartLine, FaGraduationCap } from 'react-icons/fa'; // Icons

const ReportContainer = styled.div`
  padding: 30px;
  font-family: 'Roboto', sans-serif;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Section = styled.section`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }
`;

const Heading = styled.h2`
  font-size: 1.8em;
  color: #34495e;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  svg {
    margin-right: 10px;
    color: #3498db;
  }
`;

const SubHeading = styled.h3`
  font-size: 1.4em;
  color: #555;
  margin-top: 20px;
  margin-bottom: 15px;
`;

const List = styled.ul`
  margin: 0;
  padding-left: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 12px;
  font-size: 1.1em;
  color: #2c3e50;
`;

const Paragraph = styled.p`
  font-size: 1.1em;
  line-height: 1.8;
  color: #7f8c8d;
`;

const AIReport = () => {
  return (
    <ReportContainer>
      <Section>
        <Heading><FaBook /> Curricular Design and Academic Performances</Heading>
        
        <SubHeading>List of Courses Offered</SubHeading>
        <List>
          <ListItem><strong>Undergraduate Programs:</strong> Computer Science, Electrical Engineering, Mechanical Engineering, Civil Engineering, Business Administration</ListItem>
          <ListItem><strong>Postgraduate Programs:</strong> MBA, M.Tech in Computer Science, M.Sc in Data Science, M.A in Economics</ListItem>
          <ListItem><strong>Diploma Courses:</strong> Web Development, Digital Marketing</ListItem>
        </List>
        
        <SubHeading>Faculty Count and Faculty-Student Ratios</SubHeading>
        <List>
          <ListItem><strong>Overall Faculty Count:</strong> 150</ListItem>
          <ListItem><strong>Overall Student Count:</strong> 1800</ListItem>
          <ListItem><strong>Faculty-Student Ratio:</strong> 1:12</ListItem>
        </List>

        <SubHeading>Academic Performance Summary</SubHeading>
        <Paragraph>The academic performance has been commendable, with a focus on enhancing teaching methodologies and student learning experiences.</Paragraph>
        
        <SubHeading>Overall Pass and Fail Percentage</SubHeading>
        <List>
          <ListItem><strong>Pass Percentage:</strong> 92%</ListItem>
          <ListItem><strong>Fail Percentage:</strong> 8%</ListItem>
        </List>
      </Section>

      <Section>
        <Heading><FaTrophy /> Research Works & Publications</Heading>

        <SubHeading>Institution Research Strategy</SubHeading>
        <Paragraph>XYZ College focuses on research that aligns with industry needs and global challenges.</Paragraph>

        <SubHeading>Funds and Grants</SubHeading>
        <List>
          <ListItem><strong>Total Research Funds:</strong> $2.5 Million</ListItem>
          <ListItem><strong>Major Grants:</strong> $1.5 Million from National Research Foundation</ListItem>
        </List>

        <SubHeading>Ongoing Research Projects</SubHeading>
        <List>
          <ListItem><strong>AI for Healthcare:</strong> Led by Dr. Anil Verma</ListItem>
          <ListItem><strong>Sustainable Energy Solutions:</strong> Led by Dr. Sunita Mehta</ListItem>
        </List>
      </Section>

      <Section>
        <Heading><FaChalkboardTeacher /> Faculty Achievements</Heading>

        <SubHeading>Awards Received</SubHeading>
        <List>
          <ListItem><strong>National Teaching Excellence Award:</strong> Dr. Anjali Patel</ListItem>
          <ListItem><strong>Best Research Paper Award:</strong> Dr. Vikram Singh</ListItem>
        </List>

        <SubHeading>Research & Leadership Roles</SubHeading>
        <Paragraph>Our faculty holds prominent positions on national committees and editorial boards of reputed journals.</Paragraph>
      </Section>
    </ReportContainer>
  );
};

export default AIReport;
