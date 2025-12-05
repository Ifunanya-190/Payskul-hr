import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profileHeader from "../assets/ProfileHeader.jpg";
import {
  Home, User, FileText, Users, Settings, Edit, Mail, Phone,
  Building, Calendar, MapPin, User as UserIcon, Heart,
  CreditCard, Users as UnitIcon, UserCheck, Hash, Bell,
  Menu, X, LogOut,
} from "lucide-react";

import logo from "../assets/logo.png";
import profile from "../assets/Profile.jpg";


const FormField = ({ label, field, type, placeholder, icon: Icon, options, isEditing, formData, handleInputChange }) => (
  <div className={type === "select" && options ? "mb-2" : "mb-3"}>
    <label className="text-xs text-gray-600 block mb-1">{label}</label>
    {isEditing ? (
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />}
        {type === "select" ? (
          <select
            value={formData[field] || ""}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className={`w-full border border-purple-300 rounded-lg p-2.5 text-sm ${Icon ? 'pl-10' : ''}`}
          >
            <option value="">{placeholder}</option>
            {options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={formData[field] || ""}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className={`w-full border border-purple-300 rounded-lg p-2.5 text-sm ${Icon ? 'pl-10' : ''}`}
            placeholder={placeholder}
          />
        )}
      </div>
    ) : (
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />}
        <div className={`w-full border border-gray-200 bg-gray-50 rounded-lg p-2.5 text-sm ${Icon ? 'pl-10' : ''} min-h-[42px] flex items-center`}>
          <span className={`${formData[field] ? 'text-gray-900' : 'text-gray-400'}`}>
            {formData[field] || placeholder}
          </span>
        </div>
      </div>
    )}
  </div>
);

