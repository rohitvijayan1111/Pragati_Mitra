import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Collapse, Checkbox, TextField } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import styled from 'styled-components';
import { ToastContainer, toast, Zoom } from 'react-toastify';


const sections = [
    'Message from Management',
    'Curricular Design and Academic Performances',
    'Research Works & Publications',
    'Faculty Achievement',
    'Student Achievements',
    'Financial Statements',
    'Infrastructural Development',
    'Extra Curricular Activities',
  ];
  
  const managementMessages = [
    "Chairperson's Message",
    "Principal's Message"
  ];
  
  const curricularDesignDetails = [
    'List of Courses Offered',
    'Overall and Department-wise Faculty Count and Faculty-Student Ratios',
    'Summary of Academic Performance',
    'Overall Pass and Fail Percentage',
    'Department-wise Pass and Fail Percentage',
    'Average CGPA of Students',
    'Graduation Rate of College',
    'Guest Lectures Organized',
    'Department-wise Industrial Visits Organized',
    'University Rank Holders'
  ];
  
  const researchWorkDetails = [
    'Institution Research Strategy and Summary',
    'Total Funds Received',
    'Major Grants & Scholarships',
    'List of Ongoing Research Projects',
    'List of Journal Papers Published',
    'List of Patents Grants',
    'Training Programmes Offered'
  ];
  
  const facultyAchievementDetails = [
    'List of Faculties Department-wise',
    'Awards Received',
    'Research Works  Projects and Publications',
    'Advanced Degree / Certifications',
    'Leadership Roles',
    'Public Lectures'
  ];
  
  const studentAchievementDetails = [
    'Top Performers in Academics',
    'Awards Received by Students',
    'Scholarships Received',
    'Competition Wins',
    'Internships',
    'Projects'
  ];
  
  const financialStatementsDetails = [
    'Income / Revenue Statement',
    'Expenditure',
    'Net Income Statement',
    'Investments'
  ];
  
  const infrastructureDevelopmentDetails = [
    'New Academic, Administrative & Residential Buildings Introduced',
    'Renovations & Upgradations',
    'Campus Expansion – Lands Purchase Statements',
    'Laboratories Inaugurated',
    'Equipment Purchase Statements',
    'Utility Improvements',
    'Sustainability & Green Campus Initializations'
  ];
  
  const extracurricularActivitiesDetails = [
    'List of Clubs & Societies Offered',
    'List of Cells / Committees',
    'List of Sports Available',
    'Workshops & Seminars for Students & Faculties',
    'Cultural Events'
  ];

const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #fff;
  background-color: #164863;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const StyledListItem = styled(ListItem)`
  cursor: pointer;
`;

const ListItemIconStyled = styled(ListItemIcon)`
  color: #007bff;
`;

const StyledButton = styled.button`
  text-align: center;
  padding: 12px 20px;
  background-color: #164863;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #0056b3;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
