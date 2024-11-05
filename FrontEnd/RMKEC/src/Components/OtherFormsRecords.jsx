import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import { BsPencilSquare, BsFillTrashFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { utils, writeFile } from 'xlsx';
import './OtherFormsRecords.css';
import { getTokenData } from '../Pages/authUtils';
function OtherFormsRecords() {
  const navigate = useNavigate();
  const location = useLocation();
  const { form } = location.state;
  console.log(form);
  const [table] = useState(form.form_table_name);
  const tokendata = getTokenData();
  const role = tokendata.role;
  const [dept, setDept] = useState(role === "hod" ? tokendata.department : "All");
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [attributenames, setAttributenames] = useState([]);
  const [lockedstatus, setLockedstatus] = useState('');
  const [searchColumn, setSearchColumn] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [attributeTypes, setAttributeTypes] = useState({ 'document': 'file', 'website_link': 'link', 'related_link': 'link' });
  const server_data = [
    {
      "Club_activities": {
        dummyData: [
          {
            "id": 1,
            "title": "Coding Clubing",
            "createdAt": "2024-01-15T10:00:00Z",
            "deadline": "2024-02-01T17:00:00Z",
            "status": "ongoing",
            "dept": "Science"
          },
          {
            "id": 2,
            "title": "Mathematics Club",
            "createdAt": "2024-03-10T09:30:00Z",
            "deadline": "2024-04-05T16:00:00Z",
            "status": "completed",
            "dept": "Electronics and communication engineering"
          },
          {
            "id": 3,
            "title": "Astronomy Club",
            "createdAt": "2024-05-22T14:00:00Z",
            "deadline": "2024-06-15T18:00:00Z",
            "status": "pending",
            "dept": "Information Technology"
          }
        ],
        attributenames: ["id", "title", "createdAt", "deadline", "status", "dept"],
        attributeTypes: {
          'id': 'number',
          'title': 'text',
          'createdAt': 'date',
          'deadline': 'date',
          'status': 'enum',
          'dept': 'text'
        }
      }
    },
    {
      "Industrial_visits": {
        dummyData: [
          {
            "department": "Science",
            "Year": "2024",
            "Section": "A",
            "Total No of students": 30,
            "No of students visited": 25,
            "Name of the company/Industry": "Tech Innovations",
            "Proposed date of visit": "2024-02-10",
            "Completed (Yes/No)": "Yes",
            "Actual Date Visited": "2024-02-12",
            "Uploaded In Website (Yes/No)": "Yes",
            "website link": "http://techinnovations.com",
            "document": "visit_report_tech_innovations.pdf",
            "createdAt": "2024-01-10T09:00:00Z"
          },
          {
            "department": "Electronics and communication engineering",
            "Year": "2024",
            "Section": "B",
            "Total No of students": 40,
            "No of students visited": 35,
            "Name of the company/Industry": "ElectroCorp",
            "Proposed date of visit": "2024-03-15",
            "Completed (Yes/No)": "No",
            "Actual Date Visited": null,
            "Uploaded In Website (Yes/No)": "No",
            "website link": null,
            "document": null,
            "createdAt": "2024-02-20T11:00:00Z"
          },
          {
            "department": "Information Technology",
            "Year": "2024",
            "Section": "C",
            "Total No of students": 25,
            "No of students visited": 20,
            "Name of the company/Industry": "InfoTech Solutions",
            "Proposed date of visit": "2024-04-20",
            "Completed (Yes/No)": "Yes",
            "Actual Date Visited": "2024-04-22",
            "Uploaded In Website (Yes/No)": "Yes",
            "website link": "http://infotechsolutions.com",
            "document": "visit_report_infotech_solutions.pdf",
            "createdAt": "2024-03-05T14:00:00Z"
          }
        ],
        attributenames: ["department", "Year", "Section", "Total No of students", "No of students visited", "Name of the company/Industry", "Proposed date of visit", "Completed (Yes/No)", "Actual Date Visited", "Uploaded In Website (Yes/No)", "website link", "document", "createdAt"],
        attributeTypes: {
          'department': 'text',
          'Year': 'text',
          'Section': 'text',
          'Total No of students': 'number',
          'No of students visited': 'number',
          'Name of the company/Industry': 'text',
          'Proposed date of visit': 'date',
          'Completed (Yes/No)': 'enum',
          'Actual Date Visited': 'date',
          'Uploaded In Website (Yes/No)': 'enum',
          'website link': 'text',
          'document': 'text',
          'createdAt': 'date'
        }
      }
    },
    {
      "Emerging_technologies": {
        dummyData: [
          {
            "id": 1,
            "department": "Computer Science",
            "emerging_technology": "Artificial Intelligence",
            "topic": "Machine Learning and Neural Networks",
            "International recognized certification authority with address": "AI Certification Institute, 123 Tech Lane, Silicon Valley, CA",
            "duration": "6 months",
            "start_date": "2024-01-15",
            "end_date": "2024-07-15",
            "faculty_name(1-60 intake,2-120 intake,3-180 intake)": "Dr. John Smith",
            "status": "ongoing",
            "amount_received_rs": "50000",
            "activities_conducted": "Workshops, hands-on sessions, guest lectures",
            "document": "ai_certification_program.pdf",
            "createdAt": "2024-01-10T09:00:00Z"
          },
          {
            "id": 2,
            "department": "Electronics Engineering",
            "emerging_technology": "Quantum Computing",
            "topic": "Introduction to Quantum Mechanics and Quantum Algorithms",
            "International recognized certification authority with address": "Quantum Institute, 456 Quantum Road, Quantum City, TX",
            "duration": "3 months",
            "start_date": "2024-02-01",
            "end_date": "2024-05-01",
            "faculty_name(1-60 intake,2-120 intake,3-180 intake)": "Dr. Alice Johnson",
            "status": "completed",
            "amount_received_rs": "30000",
            "activities_conducted": "Seminars, lab sessions, certification exam",
            "document": "quantum_computing_certification.pdf",
            "createdAt": "2024-01-20T10:00:00Z"
          },
          {
            "id": 3,
            "department": "Information Technology",
            "emerging_technology": "Blockchain Technology",
            "topic": "Blockchain Basics and Smart Contracts",
            "International recognized certification authority with address": "Blockchain Academy, 789 Chain Street, Crypto Town, NY",
            "duration": "4 months",
            "start_date": "2024-03-01",
            "end_date": "2024-07-01",
            "faculty_name(1-60 intake,2-120 intake,3-180 intake)": "Dr. Bob Lee",
            "status": "not started",
            "amount_received_rs": "20000",
            "activities_conducted": "Introductory lectures, workshops",
            "document": "blockchain_technology_program.pdf",
            "createdAt": "2024-02-01T11:00:00Z"
          }
        ],
        attributenames: ["id", "department", "emerging_technology", "topic", "International recognized certification authority with address", "duration", "start_date", "end_date", "faculty_name(1-60 intake,2-120 intake,3-180 intake)", "status", "amount_received_rs", "activities_conducted", "document", "createdAt"],
        attributeTypes: {
          'id': 'number',
          'department': 'text',
          'emerging_technology': 'text',
          'topic': 'text',
          'International recognized certification authority with address': 'text',
          'duration': 'text',
          'start_date': 'date',
          'end_date': 'date',
          'faculty_name(1-60 intake,2-120 intake,3-180 intake)': 'text',
          'status': 'text',
          'amount_received_rs': 'text',
          'activities_conducted': 'text',
          'document': 'text',
          'createdAt': 'date'
        }
      }
    }
  ];
  
  
  const notifyFailure = (error) => {
    toast.error(error, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
    });
  };

  useEffect(() => {
    if (role === "IQAC") {
      setDept('All');
    }
  
    const fetchData = async () => {
      try {
        // Match the correct form data from server_data based on table name
        const formData = server_data.find(item => item[form.form_table_name]);
        if (formData) {
          const formContent = formData[form.form_table_name];
          // Set the data, attribute names, and attribute types
          setData(formContent.dummyData);
          setOriginalData(formContent.dummyData);
          setAttributenames(formContent.attributenames);
          setAttributeTypes(formContent.attributeTypes);
        } else {
          throw new Error('Form data not found');
        }
      } catch (err) {
        if (err.response && err.response.data) {
          notifyFailure(err.response.data);
        } else {
          notifyFailure('Something went wrong');
        }
        setData([]);
        setAttributenames([]);
        setAttributeTypes({});
      }
    };
  
    fetchData();
  }, [dept, form.form_table_name, role]);
  

  const handleEdit = (attributenames, item) => {
    if (lockedstatus) {
      toast.error('Form is locked. You cannot edit records.', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
      return;
    }
    navigate("edit-form", { state: { table, attributenames, attributeTypes, item, formId: form.id } });
  };

  const handleAdd = () => {
    if (lockedstatus) {
      toast.error('Form is locked. You cannot add records.', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
      return;
    }
    navigate("add-form", { state: { table, attributenames, attributeTypes, formId: form.id } });
  };

  const handleLock = async () => {
    Swal.fire({
      title: 'Do you want to change the lock status of this form?',
      showCancelButton: true,
      confirmButtonText: lockedstatus ? 'Unlock' : 'Lock',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post('http://localhost:3000/tables/locktable', { id: form.id, lock: !lockedstatus });
          setLockedstatus(!lockedstatus);
          Swal.fire(`${lockedstatus ? 'Unlocked' : 'Locked'}!`, '', 'success');
        } catch (error) {
          console.error('Error locking form:', error);
          notifyFailure(error.response.data);
          Swal.fire('Error!', 'There was an error changing the lock status', 'error');
        }
      }
    });
  };

  const handleDelete = async (id) => {
    if (lockedstatus) {
      toast.error('Form is locked. You cannot delete records.', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete('http://localhost:3000/tables/deleterecord', { data: { id, table } });
          setData(prevData => prevData.filter((item) => item.id !== id));
          setOriginalData(prevData => prevData.filter((item) => item.id !== id));
          Swal.fire("Deleted!", "Your record has been deleted.", "success");
        } catch (error) {
          console.error('Error deleting item:', error);
          notifyFailure(error.response.data);
          Swal.fire('Error!', 'There was an error deleting the record', 'error');
        }
      }
    });
  };

  const formatColumnName = (name) => {
    return name.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  const formatDate = (date) => {
    return dayjs(date).format('DD/MM/YYYY');
  };

  const handleSearch = () => {
    if (!searchColumn || !searchValue) {
      notifyFailure('Please select a column and enter a search value.');
      return;
    }

    const filteredData = originalData.filter(item => {
      const value = item[searchColumn] ? item[searchColumn].toString().toLowerCase() : '';

      if (attributeTypes[searchColumn] === 'date') {
        const formattedDate = dayjs(item[searchColumn]).format('DD/MM/YYYY');
        return formattedDate.includes(searchValue.toLowerCase());
      }

      return value.includes(searchValue.toLowerCase());
    });

    setData(filteredData);
  };

  const resetSearch = () => {
    setData(originalData);
    setSearchColumn('');
    setSearchValue('');
  };

  const exportToExcel = () => {
    const filteredData = data.map(item => {
      const { id, ...filteredItem } = item;
      return filteredItem;
    });

    const ws = utils.json_to_sheet(filteredData);
    const wb = utils.book_new();
    const sheetName = `${table}Data`;
    const fileName = `${sheetName}.xlsx`;

    utils.book_append_sheet(wb, ws, sheetName);

    writeFile(wb, fileName);
  };

  return (
    <div className="container">
      <h1>{form.form_title}</h1>
      <div className="row mb-3">
        <div className="col">
          <button type="button" onClick={exportToExcel} className="bttexport">Export to Excel</button>
        </div>

        <div className="col">
          <select className="custom-select" value={searchColumn} onChange={(e) => setSearchColumn(e.target.value)}>
            <option value="">Select Column to Search</option>
            {attributenames.map((name, index) => (
              <option key={index} value={name}>{formatColumnName(name)}</option>
            ))}
          </select>
        </div>

        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Enter search value"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="col">
          <button type="button" onClick={handleSearch} className="search-button">Search</button>
          
        </div>
        <button type="button" onClick={resetSearch} className="bttreset">Reset</button>
        {role === "IQAC" && <div className="col">
          <button type="button" onClick={handleLock} className="bttlock">{!lockedstatus ? "Lock Form" : "Unlock Form"}</button>
        </div>}

        {role === 'hod' && <div className="col">
          <button type="button" onClick={handleAdd} className="search-button">Add Records</button>
        </div>}
        <div className="col">
          <button type="button" onClick={()=>{toast.info('This feature is currently being built', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom
    });}} className="bttexport">Import Excel</button>
        </div>
        <div className="col">
                  <button type="button" onClick={()=>{toast.info('This feature is currently being built', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom
    });}} className="bttexport">Import DB</button>
        
        </div>
        <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="exampleDropdown" className="form-label">Select Version Control</label>
          <select id="exampleDropdown" className="form-select" onChange={()=>{toast.info('This feature is currently being built', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom
    });}}>
            <option value="" disabled>Select Version Control</option>
            <option value="option1">V1</option>
            <option value="option2">V2</option>
            <option value="option3">V3</option>
          </select>
        </div>
      </div>
    </div>
      </div>

      {data && (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
            <tr>
            {role === "hod" && <th rowSpan="2" className="fixed-column">Action</th>}
            {attributenames && attributenames.map((name, index) => (
              name === "id" ? <th rowSpan="2" key={index}>S.No</th> :
              name === "createdAt" ? <th rowSpan="2" key={index}>Updated At</th> :
              name === "company_details" ? (
                <>
                  <th  colSpan="3" key={index}>Company Details</th>
                </>
              ) : (
                <th rowSpan="2" key={index}>{formatColumnName(name)}</th>
              )
            ))}
          </tr>
          <tr>
            {attributenames && attributenames.map((name, index) => (
              name === "company_details" ? (
                <>
                  <th key={`${index}-sub1`}>Company Name</th>
                  <th key={`${index}-sub2`}>Salary Offered</th>
                  <th key={`${index}-sub3`}>No.Of Students Placed</th>
                </>
              ) : (
                <></>// Empty cell for non-"company_details" columns in the second row
              )
            ))}
          </tr>

            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  {role === "hod" &&
                    <td>
                      <IconContext.Provider value={{ className: 'react-icons' }}>
                        <div className="icon-container">
                          <BsPencilSquare onClick={() => handleEdit(attributenames, item)} className="edit-icon" />
                          <BsFillTrashFill onClick={() => handleDelete(item.id)} className="delete-icons" />
                        </div>
                      </IconContext.Provider>
                    </td>
                  }
                  {attributenames.map((name, attrIndex) => (
                    name === "id" ? <td key={attrIndex}>{index + 1}</td> :
                    name === "company_details" ? (
                      <>
                        {item.companyDetails && item.companyDetails.map((company, idx) => (
                          <React.Fragment key={idx}>
                            <td>{company.company_name}</td>
                            <td>{company.salary_offered}</td>
                            <td>{company.no_of_students_placed}</td>
                          </React.Fragment>
                        ))}
                      </>
                    ) :
                    <td key={attrIndex}>
                      {attributeTypes[name] === "date" ? formatDate(item[name]) :
                       attributeTypes[name] === "timestamp" ? dayjs(item[name]).format('HH:mm DD/MM/YYYY') :
                       (name === "website_link" || name === "website link" || name === "Website_Link" || name === "related_link") && item[name] ?
                         <a href={item[name]} target="_blank" rel="noopener noreferrer">Link</a>
                         : attributeTypes[name] === "file" ? (
                           <a href={`http://localhost:3000/${item.document}`} target="_blank" rel="noopener noreferrer">
                             View
                           </a>
                         ) : item[name]
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default OtherFormsRecords;