// Tab Content Components
const PersonalInfoTab = ({ isMobile, isEditing, formData, handleInputChange }) => {
  const personalFields = [
    { label: "First Name", field: "firstName", type: "text", placeholder: "Enter first name" },
    { label: "Middle Name", field: "middleName", type: "text", placeholder: "Enter middle name" },
    { label: "Last Name", field: "lastName", type: "text", placeholder: "Enter last name" },
    { label: "Phone Number", field: "phoneNumber", type: "tel", icon: Phone, placeholder: "Enter phone number" },
    { label: "Email Address", field: "email", type: "email", icon: Mail, placeholder: "Enter email address" },
    { label: "Gender", field: "gender", type: "select", options: ["Male", "Female", "Other"], placeholder: "Select gender" },
    { label: "Date of Birth", field: "dateOfBirth", type: "date", icon: Calendar, placeholder: "Select date" },
    { label: "Nationality", field: "nationality", type: "text", placeholder: "Enter nationality" },
    { label: "Marital Status", field: "maritalStatus", type: "select", options: ["Single", "Married", "Divorced", "Widowed"], placeholder: "Select marital status" },
  ];

  const addressFields = [
    { label: "Street Name", field: "streetName", type: "text", icon: MapPin, placeholder: "Enter street name" },
    { label: "City/LGA", field: "cityLGA", type: "text", placeholder: "Enter city/LGA" },
    { label: "State", field: "state", type: "text", placeholder: "Enter state" },
  ];

  const emergencyFields = [
    { label: "Full Name", field: "emergencyName", type: "text", icon: UserIcon, placeholder: "Enter full name" },
    { label: "Phone Number", field: "emergencyPhone", type: "tel", icon: Phone, placeholder: "Enter phone number" },
    { label: "Relationship", field: "emergencyRelationship", type: "text", icon: Heart, placeholder: "Enter relationship" },
  ];

  if (isMobile) {
    return (
      <>
        <div className="bg-white border border-purple-300 rounded-xl p-4 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">PERSONAL INFORMATION</h2>
          <div className="grid grid-cols-1 gap-4">
            {personalFields.map((field, index) => (
              <FormField key={index} {...field} isEditing={isEditing} formData={formData} handleInputChange={handleInputChange} />
            ))}
          </div>
        </div>

        <div className="bg-white border border-purple-300 rounded-xl p-4 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">HOME ADDRESS</h2>
          <div className="grid grid-cols-1 gap-4">
            {addressFields.map((field, index) => (
              <FormField key={index} {...field} isEditing={isEditing} formData={formData} handleInputChange={handleInputChange} />
            ))}
          </div>
        </div>

        <div className="bg-white border border-purple-300 rounded-xl p-4 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">EMERGENCY CONTACT</h2>
          <div className="grid grid-cols-1 gap-4">
            {emergencyFields.map((field, index) => (
              <FormField key={index} {...field} isEditing={isEditing} formData={formData} handleInputChange={handleInputChange} />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="absolute bg-white border border-purple-300 rounded-xl"
        style={{ width: "788px", height: "328px", top: "264px", left: "272px", padding: "16px" }}>
        <h2 className="text-lg font-bold text-gray-900 mb-4">PERSONAL INFORMATION</h2>
        <div className="grid grid-cols-3 gap-2">
          {personalFields.map((field, index) => (
            <FormField key={index} {...field} isEditing={isEditing} formData={formData} handleInputChange={handleInputChange} />
          ))}
        </div>
      </div>

      <div className="absolute bg-white border border-purple-300 rounded-xl"
        style={{ width: "786px", height: "140px", top: "632px", left: "272px", padding: "16px" }}>
        <h2 className="text-lg font-bold text-gray-900 mb-4">HOME ADDRESS</h2>
        <div className="grid grid-cols-3 gap-2">
          {addressFields.map((field, index) => (
            <FormField key={index} {...field} isEditing={isEditing} formData={formData} handleInputChange={handleInputChange} />
          ))}
        </div>
      </div>

      <div className="absolute bg-white border border-purple-300 rounded-xl"
        style={{ width: "786px", height: "140px", top: "812px", left: "272px", padding: "16px" }}>
        <h2 className="text-lg font-bold text-gray-900 mb-4">EMERGENCY CONTACT</h2>
        <div className="grid grid-cols-3 gap-2">
          {emergencyFields.map((field, index) => (
            <FormField key={index} {...field} isEditing={isEditing} formData={formData} handleInputChange={handleInputChange} />
          ))}
        </div>
      </div>
    </>
  );
};

const EmploymentInfoTab = ({ isMobile, isEditing, formData, handleInputChange }) => {
  const employmentFields = [
    { label: "Unit", field: "unit", type: "text", icon: UnitIcon, placeholder: "Enter unit" },
    { label: "Department", field: "department", type: "text", icon: Building, placeholder: "Enter department" },
    { label: "Employment Status", field: "employmentStatus", type: "select", icon: UserCheck, options: ["Full-time", "Part-time", "Contract", "Intern"], placeholder: "Select employment status" },
    { label: "Line Manager", field: "lineManager", type: "text", placeholder: "Enter line manager name" },
    { label: "Line Manager Email", field: "lineManagerEmail", type: "email", icon: Mail, placeholder: "Enter line manager email" },
  ];

  if (isMobile) {
    return (
      <div className="bg-white border border-purple-300 rounded-xl p-4 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">EMPLOYMENT INFORMATION</h2>
        <div className="grid grid-cols-1 gap-4">
          {employmentFields.map((field, index) => (
            <FormField key={index} {...field} isEditing={isEditing} formData={formData} handleInputChange={handleInputChange} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute bg-white border border-purple-300 rounded-xl"
      style={{ width: "788px", height: "213px", top: "264px", left: "272px", padding: "16px", borderRadius: "14px" }}>
      <h2 className="text-lg font-bold text-gray-900 mb-4">EMPLOYMENT INFORMATION</h2>
      <div className="grid grid-cols-3 gap-4">
        {employmentFields.map((field, index) => (
          <FormField key={index} {...field} isEditing={isEditing} formData={formData} handleInputChange={handleInputChange} />
        ))}
      </div>
    </div>
  );
};

const BankInfoTab = ({ isMobile, isEditing, formData, handleInputChange }) => {
  const bankFields = [
    { label: "Bank Name", field: "bankName", type: "text", icon: Building, placeholder: "Enter bank name" },
    { label: "Account Number", field: "accountNumber", type: "text", icon: CreditCard, placeholder: "Enter account number" },
    { label: "Account Name", field: "accountName", type: "text", placeholder: "Enter account name" },
  ];

  const otherFields = [
    { label: "Pay ID (Tax)", field: "taxId", type: "text", icon: Hash, placeholder: "Enter tax ID" },
    { label: "Phone Number", field: "taxPhoneNumber", type: "tel", icon: Phone, placeholder: "Enter phone number" },
  ];

  if (isMobile) {
    return (
      <>
        <div className="bg-white border border-purple-300 rounded-xl p-4 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">BANK INFORMATION</h2>
          <div className="grid grid-cols-1 gap-4">
            {bankFields.map((field, index) => (
              <FormField key={index} {...field} isEditing={isEditing} formData={formData} handleInputChange={handleInputChange} />
            ))}
          </div>
        </div>

        <div className="bg-white border border-purple-300 rounded-xl p-4 mb-6">
          <h2 className="text-lg font-bold text-gray-400 mb-4">OTHER DETAILS</h2>
          <div className="grid grid-cols-1 gap-4">
            {otherFields.map((field, index) => (
              <FormField key={index} {...field} isEditing={isEditing} formData={formData} handleInputChange={handleInputChange} />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="absolute bg-white border border-purple-300 rounded-xl"
        style={{ width: "788px", height: "99px", top: "264px", left: "272px", padding: "16px", borderRadius: "14px" }}>
        <h2 className="text-lg font-bold text-gray-900 mb-2">BANK INFORMATION</h2>
        <div className="grid grid-cols-3 gap-4">
          {bankFields.map((field, index) => (
            <FormField key={index} {...field} isEditing={isEditing} formData={formData} handleInputChange={handleInputChange} />
          ))}
        </div>
      </div>

      <div className="absolute bg-white border border-purple-300 rounded-xl"
        style={{ width: "786px", height: "139px", top: "403px", left: "272px", padding: "16px" }}>
        <h2 className="text-lg font-bold text-gray-400 mb-4">Other details</h2>
        <div className="grid grid-cols-2 gap-4">
          {otherFields.map((field, index) => (
            <FormField key={index} {...field} isEditing={isEditing} formData={formData} handleInputChange={handleInputChange} />
          ))}
        </div>
      </div>
    </>
  );
};

// Profile Card Component
const ProfileCard = ({ isMobile, userData, handleProfileImageEdit, handleEditClick, handleCancelClick, handleSaveClick, isEditing }) => (
  <div className={`${isMobile ? 'px-4 mb-8' : 'absolute flex flex-col'}`}
    style={!isMobile ? { width: "318px", top: "183px", left: "1082px", gap: "56px" } : {}}>
    
    <div className="bg-white border border-purple-300 rounded-xl p-6 mb-6">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Public profile</h3>
        
        <div className="relative">
          <img src={profile} alt="Profile" className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white shadow-lg" />
          <button 
            onClick={handleProfileImageEdit}
            className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
            title="Edit profile picture"
          >
            <Edit size={16} className="text-purple-600" />
          </button>
        </div>
        
        <h3 className="font-bold text-gray-800 text-lg text-center">
          {userData.fullName || "Your name will appear here"}
        </h3>
        <p className="text-sm text-gray-500 mt-1 text-center">
          {userData.role || "Your position will appear here"}
        </p>

        <div className="w-full mt-6 space-y-4">
          {[
            { icon: Building, label: "Dept", value: userData.department, fallback: "Your department" },
            { icon: Mail, label: "Mail", value: userData.email, fallback: "your.email@example.com" },
            { icon: Phone, label: "Tel", value: userData.phone, fallback: "+123 456 7890" },
          ].map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <item.icon size={16} className="text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className={`text-sm ${item.value ? 'text-gray-900' : 'text-gray-400'}`}>
                  {item.value || item.fallback}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-4">
      <button 
        onClick={isEditing ? handleCancelClick : handleEditClick}
        className="w-full bg-white border-2 border-purple-400 text-purple-700 px-8 py-4 rounded-xl hover:bg-purple-50 transition-colors font-semibold text-sm flex items-center justify-center gap-2"
      >
        <Edit size={18} />
        {isEditing ? "Cancel Editing" : "Edit Profile"}
      </button>
      {isEditing && (
        <button 
          onClick={handleSaveClick}
          className="w-full bg-purple-600 text-white px-8 py-4 rounded-xl hover:bg-purple-700 transition-colors font-semibold text-sm flex items-center justify-center gap-2"
        >
          <Bell size={18} />
          Save Profile
        </button>
      )}
    </div>
  </div>
);

// Save Message Component
const SaveMessage = ({ saveMessage, isMobile }) => (
  saveMessage.text && (
    <div className={`${isMobile ? 'mx-4 mb-4' : 'absolute top-200 left-1/2 transform -translate-x-1/2 z-50'}`}
      style={!isMobile ? { top: "220px" } : {}}>
      <div className={`p-4 rounded-lg shadow-lg ${
        saveMessage.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : 
        saveMessage.type === "error" ? "bg-red-50 text-red-700 border border-red-200" : 
        "bg-blue-50 text-blue-700 border border-blue-200"
      }`}>
        <div className="flex items-center space-x-2">
          {saveMessage.type === "success" && <span>✅</span>}
          {saveMessage.type === "error" && <span>❌</span>}
          <span>{saveMessage.text}</span>
        </div>
      </div>
    </div>
  )
);

// Sidebar Component
const Sidebar = ({ isMobile, isSidebarOpen, setIsSidebarOpen, handleNavigation, handleLogout }) => (
  <>
    {isMobile && (
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-purple-600 text-white rounded-lg shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>
    )}

    {!isMobile && (
      <aside className="hidden md:block absolute bg-[#9C6ADE] flex flex-col text-white rounded-xl border border-purple-300"
        style={{ width: "201px", height: "964px", top: "24px", left: "40px", borderRadius: "20px" }}>
        
        <div className="flex items-center justify-center mt-10 mb-16 px-4">
          <img src={logo} alt="Logo" className="w-full" />
        </div>

        <nav className="space-y-4 px-4">
          {[
            { id: "home", label: "Home", icon: Home, path: "/dashboard" },
            { id: "profile", label: "Profile", icon: User, path: "/profile" },
            { id: "documents", label: "Documents", icon: FileText, path: "/documents" },
            { id: "teams", label: "Teams", icon: Users, path: "/teams" },
            { id: "guides", label: "Company Guides", icon: FileText, path: "/guides" },
            { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center pl-4 py-3 rounded-full w-full transition-all ${
                item.id === "profile"
                  ? "bg-white text-purple-700 font-semibold shadow-sm"
                  : "text-white hover:bg-white/20"
              }`}
            >
              <item.icon className="mr-3 w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    )}

    {isMobile && (
      <>
        <aside className={`fixed top-0 left-0 h-full w-64 z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 bg-[#9B6ADE] flex flex-col text-white py-10 px-7 rounded-lg shadow-lg`}>
          
          <button onClick={() => setIsSidebarOpen(false)} className="absolute top-4 right-4 text-white">
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center mb-16 px-4">
            <img src={logo} alt="PaySkul Logo" className="w-32" />
          </div>

          <nav className="space-y-6 px-4">
            {[
              { id: "home", label: "Home", icon: Home, path: "/dashboard" },
              { id: "profile", label: "Profile", icon: User, path: "/profile" },
              { id: "documents", label: "Documents", icon: FileText, path: "/documents" },
              { id: "teams", label: "Teams", icon: Users, path: "/teams" },
              { id: "guides", label: "Company Guides", icon: FileText, path: "/guides" },
              { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  handleNavigation(item.path);
                  setIsSidebarOpen(false);
                }}
                className={`flex items-center pl-5 py-3 rounded-full w-full transition-all ${
                  item.id === "profile"
                    ? "bg-white text-purple-700 font-semibold shadow-sm"
                    : "text-white hover:bg-white/20"
                }`}
              >
                <item.icon className="mr-3 w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
            
            <button onClick={handleLogout} className="flex items-center pl-5 py-3 rounded-full w-full text-white hover:bg-white/20 transition-all mt-10">
              <LogOut className="mr-3 w-5 h-5" />
              <span className="text-sm">Logout</span>
            </button>
          </nav>
        </aside>

        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </>
    )}
  </>
);

// Main Profile Component
const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ text: "", type: "" });
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("profileData");
    return saved ? JSON.parse(saved) : {
      firstName: "", middleName: "", lastName: "", phoneNumber: "", email: "", gender: "",
      dateOfBirth: "", nationality: "", maritalStatus: "", streetName: "", cityLGA: "", state: "",
      emergencyName: "", emergencyPhone: "", emergencyRelationship: "", unit: "", department: "",
      employmentStatus: "", lineManager: "", lineManagerEmail: "", bankName: "", accountNumber: "",
      accountName: "", taxId: "", taxPhoneNumber: ""
    };
  });

  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : { fullName: "", role: "", email: "", phone: "", department: "" };
  });

  const tabSections = [
    { id: "personal", title: "PERSONAL INFORMATION" },
    { id: "employment", title: "EMPLOYMENT INFORMATION" },
    { id: "bank", title: "BANK & OTHER INFORMATION" },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateProfileProgress = () => {
    const filled = [formData.firstName, formData.lastName, formData.email]
      .filter(field => field && field.toString().trim() !== "").length;
    return Math.round((filled / 3) * 100);
  };

  const handleSaveClick = () => {
    try {
      setIsEditing(false);
      const fullName = [formData.firstName, formData.middleName, formData.lastName]
        .filter(name => name && name.trim() !== "").join(" ");
      
      const updatedUserData = {
        fullName: fullName || "Not provided",
        role: formData.department || "Not provided",
        email: formData.email || "Not provided",
        phone: formData.phoneNumber || "Not provided",
        department: formData.department || "Not provided",
        team: formData.unit || "Not provided",
        lastUpdated: new Date().toISOString()
      };
      
      setUserData(updatedUserData);
      localStorage.setItem("currentUser", JSON.stringify(updatedUserData));
      localStorage.setItem("profileData", JSON.stringify(formData));
      
      const progress = calculateProfileProgress();
      localStorage.setItem("profileProgress", progress.toString());
      window.dispatchEvent(new StorageEvent('storage', { key: 'profileProgress', newValue: progress.toString() }));
      
      setSaveMessage({ text: `✅ Profile saved! Dashboard updated to ${progress}%`, type: "success" });
      setTimeout(() => setSaveMessage({ text: "", type: "" }), 3000);
    } catch (error) {
      setSaveMessage({ text: "❌ Error saving profile. Please try again.", type: "error" });
      setTimeout(() => setSaveMessage({ text: "", type: "" }), 3000);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    const saved = localStorage.getItem("profileData");
    if (saved) setFormData(JSON.parse(saved));
    setSaveMessage({ text: "Profile edit cancelled", type: "info" });
    setTimeout(() => setSaveMessage({ text: "", type: "" }), 2000);
  };

  const handleProfileImageEdit = () => {
    alert("Profile image edit functionality would open a file picker here!");
  };

  const handleNavigation = (path) => navigate(path);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: return <PersonalInfoTab isMobile={isMobile} isEditing={isEditing} formData={formData} handleInputChange={handleInputChange} />;
      case 1: return <EmploymentInfoTab isMobile={isMobile} isEditing={isEditing} formData={formData} handleInputChange={handleInputChange} />;
      case 2: return <BankInfoTab isMobile={isMobile} isEditing={isEditing} formData={formData} handleInputChange={handleInputChange} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <Sidebar 
        isMobile={isMobile} 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        handleNavigation={handleNavigation} 
        handleLogout={handleLogout} 
      />

      {!isMobile ? (
        <>
          <div className="hidden md:block absolute rounded-xl overflow-hidden"
            style={{ width: "1128px", height: "106px", top: "24px", left: "272px" }}>
            <img src={profileHeader} className="w-full h-full object-cover" alt="Banner" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent flex items-center pl-8">
              <h1 className="text-white text-3xl font-bold">PROFILE</h1>
            </div>
          </div>

          <div className="hidden md:block absolute flex pb-2" style={{ top: "183px", left: "274px", width: "786px" }}>
            {tabSections.map((tab, index) => (
              <button key={tab.id} onClick={() => setActiveTab(index)}
                className={`mr-10 pb-2 font-semibold text-sm transition-all ${
                  activeTab === index
                    ? "text-purple-700 border-b-4 border-purple-700"
                    : "text-gray-500 hover:text-purple-600 border-b-2 border-transparent hover:border-purple-300"
                }`}>
                {tab.title}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="md:hidden relative rounded-xl overflow-hidden h-32 mt-16 mb-6 mx-4">
            <img src={profileHeader} className="w-full h-full object-cover" alt="Banner" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent flex items-center pl-6">
              <h1 className="text-white text-2xl font-bold">PROFILE</h1>
            </div>
          </div>

          <div className="md:hidden flex overflow-x-auto pb-2 mb-4 mx-4 border-b border-gray-200">
            {tabSections.map((tab, index) => (
              <button key={tab.id} onClick={() => setActiveTab(index)}
                className={`mr-6 pb-2 font-semibold text-sm whitespace-nowrap transition-all ${
                  activeTab === index
                    ? "text-purple-700 border-b-4 border-purple-700"
                    : "text-gray-500 hover:text-purple-600 border-b-2 border-transparent hover:border-purple-300"
                }`}>
                {tab.title}
              </button>
            ))}
          </div>
        </>
      )}

      <SaveMessage saveMessage={saveMessage} isMobile={isMobile} />

      {!isMobile && <div className="hidden md:block">{renderTabContent()}</div>}
      {isMobile && <div className="md:hidden px-4">{renderTabContent()}</div>}

      <ProfileCard
        isMobile={isMobile}
        userData={userData}
        handleProfileImageEdit={handleProfileImageEdit}
        handleEditClick={() => setIsEditing(!isEditing)}
        handleCancelClick={handleCancelClick}
        handleSaveClick={handleSaveClick}
        isEditing={isEditing}
      />
    </div>
  );
};

export default Profile;