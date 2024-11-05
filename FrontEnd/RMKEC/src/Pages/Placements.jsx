import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import { utils, writeFile } from 'xlsx';
import './Placements.css';

function Placements() {
  const navigate = useNavigate();
  const [table] = useState('Placement');
  const role = 'hod'; // Dummy role for testing
  const [dept, setDept] = useState(role === 'hod' ? 'Computer Science' : 'All');
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [attributenames, setAttributenames] = useState([]);
  const [lockedstatus, setLockedstatus] = useState(false);
  const [searchColumn, setSearchColumn] = useState('');
  const [searchValue, setSearchValue] = useState('');

  // Dummy data
  const dummyData = [
    { id: 1, name: 'John Doe', placement_date: '2024-06-01', company: 'ABC Corp', website_link: 'https://abc.com', document: 'resume.pdf' },
    { id: 2, name: 'Jane Smith', placement_date: '2024-07-15', company: 'XYZ Inc', website_link: 'https://xyz.com', document: 'portfolio.pdf' }
  ];

  const dummyColumnNames = ['id', 'name', 'placement_date', 'company', 'website_link', 'document'];

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

    // Set the dummy data
    setData(dummyData);
    setOriginalData(dummyData);
    setAttributenames(dummyColumnNames);
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
    navigate("edit-form", { state: { table, attributenames, item } });
  };

  const handleLock = async () => {
    Swal.fire({
      title: 'Do you want to change the lock status of this form?',
      showCancelButton: true,
      confirmButtonText: lockedstatus ? 'Unlock' : 'Lock',
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLockedstatus(!lockedstatus);
        Swal.fire(`${lockedstatus ? 'Unlocked' : 'Locked'}!`, '', 'success');
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
    }).then((result) => {
      if (result.isConfirmed) {
        setData(data.filter((item) => item.id !== id));
        Swal.fire("Deleted!", "Your record has been deleted.", "success");
      }
    });
  };

  const formatColumnName = (name) => {
    return name.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  const formatDate = (date) => {
    return dayjs(date).format('DD/MM/YYYY');
  };

  const attributeTypes = {
    'placement_date': 'date',
    'document': 'file'
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
    utils.book_append_sheet(wb, ws, 'PlacementsData');

    writeFile(wb, 'PlacementsData.xlsx');
  };

  const handlePreview = (table, documentPath) => {
    // Simulate file preview for the dummy data
    Swal.fire('Preview', `You clicked to preview ${documentPath}`, 'info');
  };

  return (
    <div className="container">
      <h1>{'Placements'}</h1>
      {data && (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                {attributenames && attributenames.map((name, index) => (
                  name === "id" ? <th key={index}>S.No</th> : (
                    <th key={index}>{formatColumnName(name)}</th>
                  )
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  {attributenames.map((name, attrIndex) => (
                    name === "id" ? <td key={attrIndex}>{index + 1}</td> :
                      <td key={attrIndex}>
                        {attributeTypes[name] === "date" ? formatDate(item[name]) : (
                          name === "website_link" && item[name] ?
                            <a href={item[name]} target="_blank" rel="noopener noreferrer">Link</a>
                            : attributeTypes[name] === "file" ? (
                              <button type="button" onClick={() => handlePreview(table, item[name])} className="view-button">Download</button>
                            ) : item[name]
                        )}
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

export default Placements;
