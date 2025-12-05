import React, { useState, useMemo, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home, User, FileText, Users, Settings, LogOut,
  ArrowLeft, Search, Filter, ChevronDown,
  Menu, X
} from "lucide-react";

import logo from "../assets/logo.png";
import teamsBanner from "../assets/ProfileHeader.jpg";

const TeamDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { department } = location.state || {};
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filterRef = useRef(null);

  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const allMembers = useMemo(() => 
    Array(60).fill(null).map((_, i) => {
      const roles = ["HOD, UI/UX Designer", "Lead, UI/UX Designer", "UI/UX Designer", "Senior Designer", "Junior Designer"];
      const firstNames = ["Darlene", "Jacob", "Leslie", "Courtney", "Eleanor", "Theresa", "Brooklyn", "Kristin", "Marcus", "Annette"];
      const lastNames = ["Robertson", "Jones", "Alexander", "Henry", "Pena", "Webb", "Simmons", "Watson", "Black", "Stewart"];
      const name = `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`;
      const role = roles[i % roles.length];

      return {
        id: `34532123${String(i + 1).padStart(2, "0")}`,
        name,
        role,
        email: `${name.toLowerCase().replace(" ", ".")}@payskul.com`,
        photo: department?.teamPhoto || "https://via.placeholder.com/150"
      };
    }), [department]);

  const roleOptions = ["All Roles", ...new Set(allMembers.map(m => m.role))].sort();

  const filtered = allMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.id.includes(searchTerm) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "All Roles" || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const navItems = [
    { id: "home", icon: Home, path: "/dashboard" },
    { id: "profile", icon: User, path: "/profile" },
    { id: "documents", icon: FileText, path: "/documents" },
    { id: "teams", icon: Users, path: "/teams" },
    { id: "guides", icon: FileText, path: "/guides" },
    { id: "settings", icon: Settings, path: "/settings" },
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

  if (!department) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">👥</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">No department selected</h1>
        <p className="text-gray-600 mb-4">Please select a team from the teams page</p>
        <button
          onClick={() => navigate("/teams")}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
        >
          Back to Teams
        </button>
      </div>
    </div>
  );

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

      {/* DESKTOP SIDEBAR  */}
      <aside className="hidden md:block absolute bg-[#9C6ADE] flex flex-col text-white rounded-xl border border-purple-300"
        style={{ width: "201px", height: "1072px", top: "24px", left: "40px", borderRadius: "20px" }}>
        <div className="flex justify-center mt-10 mb-16 px-4">
          <img src={logo} alt="Logo" className="w-full max-w-[140px]" />
        </div>
        
        <nav className="space-y-4 px-4">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => handleNavigation(item.path)}
              className={`flex items-center pl-4 py-3 rounded-full w-full transition-all ${
                item.id === "teams" ? "bg-white text-purple-700 font-semibold shadow-sm" : "text-white hover:bg-white/20"
              }`}>
              <item.icon className="mr-3 w-5 h-5" />
              <span className="text-sm">{item.id.charAt(0).toUpperCase() + item.id.slice(1)}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* MOBILE SIDEBAR  */}
      <aside className={`${isMobile ? 
        `fixed top-0 left-0 h-full w-64 z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 bg-[#9B6ADE]` : 
        'hidden'} flex flex-col text-white py-10 px-7 rounded-lg shadow-lg`}>
        
        {/* Close button for mobile */}
        {isMobile && (
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-4 right-4 text-white"
          >
            <X className="w-6 h-6" />
          </button>
        )}
        
        <div className="flex justify-center mb-16 px-4">
          <img src={logo} alt="Logo" className="w-32" />
        </div>
        
        <nav className="space-y-6 px-4">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => handleNavigation(item.path)}
              className={`flex items-center pl-5 py-3 rounded-full w-full transition-all ${
                item.id === "teams" ? "bg-white text-purple-700 font-semibold shadow-sm" : "text-white hover:bg-white/20"
              }`}>
              <item.icon className="mr-3 w-5 h-5" />
              <span className="text-sm">{item.id.charAt(0).toUpperCase() + item.id.slice(1)}</span>
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

      
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT - Increased width */}
      <div className={`${isMobile ? 'ml-0' : 'md:ml-[280px]'} p-6 lg:p-8 xl:p-10`}>
        
        {/* "BACK TO TEAMS" MOVED TO TOP */}
        <div className="mb-6">
          <button 
            onClick={() => navigate("/teams")} 
            className="flex items-center gap-2 text-[#9C6ADE] font-medium hover:underline text-lg"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Back to Teams</span>
          </button>
        </div>
        <div className="mb-8">
          {/* BANNER - Full width */}
          <div className="relative rounded-xl overflow-hidden w-full h-40 mb-4">
            <img src={teamsBanner} className="w-full h-full object-cover" alt="Banner" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center pl-8">
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">
                {department.name.toUpperCase()}
              </h1>
            </div>
          </div>
        </div>

        {/* SEARCH AND FILTER */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name, ID, or email..." 
              value={searchTerm} 
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="pl-12 pr-4 py-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#9C6ADE]/30 text-base" 
            />
          </div>

          <div ref={filterRef} className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-between gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition w-full lg:w-auto text-base"
            >
              <Filter className="w-5 h-5" />
              <span>{selectedRole}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
            </button>

            {isFilterOpen && (
              <div className="absolute top-full mt-2 left-0 right-0 lg:right-auto lg:left-0 w-full lg:w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                {roleOptions.map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setSelectedRole(role);
                      setIsFilterOpen(false);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-purple-50 transition ${selectedRole === role ? "bg-[#9C6ADE] text-white" : "text-gray-700"}`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white border border-purple-300 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] lg:min-w-full">
              <thead className="bg-purple-50 border-b border-purple-200">
                <tr>
                  <th className="text-left text-sm font-semibold text-gray-700 px-8 py-5 w-1/5">Employee ID</th>
                  <th className="text-left text-sm font-semibold text-gray-700 px-8 py-5 w-1/3">Employee Name</th>
                  <th className="text-left text-sm font-semibold text-gray-700 px-8 py-5 w-1/3">Designation</th>
                  <th className="text-left text-sm font-semibold text-gray-700 px-8 py-5 w-1/3">Email</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((member) => (
                  <tr 
                    key={member.id}
                    className="border-b border-gray-100 hover:bg-purple-50/50 transition-all cursor-pointer"
                    onClick={() => navigate("/employee-profile", { 
                      state: { 
                        person: member, 
                        department 
                      } 
                    })}
                  >
                    <td className="px-8 py-5 text-base text-gray-700 font-mono">{member.id}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <img 
                          src={member.photo} 
                          alt={member.name} 
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-100" 
                        />
                        <span className="font-medium text-gray-900 text-base">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-base text-gray-700">{member.role}</td>
                    <td className="px-8 py-5 text-base text-[#9C6ADE] underline truncate">{member.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col lg:flex-row items-center justify-between px-8 py-5 border-t border-gray-200 bg-gray-50">
            <div className="text-base text-gray-600 mb-4 lg:mb-0">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} records
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-white disabled:opacity-50 text-base transition-colors"
              >
                Previous
              </button>
              <span className="text-base text-gray-600">Page {currentPage} of {totalPages}</span>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-white disabled:opacity-50 text-base transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;