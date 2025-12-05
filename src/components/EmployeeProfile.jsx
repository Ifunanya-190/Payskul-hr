import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, User, FileText, Users, Settings, Mail, Phone, ArrowLeft, Menu, X } from "lucide-react";

import logo from "../assets/logo.png";
import teamsBanner from "../assets/ProfileHeader.jpg";

const EmployeeProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { person, department } = location.state || {};
  const [isMobile, setIsMobile] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!person) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-4xl mb-4">👤</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">No employee selected</h1>
          <p className="text-gray-600 mb-4">Please select an employee from the team</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: "home", label: "Home", icon: Home, path: "/dashboard" },
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
    { id: "documents", label: "Documents", icon: FileText, path: "/documents" },
    { id: "teams", label: "Teams", icon: Users, path: "/teams" },
    { id: "guides", label: "Company Guides", icon: FileText, path: "/guides" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 z-50 p-2 bg-purple-600 text-white rounded-lg shadow-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* SIDEBAR */}
      <aside className={`${isMobile ? 
        `fixed top-0 left-0 h-full w-64 z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300` : 
        'hidden md:block absolute bg-[#9C6ADE] flex flex-col text-white rounded-xl border border-purple-300'}`
        } style={!isMobile ? {
          width: "201px",
          height: "1072px",
          top: "24px",
          left: "40px",
          borderRadius: "20px",
        } : {}}>
        
        {/* Close button for mobile */}
        {isMobile && (
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-4 right-4 text-white"
          >
            <X className="w-6 h-6" />
          </button>
        )}
        
        <div className="flex justify-center mt-10 mb-16 px-4">
          <img src={logo} alt="Payskul" className="w-full max-w-[140px]" />
        </div>
        
        <nav className="space-y-4 px-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center pl-4 py-3 rounded-full w-full transition-all ${
                item.id === "teams" ? "bg-white text-purple-700 font-semibold shadow-sm" : "text-white hover:bg-white/20"
              }`}>
              <item.icon className="mr-3 w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <div className={`${isMobile ? 'ml-0' : 'md:ml-[280px]'} p-4 md:p-8`}>
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-[#9C6ADE] font-medium hover:underline"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Team</span>
            <span className="sm:hidden">Back</span>
          </button>
        </div>

        {/* BANNER  */}
        <div className="relative rounded-xl overflow-hidden h-24 md:h-32 mb-6">
          <img src={teamsBanner} className="w-full h-full object-cover" alt="Banner" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center pl-4 md:pl-8">
            <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-bold">TEAM PROFILE</h1>
          </div>
        </div>

        {/* PROFILE CARD  */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 px-4 md:px-10 py-6 flex flex-col sm:flex-row items-center gap-6 mb-8">
          <img
            src={department?.teamPhoto || "https://via.placeholder.com/150"}
            alt={person.name}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-purple-100"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">{person.name}</h2>
            <p className="text-base text-gray-600 mt-1">{person.role || "Lead UI/UX Designer"}</p>
            <a href={`mailto:${person.email}`}
              className="flex items-center justify-center sm:justify-start gap-2 text-[#9C6ADE] text-sm mt-2 hover:underline">
              <Mail className="w-4 h-4" />
              {person.email || "dianne@payskul.com"}
            </a>
          </div>
        </div>

        {/* FORM FIELDS */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs text-gray-500 mb-2">First Name</label>
              <div className="px-4 py-3 md:px-5 md:py-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-800">
                {person.name.split(" ")[0] || "Dianne"}
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2">Last Name</label>
              <div className="px-4 py-3 md:px-5 md:py-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-800">
                {person.name.split(" ").slice(1).join(" ") || "Russell"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs text-gray-500 mb-2">Mobile Number</label>
              <div className="flex items-center gap-3 px-4 py-3 md:px-5 md:py-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-800">
                <Phone className="w-5 h-5 text-gray-400" />
                (702) 555-0122
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2">Email Address</label>
              <div className="px-4 py-3 md:px-5 md:py-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-800">
                {person.email || "dianne@payskul.com"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs text-gray-500 mb-2">Department</label>
              <div className="px-4 py-3 md:px-5 md:py-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-800">
                {department?.name.replace(" Department", "") || "Design"}
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2">Unit</label>
              <div className="px-4 py-3 md:px-5 md:py-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-800">
                Tech
              </div>
            </div>
          </div>

          {/* ADDITIONAL INFO */}
          <div className="bg-purple-50 rounded-xl p-4 md:p-6 border border-purple-100">
            <h3 className="font-semibold text-gray-900 mb-3">Additional Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-500">Employee ID</p>
                <p className="font-medium text-gray-900">{person.id || "3453212301"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Joined Date</p>
                <p className="font-medium text-gray-900">March 15, 2023</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <p className="font-medium text-green-600">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button 
            onClick={() => navigate(`mailto:${person.email}`)}
            className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Send Email
          </button>
          <button 
            onClick={() => navigate(`tel:+1234567890`)}
            className="flex-1 border border-purple-600 text-purple-600 px-6 py-3 rounded-xl hover:bg-purple-50 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;