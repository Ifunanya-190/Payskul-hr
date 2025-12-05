import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import VerifyOTP from './components/VerifyOTP';
import Dashboard from './components/Dashboard';  // Make sure this is imported
import Profile from './components/Profile';  // <-- Add this
import Document from './components/Document';
import Teams from './components/Teams';
import TeamDetail from './components/TeamDetail';
import EmployeeProfile from './components/EmployeeProfile';
import CompanyGuides from './components/CompanyGuides';
import SettingsPage from './components/SettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/documents" element={<Document/>} />
        <Route path="/teams" element={<Teams/>} />
        <Route path="/team-detail" element={<TeamDetail />} />
        <Route path="/employee-profile" element={<EmployeeProfile />} />
        <Route path="/guides" element={<CompanyGuides/>} />
        <Route path="/settings" element={<SettingsPage/>} />
      </Routes>
    </Router>
  );
}
export default App;