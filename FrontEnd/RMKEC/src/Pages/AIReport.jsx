import React from 'react';
import styled from 'styled-components';

const ReportContainer = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Section = styled.section`
  margin-bottom: 20px;
`;

const Heading = styled.h2`
  font-size: 1.5em;
  border-bottom: 2px solid #ddd;
  padding-bottom: 5px;
`;

const SubHeading = styled.h3`
  font-size: 1.2em;
  color: #555;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const List = styled.ul`
  margin: 0;
  padding-left: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  font-size: 1em;
  line-height: 1.6;
`;

const AIReport = () => {
  return (
    <ReportContainer>
      <h1>XYZ College Annual AI Report</h1>

      <Section>
        <Heading>Curricular Design and Academic Performances</Heading>

        <SubHeading>List of Courses Offered</SubHeading>
        <List>
          <ListItem><strong>Undergraduate Programs:</strong> Computer Science, Electrical Engineering, Mechanical Engineering, Civil Engineering, Business Administration</ListItem>
          <ListItem><strong>Postgraduate Programs:</strong> MBA, M.Tech in Computer Science, M.Sc in Data Science, M.A in Economics</ListItem>
          <ListItem><strong>Diploma Courses:</strong> Web Development, Digital Marketing</ListItem>
        </List>

        <SubHeading>Overall and Department-wise Faculty Count and Faculty-Student Ratios</SubHeading>
        <List>
          <ListItem><strong>Overall Faculty Count:</strong> 150</ListItem>
          <ListItem><strong>Overall Student Count:</strong> 1800</ListItem>
          <ListItem><strong>Faculty-Student Ratio:</strong> 1:12</ListItem>
        </List>
        <List>
          <ListItem><strong>Computer Science:</strong> 40 faculty, 500 students, Ratio 1:12.5</ListItem>
          <ListItem><strong>Electrical Engineering:</strong> 30 faculty, 400 students, Ratio 1:13.3</ListItem>
          <ListItem><strong>Mechanical Engineering:</strong> 35 faculty, 450 students, Ratio 1:12.9</ListItem>
          <ListItem><strong>Civil Engineering:</strong> 25 faculty, 300 students, Ratio 1:12</ListItem>
          <ListItem><strong>Business Administration:</strong> 20 faculty, 150 students, Ratio 1:7.5</ListItem>
        </List>

        <SubHeading>Summary of Academic Performance</SubHeading>
        <Paragraph>The academic performance of XYZ College has been commendable, with a focus on enhancing both teaching methodologies and student learning experiences.</Paragraph>

        <SubHeading>Overall Pass and Fail Percentage</SubHeading>
        <List>
          <ListItem><strong>Overall Pass Percentage:</strong> 92%</ListItem>
          <ListItem><strong>Overall Fail Percentage:</strong> 8%</ListItem>
        </List>

        <SubHeading>Department-wise Pass and Fail Percentage</SubHeading>
        <List>
          <ListItem><strong>Computer Science:</strong> Pass 95%, Fail 5%</ListItem>
          <ListItem><strong>Electrical Engineering:</strong> Pass 90%, Fail 10%</ListItem>
          <ListItem><strong>Mechanical Engineering:</strong> Pass 92%, Fail 8%</ListItem>
          <ListItem><strong>Civil Engineering:</strong> Pass 88%, Fail 12%</ListItem>
          <ListItem><strong>Business Administration:</strong> Pass 95%, Fail 5%</ListItem>
        </List>

        <SubHeading>Average CGPA of Students</SubHeading>
        <Paragraph><strong>Overall Average CGPA:</strong> 7.8/10</Paragraph>

        <SubHeading>Graduation Rate of College</SubHeading>
        <Paragraph><strong>Overall Graduation Rate:</strong> 85%</Paragraph>

        <SubHeading>Guest Lectures Organized</SubHeading>
        <List>
          <ListItem><strong>Total Guest Lectures:</strong> 50</ListItem>
          <ListItem><strong>Notable Speakers:</strong> Dr. Rajesh Kumar (AI Expert), Ms. Priya Sharma (Entrepreneurship Guru)</ListItem>
        </List>

        <SubHeading>Department-wise Industrial Visits Organized</SubHeading>
        <List>
          <ListItem><strong>Computer Science:</strong> 10 visits</ListItem>
          <ListItem><strong>Electrical Engineering:</strong> 8 visits</ListItem>
          <ListItem><strong>Mechanical Engineering:</strong> 7 visits</ListItem>
          <ListItem><strong>Civil Engineering:</strong> 6 visits</ListItem>
          <ListItem><strong>Business Administration:</strong> 5 visits</ListItem>
        </List>

        <SubHeading>University Rank Holders</SubHeading>
        <List>
          <ListItem><strong>Amit Patel:</strong> Computer Science, Rank 1</ListItem>
          <ListItem><strong>Neha Gupta:</strong> Electrical Engineering, Rank 2</ListItem>
          <ListItem><strong>Siddharth Rao:</strong> Mechanical Engineering, Rank 3</ListItem>
        </List>
      </Section>

      <Section>
        <Heading>Research Works & Publications</Heading>

        <SubHeading>Institution Research Strategy and Summary</SubHeading>
        <Paragraph>XYZ College focuses on research that aligns with industry needs and global challenges, with an emphasis on innovation and practical applications.</Paragraph>

        <SubHeading>Total Funds Received</SubHeading>
        <Paragraph><strong>Total Research Funds:</strong> $2.5 Million</Paragraph>

        <SubHeading>Major Grants & Scholarships</SubHeading>
        <List>
          <ListItem><strong>Major Grants:</strong> $1.5 Million from National Research Foundation</ListItem>
          <ListItem><strong>Scholarships:</strong> $500,000 for research scholars</ListItem>
        </List>

        <SubHeading>List of Ongoing Research Projects</SubHeading>
        <List>
          <ListItem><strong>Project 1:</strong> AI for Healthcare (Lead: Dr. Anil Verma)</ListItem>
          <ListItem><strong>Project 2:</strong> Sustainable Energy Solutions (Lead: Dr. Sunita Mehta)</ListItem>
        </List>

        <SubHeading>List of Journal Papers Published</SubHeading>
        <List>
          <ListItem><strong>Total Papers Published:</strong> 40</ListItem>
          <ListItem><strong>Notable Journals:</strong> IEEE Transactions, Journal of Applied Physics</ListItem>
        </List>

        <SubHeading>List of Patents Granted</SubHeading>
        <Paragraph><strong>Patents:</strong> 5 patents granted for innovations in AI and renewable energy.</Paragraph>

        <SubHeading>Training Programmes Offered</SubHeading>
        <List>
          <ListItem><strong>Total Training Programs:</strong> 15</ListItem>
          <ListItem><strong>Topics:</strong> Data Analytics, Machine Learning, Renewable Energy</ListItem>
        </List>
      </Section>

      <Section>
        <Heading>Faculty Achievement</Heading>

        <SubHeading>List of Faculties – Department-wise</SubHeading>
        <List>
          <ListItem><strong>Computer Science:</strong> 40 faculty members</ListItem>
          <ListItem><strong>Electrical Engineering:</strong> 30 faculty members</ListItem>
          <ListItem><strong>Mechanical Engineering:</strong> 35 faculty members</ListItem>
          <ListItem><strong>Civil Engineering:</strong> 25 faculty members</ListItem>
          <ListItem><strong>Business Administration:</strong> 20 faculty members</ListItem>
        </List>

        <SubHeading>Awards Received</SubHeading>
        <List>
          <ListItem><strong>National Teaching Excellence Award:</strong> Dr. Anjali Patel</ListItem>
          <ListItem><strong>Best Research Paper Award:</strong> Dr. Vikram Singh</ListItem>
        </List>

        <SubHeading>Research Works – Projects and Publications</SubHeading>
        <List>
          <ListItem><strong>Total Projects:</strong> 12 major projects</ListItem>
          <ListItem><strong>Publications:</strong> 40 research papers</ListItem>
        </List>

        <SubHeading>Advanced Degree / Certifications</SubHeading>
        <List>
          <ListItem><strong>Ph.D. Degrees Earned:</strong> 10</ListItem>
          <ListItem><strong>Certifications:</strong> 20 professional certifications</ListItem>
        </List>

        <SubHeading>Leadership Roles</SubHeading>
        <Paragraph><strong>Positions Held:</strong> Heads of national committees, editorial boards of journals.</Paragraph>

        <SubHeading>Public Lectures</SubHeading>
        <List>
          <ListItem><strong>Total Lectures Given:</strong> 15</ListItem>
          <ListItem><strong>Notable Lectures:</strong> Keynote at International AI Conference</ListItem>
        </List>
      </Section>
    </ReportContainer>
  );
};

export default AIReport;