`;

// Main Component
const Documents = () => {
  const [openSections, setOpenSections] = useState({});
  const [checked, setChecked] = useState({});
  const [formData, setFormData] = useState({});

  const handleClick = (section) => {
    setOpenSections((prevOpenSections) => ({
      ...prevOpenSections,
      [section]: !prevOpenSections[section],
    }));
  };

  const handleCheck = (section, index) => {
    setChecked((prevChecked) => ({
      ...prevChecked,
      [`${section}-${index}`]: !prevChecked[`${section}-${index}`],
    }));
  };

  const handleInputChange = (section, index, event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [`${section}-${index}-${name}`]: value,
    }));
  };
  const notifysuccess = () => {
    toast.success('Report Generated!!!', {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
    });
  };
  const handleSubmit = () => {
    // File URL (relative to the server)
    const fileUrl = '/Custom_Report.pdf';
  
    // Notify user
    notifysuccess('Report Generated!!!');
  
    // Trigger file download
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'Custom_Report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  
  return (
    <Container>
      <Title>Add Record</Title>
      <List component="nav">
        {sections.map((section, index) => (
          <React.Fragment key={index}>
            <StyledListItem button onClick={() => handleClick(section)}>
              <ListItemIconStyled>
                {openSections[section] ? <ExpandLess /> : <ExpandMore />}
              </ListItemIconStyled>
              <ListItemText primary={section} />
            </StyledListItem>

            {/* Message from Management */}
            {section === 'Message from Management' && (
              <Collapse in={openSections[section]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {managementMessages.map((message, index) => (
                    <StyledListItem key={index} style={{ paddingLeft: '4em' }}>
                      <ListItemIconStyled>
                        <Checkbox
                          edge="start"
                          checked={checked[`management-${index}`] || false}
                          onChange={() => handleCheck('management', index)}
                        />
                      </ListItemIconStyled>
                      <ListItemText primary={message} />
                    </StyledListItem>
                  ))}
                </List>
              </Collapse>
            )}

            {/* Curricular Design and Academic Performances */}
            {section === 'Curricular Design and Academic Performances' && (
              <Collapse in={openSections[section]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {curricularDesignDetails.map((detail, index) => (
                    <React.Fragment key={index}>
                      <StyledListItem style={{ paddingLeft: '4em' }}>
                        <ListItemIconStyled>
                          <Checkbox
                            edge="start"
                            checked={checked[`curricularDesign-${index}`] || false}
                            onChange={() => handleCheck('curricularDesign', index)}
                          />
                        </ListItemIconStyled>
                        <ListItemText primary={detail} />
                      </StyledListItem>
                      {detail === 'Summary of Academic Performance' && (
                        <StyledListItem style={{ paddingLeft: '6em' }}>
                          <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            name="summary"
                            value={formData[`curricularDesign-${index}-summary`] || ''}
                            onChange={(e) => handleInputChange('curricularDesign', index, e)}
                          />
                        </StyledListItem>
                      )}
                      {detail === 'University Rank Holders' && (
                        <StyledListItem style={{ paddingLeft: '6em' }}>
                          <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            name="rankHolders"
                            value={formData[`curricularDesign-${index}-rankHolders`] || ''}
                            onChange={(e) => handleInputChange('curricularDesign', index, e)}
                          />
                        </StyledListItem>
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Collapse>
            )}

            {/* Research Works & Publications */}
            {section === 'Research Works & Publications' && (
              <Collapse in={openSections[section]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {researchWorkDetails.map((detail, index) => (
                    <React.Fragment key={index}>
                      <StyledListItem style={{ paddingLeft: '4em' }}>
                        <ListItemIconStyled>
                          <Checkbox
                            edge="start"
                            checked={checked[`researchWorks-${index}`] || false}
                            onChange={() => handleCheck('researchWorks', index)}
                          />
                        </ListItemIconStyled>
                        <ListItemText primary={detail} />
                      </StyledListItem>
                      {detail === 'Institution Research Strategy and Summary' && (
                        <StyledListItem style={{ paddingLeft: '6em' }}>
                          <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            name="researchStrategy"
                            value={formData[`researchWorks-${index}-researchStrategy`] || ''}
                            onChange={(e) => handleInputChange('researchWorks', index, e)}
                          />
                        </StyledListItem>
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Collapse>
            )}

            {/* Faculty Achievement */}
            {section === 'Faculty Achievement' && (
              <Collapse in={openSections[section]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {facultyAchievementDetails.map((detail, index) => (
                    <StyledListItem key={index} style={{ paddingLeft: '4em' }}>
                      <ListItemIconStyled>
                        <Checkbox
                          edge="start"
                          checked={checked[`facultyAchievement-${index}`] || false}
                          onChange={() => handleCheck('facultyAchievement', index)}
                        />
                      </ListItemIconStyled>
                      <ListItemText primary={detail} />
                    </StyledListItem>
                  ))}
                </List>
              </Collapse>
            )}

            {/* Student Achievements */}
            {section === 'Student Achievements' && (
              <Collapse in={openSections[section]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {studentAchievementDetails.map((detail, index) => (
                    <React.Fragment key={index}>
                      <StyledListItem style={{ paddingLeft: '4em' }}>
                        <ListItemIconStyled>
                          <Checkbox
                            edge="start"
                            checked={checked[`studentAchievements-${index}`] || false}
                            onChange={() => handleCheck('studentAchievements', index)}
                          />
                        </ListItemIconStyled>
                        <ListItemText primary={detail} />
                      </StyledListItem>
                      {detail === 'Top Performers in Academics' && (
                        <StyledListItem style={{ paddingLeft: '6em' }}>
                          <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            name="topPerformers"
                            value={formData[`studentAchievements-${index}-topPerformers`] || ''}
                            onChange={(e) => handleInputChange('studentAchievements', index, e)}
                          />
                        </StyledListItem>
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Collapse>
            )}

            {/* Financial Statements */}
            {section === 'Financial Statements' && (
              <Collapse in={openSections[section]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {financialStatementsDetails.map((detail, index) => (
                    <StyledListItem key={index} style={{ paddingLeft: '4em' }}>
                      <ListItemIconStyled>
                        <Checkbox
                          edge="start"
                          checked={checked[`financialStatements-${index}`] || false}
                          onChange={() => handleCheck('financialStatements', index)}
                        />
                      </ListItemIconStyled>
                      <ListItemText primary={detail} />
                    </StyledListItem>
                  ))}
                </List>
              </Collapse>
            )}

            {/* Infrastructural Development */}
            {section === 'Infrastructural Development' && (
              <Collapse in={openSections[section]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {infrastructureDevelopmentDetails.map((detail, index) => (
                    <StyledListItem key={index} style={{ paddingLeft: '4em' }}>
                      <ListItemIconStyled>
                        <Checkbox
                          edge="start"
                          checked={checked[`infrastructureDevelopment-${index}`] || false}
                          onChange={() => handleCheck('infrastructureDevelopment', index)}
                        />
                      </ListItemIconStyled>
                      <ListItemText primary={detail} />
                    </StyledListItem>
                  ))}
                </List>
              </Collapse>
            )}

            {/* Extra Curricular Activities */}
            {section === 'Extra Curricular Activities' && (
              <Collapse in={openSections[section]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {extracurricularActivitiesDetails.map((detail, index) => (
                    <StyledListItem key={index} style={{ paddingLeft: '4em' }}>
                      <ListItemIconStyled>
                        <Checkbox
                          edge="start"
                          checked={checked[`extracurricularActivities-${index}`] || false}
                          onChange={() => handleCheck('extracurricularActivities', index)}
                        />
                      </ListItemIconStyled>
                      <ListItemText primary={detail} />
                    </StyledListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
      <ButtonContainer>
        <StyledButton onClick={handleSubmit}>Generate PDF</StyledButton>
        <StyledButton onClick={handleSubmit}>Generate HTML</StyledButton>
      </ButtonContainer>
      <ToastContainer />
    </Container>
  );
};

export default Documents;
