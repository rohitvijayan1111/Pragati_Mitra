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
    const fetchLockStatus = async () => {
      try {
        const response = await axios.post('http://localhost:3000/tables/getlocktablestatus', { id: form.id, table: 'form_locks' });
        setLockedstatus(response.data.is_locked);
      } catch (error) {
        console.error('Error fetching lock status:', error);
        notifyFailure(error.response.data.error || 'Error fetching record');
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/tables/gettable', { table: table, department: dept });
        setData(response.data.data);
        setOriginalData(response.data.data);
        setAttributenames(Object.keys(response.data.columnDataTypes));
        setAttributeTypes({
          ...response.data.columnDataTypes,
          ...{ 'document': 'file', 'website_link': 'link' }
        });
      } catch (err) {
        if (err.response && err.response.data) {
          notifyFailure(err.response.data);
        } else {
          notifyFailure('Something went wrong');
        }
        setData([]);
        setAttributenames([]);
        setAttributeTypes([]);
      }
    };

    fetchLockStatus();
    fetchData();
  }, [dept]);

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
          <button type="button" onClick={resetSearch} className="bttreset">Reset</button>
        </div>

        {role === "IQAC" && <div className="col">
          <button type="button" onClick={handleLock} className="bttlock">{!lockedstatus ? "Lock Form" : "Unlock Form"}</button>
        </div>}

        {role === 'hod' && <div className="col">
          <button type="button" onClick={handleAdd} className="search-button">Add Records</button>
        </div>}
        <div className="col">
          <button type="button" onClick={()=>{}} className="bttexport">Import Excel</button>
        </div>
        <div className="col">
                  <button type="button" onClick={()=>{}} className="bttexport">Import DB</button>
        
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
