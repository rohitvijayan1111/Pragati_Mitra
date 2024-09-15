import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentAchievementTable = () => {
  const studentsData = [
    {
      comment: 'Excellent performance throughout the year.',
      topPerformer: 'John Doe',
      awards: 'Best Student Award, Excellence in Research',
      scholarships: 'Merit Scholarship, Dean’s Scholarship',
      publications: 'Research Paper on AI, Journal of Computer Science',
      competitionsWon: '1st Place in National Coding Contest',
      internships: 'Internship at XYZ Corp.',
      projects: 'AI-based Chatbot, Web Application for Data Analysis',
      sports: 'Gold Medal in National Track Meet'
    },
    {
      comment: 'Outstanding contributions in academic and extracurricular activities.',
      topPerformer: 'Jane Smith',
      awards: 'Leadership Award, Top Scholar Award',
      scholarships: 'National Scholarship, Excellence Award',
      publications: 'Article on Machine Learning, Tech Innovations Journal',
      competitionsWon: '2nd Place in Regional Math Olympiad',
      internships: 'Internship at ABC Ltd.',
      projects: 'Blockchain-based Voting System, Data Visualization Tool',
      sports: 'Silver Medal in State Basketball Championship'
    },
    // Add more student data as needed
  ];

  return (
    <div className="container mt-3">
      <h2>Student Achievements</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Comment about Institution's Student</th>
            <th>Academic Top Performer</th>
            <th>Awards Received by Students</th>
            <th>Scholarships Received by Students</th>
            <th>Research Publications</th>
            <th>Competitions Won</th>
            <th>Internships</th>
            <th>Projects Achieved</th>
            <th>Sports Achievements</th>
          </tr>
        </thead>
        <tbody>
          {studentsData.map((student, index) => (
            <tr key={index}>
              <td>{student.comment}</td>
              <td>{student.topPerformer}</td>
              <td>{student.awards}</td>
              <td>{student.scholarships}</td>
              <td>{student.publications}</td>
              <td>{student.competitionsWon}</td>
              <td>{student.internships}</td>
              <td>{student.projects}</td>
              <td>{student.sports}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentAchievementTable;
