import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Home, User, FileText, Users, Settings, Download, Folder, Menu, X, LogOut
} from "lucide-react";

import logo from "../assets/logo.png";
import guidesBanner from "../assets/ProfileHeader.jpg";

const CompanyGuides = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const guides = [
    { id: 1, title: "Rule Book", date: "03/10/2025" },
    { id: 2, title: "Mission & Vision Statement", date: "05/10/2025" },
    { id: 3, title: "Core Values", date: "07/10/2025" },
  ];

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

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Mobile Menu Button (only on mobile) */}
      {isMobile && (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 z-50 p-2 bg-purple-600 text-white rounded-lg shadow-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* DESKTOP SIDEBAR - No logout */}
      <aside 
        className="hidden md:block absolute bg-[#9C6ADE] flex flex-col text-white rounded-xl border border-purple-300"
        style={{
          width: "201px",
          height: "1072px",
          top: "24px",
          left: "40px",
          borderRadius: "20px",
        }}
      >
        <div className="flex justify-center mt-10 mb-16 px-4">
          <img src={logo} alt="Payskul" className="w-full" />
        </div>
        
        <nav className="space-y-4 px-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center pl-4 py-3 rounded-full w-full transition-all ${
                item.id === "guides"
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

      {/* MOBILE SIDEBAR - With logout */}
      <aside className={`${isMobile ? 
        `fixed top-0 left-0 h-full w-64 z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 bg-[#9B6ADE]` : 
        'hidden'} flex flex-col text-white py-10 px-7 rounded-lg shadow-lg`}>
        
        {/* Close button for mobile sidebar */}
        {isMobile && (
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-4 right-4 text-white"
          >
            <X className="w-6 h-6" />
          </button>
        )}
        
        <div className="flex justify-center mb-16 px-4">
          <img src={logo} alt="Payskul" className="w-32" />
        </div>
        
        <nav className="space-y-6 px-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center pl-5 py-3 rounded-full w-full transition-all ${
                item.id === "guides"
                  ? "bg-white text-purple-700 font-semibold shadow-sm"
                  : "text-white hover:bg-white/20"
              }`}
            >
              <item.icon className="mr-3 w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
          
          {/* Logout Button - Mobile Only */}
          <button
            onClick={handleLogout}
            className="flex items-center pl-5 py-3 rounded-full w-full text-white hover:bg-white/20 transition-all mt-10"
          >
            <LogOut className="mr-3 w-5 h-5" />
            <span className="text-sm">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT AREA - Responsive */}
      <div className={`${isMobile ? 'ml-0' : 'md:ml-[280px]'} p-4 md:p-8`}>
        {/* BANNER - Responsive with text inside */}
        <div className={`rounded-xl overflow-hidden relative mb-6 ${isMobile ? 'h-32 mt-16' : 'h-32'}`}>
          <img src={guidesBanner} className="w-full h-full object-cover" alt="Banner" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center pl-6 md:pl-8">
            <h1 className="text-white text-2xl md:text-4xl font-bold">COMPANY GUIDES</h1>
          </div>
        </div>

        {/* MAIN CONTENT CONTAINER - Responsive */}
        <div className="bg-white border border-purple-300 rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 md:p-10">
            <div className="bg-white rounded-2xl border border-gray-100">
              {/* Desktop Table */}
              <div className="hidden md:block">
                <table className="w-full">
                  <thead className="border-b-2 border-gray-200">
                    <tr>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-6 px-10">Name</th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-6 px-10">Modified</th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-6 px-10">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guides.map((guide) => (
                      <tr key={guide.id} className="border-b border-gray-50 hover:bg-purple-50/20 transition">
                        <td className="py-8 px-10">
                          <div className="flex items-center gap-5">
                            <div className="w-14 h-14 flex items-center justify-center">
                              <Folder className="w-9 h-9 text-gray-400" />
                            </div>
                            <span className="text-lg font-medium text-gray-900">{guide.title}</span>
                          </div>
                        </td>
                        <td className="py-8 px-10 text-gray-600 font-medium">
                          {guide.date}
                        </td>
                        <td className="py-8 px-10">
                          <button className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition hover:underline">
                            <Download className="w-5 h-5" />
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile List View */}
              <div className="md:hidden">
                <div className="space-y-4">
                  {guides.map((guide) => (
                    <div 
                      key={guide.id} 
                      className="bg-white border border-gray-200 rounded-xl p-4 hover:bg-purple-50/20 transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Folder className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 text-base mb-1">{guide.title}</h3>
                          <p className="text-sm text-gray-500">Modified: {guide.date}</p>
                        </div>
                        <button className="flex items-center gap-1 text-purple-600 hover:text-purple-700">
                          <Download className="w-4 h-4" />
                          <span className="text-sm">Get</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyGuides;