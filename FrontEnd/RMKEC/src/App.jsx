import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes,Route,useLocation } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout';
import DashBoard from './Pages/DashBoard';
import LoginPage from './Pages/LoginPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import SignPage from './Pages/Signup';
import Guestlecture from "./Pages/Guestlecture";
import Facultydetails from "./Pages/Facultydetails";
import Coursecoverage from "./Pages/Coursecoverage";
import Sports from "./Pages/Sports";
import Achievements from "./Pages/Achievements";
import Clubactivities from "./Pages/Clubactivities";
import Placements from "./Pages/Placements";
import EmailNotification from "./Pages/EmailNotification";
import EditForm from "./Pages/EditForm";
import ViewForm from "./Pages/ViewForm";
import AddForm from "./Pages/AddForm";
import Dashboard_admin from "./Pages/Dashboard_admin";
import Daily_Attendance from "./Attendance_Component/Daily-Attendance";
import Edit_Entry from "./Attendance_Component/Edit_Entry";
import Attendance_Log from "./Attendance_Component/Attendance_Log";
import Todays_List from "./Attendance_Component/Todays_List";
import Attendance_Analysis from "./Attendance_Component/Attendance_Analysis";
import ViewOtherForms from "./Pages/ViewOtherForms";
import CreateNewForm from "./Pages/CreateNewForm";
import AddNewRecord from "./Pages/AddNewRecord";
import { ViewOtherFormRecord, EditOtherFormRecord } from "./Pages/ViewOtherFormRecord";
import Attendance_Dashboard from "./Attendance_Component/Attendance_DB_Dept";
import Hall_Request from "./HallBooking_Component/Hall_Request";
import Request_Status from "./HallBooking_Component/Request_Status";
import Past_Events from "./HallBooking_Component/Past_Events";
import Available_Halls from "./HallBooking_Component/Available_Halls";
import DashBoard_Hall from "./HallBooking_Component/DashBoard_Hall";
import Invalidpage from "./Pages/Invalidpage";
import IV from "./Pages/IV";
import OtherForms from "./Components/OtherForms";
import OtherFormsRecords from "./Components/OtherFormsRecords";
import ProtectedRoute from "./Pages/ProtectedRoute";
import GoogleTranslate from "./Components/GoogleTranslate";
import ReportGenerator from "./Pages/ReportGenerator";
import Academicperformance from "./Pages/Academicperformance";
import AcademicTable from "./Pages/AcademicTable";
import FacultyTable from "./Pages/FacultyTable";
import AddFacultyForm from "./Pages/AddFacultyForm";
import FinancialStatementForm from "./Pages/FinancialStatementForm";
import StudentAchievementForm from "./Pages/StudentAchievementForm";
import InfraForm from "./Pages/InfraForm";
import ReportGeneration from "./Pages/Reportgenaration";
import Documents from "./Pages/Reportgenaration";
import SetDeadlinePage from "./Components/SetDeadlinePage";
import DefaultLogin from "./Pages/DefaultLogin";
import StudentAchievementTable from "./Pages/StudentAchievementTable";
import InfraDataTable from "./Pages/InfraDataTable";
import FinancialStatementList from "./Pages/FinancialStatementList";
import AIReport from "./Pages/AIReport";
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className='app'>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<DefaultLogin />} />
            <Route path="/invalidpage" element={<Invalidpage />} />
            <Route path="/signup" element={<SignPage />} />
            <Route path="/dashboard/*" element={<Layout />}>
            <Route index element={<ProtectedRoute element={DashBoard} />} />
              <Route path="club-activity" element={<ProtectedRoute element={Clubactivities} />} />
              <Route path="mail" element={<ProtectedRoute element={EmailNotification} />} />
              <Route path="guest-lecture" element={<ProtectedRoute element={Guestlecture} />}/>
              <Route path="faculty-details" element={<Facultydetails />} />
              <Route path="course-coverage" element={<Coursecoverage />} />
              <Route path="sports" element={<Sports />} />
              <Route path="achievements" element={<Achievements />} />
              <Route path="iv" element={<IV />} />
              <Route path="academic-table" element={<AcademicTable/>} />
              <Route path="academic-table/academic" element={<Academicperformance/>} />
              <Route path="faculty-table" element={<FacultyTable/>} />
              <Route path="finance-table/financial-statement" element={<FinancialStatementForm/>} />
              <Route path="finance-table" element={<FinancialStatementList/>} />
              <Route path="faculty-table/add-faculty-details" element={<AddFacultyForm/>} />
              <Route path="Student-achievement" element={<StudentAchievementForm/>}/>
              <Route path="Student-achievement-table" element={<StudentAchievementTable/>}/>             
              <Route path="Infrastructure-table/Infrastructure" element={<InfraForm/>}/>
              <Route path="Infrastructure-table" element={<InfraDataTable/>}/>
              {/* <Route path="view-other-forms" element={<ViewOtherForms />} />
              <Route path="view-other-forms/new-form" element={<CreateNewForm/>} />
              <Route path="view-other-forms/new-record" element={<AddNewRecord />} />
              <Route path="view-other-forms/view-record" element={<ViewOtherFormRecord />} />
              <Route path="view-other-forms/view-record/edit-form-record" element={<EditOtherFormRecord />} /> */}
              <Route path="placements" element={<Placements/>} />
              <Route path="Daily-Attendance" element={<Daily_Attendance />} />
              <Route path="Edit-Entry" element={<Edit_Entry />} />
              <Route path="Attendance-Log" element={<Attendance_Log />} />
              <Route path="Todays-List" element={<Todays_List />} />
              <Route path="Attendance-Analysis" element={<Attendance_Analysis />} />
              <Route path="Attendance_DB_Dept" element={<Attendance_Dashboard/>} />
              <Route path="Hall-Request" element={<Hall_Request />} />
              <Route path="Request-Status" element={<Request_Status />} />
              <Route path="Past-Events" element={<Past_Events />} />
              <Route path="Available-Halls" element={<Available_Halls />} />
              <Route path="DashBoard-Hall" element={<DashBoard_Hall />} />
              <Route path="reports" element={<ReportGenerator/>} />
              <Route path="reports-generation" element={<Documents/>} />
              <Route path="forms" element={<OtherForms/>} />
              <Route path="AI-Report" element={<AIReport/>} />
              <Route path="forms/deadline" element={<SetDeadlinePage/>} />
              <Route path="forms/form-records" element={<OtherFormsRecords/>} />
              <Route path="forms/form-records/edit-form" element={<EditForm/>} />
              <Route path="forms/form-records/add-form" element={<AddForm />} />
              <Route path="forms/create-form" element={<CreateNewForm/>} />
              <Route path="faculty-details/edit-form" element={<EditForm/>} />
              <Route path="faculty-details/add-form" element={<AddForm />} />
              <Route path="*" element={<Invalidpage />} />
            </Route>
            <Route path="*" element={<Invalidpage />} />
          </Routes>
        </Router>
      </div>
    </LocalizationProvider>
  );
}

export default App;
