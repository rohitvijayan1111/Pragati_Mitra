import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import styled from 'styled-components';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // For table generation

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  font-family: Arial, sans-serif;
`;

const Heading = styled.h1`
  text-align: center;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const CheckBox = styled.input`
  margin-right: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 15px 32px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(2px);
  }
`;

const PrintButton = styled(Button)`
  background-color: #4CAF50;
  color: white;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #3e8e41;
  }
`;

const ExportButton = styled(Button)`
  background-color: #2196F3;
  color: white;

  &:hover {
    background-color: #1976D2;
  }

  &:active {
    background-color: #1565C0;
  }
`;

const ViewButton = styled(Button)`
  background-color: #FFC107;
  color: white;

  &:hover {
    background-color: #FFB300;
  }

  &:active {
    background-color: #FFA000;
  }
`;

const ReportGenerator = () => {
  const [tables, setTables] = useState([]);
  const [selectedTables, setSelectedTables] = useState([]);
  const [columns, setColumns] = useState({});
  const [selectedColumns, setSelectedColumns] = useState({});
  const [columnRenames, setColumnRenames] = useState({});
  const [tableTitles, setTableTitles] = useState({});
  const [limit, setLimit] = useState(10);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [reportData, setReportData] = useState(null);
  const [pdfBlob, setPdfBlob] = useState(null); // New state for PDF Blob
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/reports/tables')
      .then(response => response.json())
      .then(data => setTables(data))
      .catch(error => console.error('Error fetching tables:', error));
  }, []);

  const handleTableChange = (event) => {
    const tableName = event.target.value;
    setSelectedTables(prevTables =>
      prevTables.includes(tableName)
        ? prevTables.filter(table => table !== tableName)
        : [...prevTables, tableName]
    );
    if (tableName && !columns[tableName]) {
      fetch(`http://localhost:3000/reports/columns/${tableName}`)
        .then(response => response.json())
        .then(data => setColumns(prev => ({ ...prev, [tableName]: data })))
        .catch(error => console.error('Error fetching columns:', error));
    }
  };

  const handleColumnSelection = (table, column, isSelected) => {
    setSelectedColumns(prev => ({
      ...prev,
      [table]: isSelected
        ? [...(prev[table] || []), column]
        : (prev[table] || []).filter(col => col !== column)
    }));
  };

  const handleColumnRename = (table, column, newName) => {
    setColumnRenames(prev => ({
      ...prev,
      [table]: {
        ...(prev[table] || {}),
        [column]: newName
      }
    }));
  };

  const handleTableTitleChange = (table, newTitle) => {
    setTableTitles(prev => ({
      ...prev,
      [table]: newTitle
    }));
  };

  const handleGenerateReport = async () => {
    setLoading(true);
    setError(null);
    const filters = {
      limit,
      dateRange,
      dateColumn: 'createdAt'
    };

    const payload = {
      tables: selectedTables.map(table => ({
        name: table,
        columns: selectedColumns[table] || []
      })),
      filters
    };

    try {
      const response = await fetch('http://localhost:3000/reports/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      setReportData(data);
      return data;
    } catch (error) {
      setError('Failed to fetch report data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = async (e) => {
    e.preventDefault(); 
    const data = await handleGenerateReport(); // Wait until the report data is fetched
    if (data) {
      const doc = new jsPDF();
      data.forEach((result, index) => {
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const titleText = tableTitles[result.table] || result.table;
        
        doc.setFontSize(16);
        const textWidth = doc.getStringUnitWidth(titleText) * doc.internal.scaleFactor;
        const textHeight = 16; // Approximate text height for font size 16
        const xOffset = (pageWidth - textWidth) / 2;
        const yOffset = 20; // Distance from the top of the page
        
        // Add centered title text
        doc.text(titleText, xOffset, yOffset);
        
        doc.setFontSize(12);
        doc.autoTable({
          head: [result.columns.map(col => columnRenames[result.table]?.[col] || col)],
          body: result.data.map(row => result.columns.map(column => row[column])),
          startY: doc.autoTable.previous ? doc.autoTable.previous.finalY + 10 : yOffset + 10,
          theme: 'striped',
          margin: { top: yOffset + 20 },
        });
        
        if (index < data.length - 1) {
          doc.addPage();
        }
      });
      const pdfOutput = doc.output('blob');
      setPdfBlob(pdfOutput); // Save the PDF Blob in state
      doc.save('report.pdf');
    }
  };
  
  const handleViewPDF = () => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      window.open(url, '_blank'); // Open the PDF in a new tab
    }
  };

  const handleExport = (e) => {
    e.preventDefault(); // Prevent form submission
    if (reportData) {
      const ws = XLSX.utils.json_to_sheet(
        reportData.flatMap(result => result.data.map(row => ({
          ...row,
          Table: tableTitles[result.table] || result.table
        })))
      );
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Monthly Report');
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Monthly_Report.xlsx');
    }
  };

  return (
    <Container>
      <Heading>Generate Report</Heading>
      <form>
        <FormGroup>
          <Label>Select Tables:</Label>
          <Select multiple value={selectedTables} onChange={handleTableChange}>
            {tables.map(table => (
              <option key={table} value={table}>
                {table}
              </option>
            ))}
          </Select>
        </FormGroup>

        {selectedTables.map(table => (
          <div key={table}>
            <FormGroup>
              <Label>Table Title:</Label>
              <Input
                type="text"
                value={tableTitles[table] || table}
                onChange={(e) => handleTableTitleChange(table, e.target.value)}
              />
            </FormGroup>
            {columns[table] && (
              <div>
                {columns[table].map(column => (
                  <FormGroup key={column}>
                    <Label>
                      <CheckBox
                        type="checkbox"
                        checked={selectedColumns[table]?.includes(column) || false}
                        onChange={(e) => handleColumnSelection(table, column, e.target.checked)}
                      />
                      {column}
                    </Label>
                    <Input
                      type="text"
                      placeholder="Rename column"
                      value={columnRenames[table]?.[column] || ''}
                      onChange={(e) => handleColumnRename(table, column, e.target.value)}
                    />
                  </FormGroup>
                ))}
              </div>
            )}
          </div>
        ))}

        <FormGroup>
          <Label>Limit:</Label>
          <Input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Date Range:</Label>
          <Input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          />
          <Input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          />
        </FormGroup>

        <ButtonContainer>
          <PrintButton onClick={handlePrint}>Print Report</PrintButton>
          <ExportButton onClick={handleExport}>Export to Excel</ExportButton>
          <ViewButton onClick={handleViewPDF}>View PDF</ViewButton>
        </ButtonContainer>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </Container>
  );
};

export default ReportGenerator;
