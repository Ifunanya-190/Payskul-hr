import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  User,
  FileText,
  Users,
  Settings,
  Search,
  ArrowRight,
  Menu,
  X,
  LogOut,
} from "lucide-react";

import logo from "../assets/logo.png";
import teamsBanner from "../assets/ProfileHeader.jpg";
import designTeamPhoto from "../assets/Brand&Comms.jpg";
import salesTeamPhoto from "../assets/Sales.jpg";
import pmTeamPhoto from "../assets/Managment.jpg";
import marketingTeamPhoto from "../assets/Marketing.jpg";

const Teams = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { id: "home", label: "Home", icon: Home, path: "/dashboard" },
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
    { id: "documents", label: "Documents", icon: FileText, path: "/documents" },
    { id: "teams", label: "Teams", icon: Users, path: "/teams" },
    { id: "guides", label: "Company Guides", icon: FileText, path: "/guides" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ];

  const departments = [
    {
      name: "Design Department",
      members: 20,
      teamPhoto: designTeamPhoto,
      people: [
        { name: "Dianne Russell", role: "Lead UI/UX Designer", email: "dianne@payskul.com" },
        { name: "Arlene McCoy", role: "Sr. UI/UX Designer", email: "arlene@payskul.com" },
        { name: "Cody Fisher", role: "Sr. UI/UX Designer", email: "cody@payskul.com" },
        { name: "Theresa Webb", role: "UI/UX Designer", email: "theresa@payskul.com" },
        { name: "Ronald Richards", role: "UI/UX Designer", email: "ronald@payskul.com" },
      ],
    },
    {
      name: "Sales Department",
      members: 14,
      teamPhoto: salesTeamPhoto,
      people: [
        { name: "Darrell Steward", role: "Sr. Sales Manager", email: "darrell@payskul.com" },
        { name: "Kristin Watson", role: "Sr. Sales Manager", email: "kristin@payskul.com" },
        { name: "Courtney Henry", role: "BDM", email: "courtney@payskul.com" },
        { name: "Kathryn Murphy", role: "BDE", email: "kathryn@payskul.com" },
        { name: "Albert Flores", role: "Sales", email: "albert@payskul.com" },
      ],
    },
    {
      name: "Project Manager Department",
      members: 18,
      teamPhoto: pmTeamPhoto,
      people: [
        { name: "Leslie Alexander", role: "Sr. Project Manager", email: "leslie@payskul.com" },
        { name: "Ronald Richards", role: "Sr. Project Manager", email: "ronald.pm@payskul.com" },
        { name: "Savannah Nguyen", role: "Project Manager", email: "savannah@payskul.com" },
        { name: "Eleanor Pena", role: "Project Manager", email: "eleanor@payskul.com" },
        { name: "Esther Howard", role: "Project Manager", email: "esther@payskul.com" },
      ],
    },
    {
      name: "Marketing Department",
      members: 10,
      teamPhoto: marketingTeamPhoto,
      people: [
        { name: "Wade Warren", role: "Sr. Marketing Manager", email: "wade@payskul.com" },
        { name: "Brooklyn Simmons", role: "Sr. Marketing Manager", email: "brooklyn@payskul.com" },
        { name: "Kristin Watson", role: "Marketing Coordinator", email: "kristin.mark@payskul.com" },
        { name: "Jacob Jones", role: "Marketing Coordinator", email: "jacob@payskul.com" },
        { name: "Cody Fisher", role: "Marketing", email: "cody.mark@payskul.com" },
      ],
    },
  ];

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.people.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Navigate to employee profile
  const handleMemberClick = (dept, person) => {
    navigate("/employee-profile", { 
      state: { 
        person, 
        department: dept 
      } 
    });
  };

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

      {/* DESKTOP SIDEBAR*/}
      <aside className="hidden md:block absolute bg-[#9C6ADE] flex flex-col text-white rounded-xl border border-purple-300"
        style={{ width: "201px", height: "1072px", top: "24px", left: "40px", borderRadius: "20px" }}>
        <div className="flex items-center justify-center mt-10 mb-16 px-4">
          <img src={logo} alt="Logo" className="w-full" />
        </div>
        <nav className="space-y-4 px-4">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => navigate(item.path)}
              className={`flex items-center pl-4 py-3 rounded-full w-full transition-all ${
                item.id === "teams" 
                  ? "bg-white text-purple-700 font-semibold shadow-sm" 
                  : "text-white hover:bg-white/20"
              }`}>
              <item.icon className="mr-3 w-5 h-5" />
              <span className="text-sm">{item.label}</span>
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
        
        <div className="flex items-center justify-center mb-16 px-4">
          <img src={logo} alt="Logo" className="w-32" />
        </div>

        <nav className="space-y-6 px-4">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => {
              handleNavigation(item.path);
            }}
              className={`flex items-center pl-5 py-3 rounded-full w-full transition-all ${
                item.id === "teams" 
                  ? "bg-white text-purple-700 font-semibold shadow-sm" 
                  : "text-white hover:bg-white/20"
              }`}>
              <item.icon className="mr-3 w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
          
          {/* Logout Button */}
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

      {/* DESKTOP BANNER */}
      <div className="hidden md:block absolute rounded-xl overflow-hidden" 
        style={{ width: "1128px", height: "106px", top: "24px", left: "272px" }}>
        <img src={teamsBanner} className="w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent flex items-center pl-8">
          <h1 className="text-white text-3xl font-bold">TEAMS</h1>
        </div>
      </div>

      {/* MOBILE BANNER */}
      <div className="md:hidden relative rounded-xl overflow-hidden h-32 mt-16 mb-6 mx-4">
        <img src={teamsBanner} className="w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent flex items-center pl-6">
          <h1 className="text-white text-2xl font-bold">TEAMS</h1>
        </div>
      </div>

      {/* DESKTOP MAIN CONTAINER  */}
      <div className="hidden md:block absolute bg-white border border-purple-300 rounded-xl overflow-hidden"
        style={{ width: "1128px", height: "934px", top: "162px", left: "272px", borderRadius: "14px" }}>
        
        {/* SEARCH */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search teams or members..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 border border-[#9C6ADE] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C6ADE]/30" 
            />
          </div>
        </div>

        {/* GRID  */}
        <div className="px-8 pt-6">
          <div className="grid grid-cols-2 gap-8 max-w-[1160px] mx-auto -mt-10">
            {filteredDepartments.map((dept, i) => (
              <div key={i} className="bg-white border border-purple-300 rounded-2xl shadow-sm overflow-hidden"
                style={{ width: "532.6666870117188px", height: "410px" }}>
                
                {/* HEADER */}
                <div className="px-8 pt-6 pb-4 border-b border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{dept.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{dept.members} Members</p>
                    </div>
                    <button 
                      onClick={() => navigate("/team-detail", { state: { department: dept } })}
                      className="text-[#9C6ADE] text-sm font-medium flex items-center gap-1 hover:underline">
                      View All <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* MEMBERS - CLICK GOES TO PROFILE */}
                <div className="px-6 pt-4">
                  <div className="space-y-5">
                    {dept.people.slice(0, 5).map((person, idx) => (
                      <div 
                        key={idx}
                        onClick={() => handleMemberClick(dept, person)}
                        className="flex items-center justify-between group rounded-lg hover:bg-purple-50/80 transition cursor-pointer"
                        style={{ width: "490.888916015625px", height: "42px", padding: "0 12px" }}
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={dept.teamPhoto} 
                            alt={person.name}
                            className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-100" 
                          />
                          <div>
                            <p className="font-medium text-gray-900 text-sm leading-none">{person.name}</p>
                            <p className="text-xs text-gray-500 leading-tight">{person.role}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#9C6ADE] opacity-0 group-hover:opacity-100 transition-all duration-200" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE MAIN CONTAINER */}
      <div className="md:hidden bg-white border border-purple-300 rounded-xl mx-4 mb-8">
        {/* SEARCH */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search teams or members..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-[#9C6ADE] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C6ADE]/30 text-sm" 
            />
          </div>
        </div>

        {/* TEAMS GRID */}
        <div className="p-4">
          <div className="space-y-4">
            {filteredDepartments.map((dept, i) => (
              <div key={i} className="bg-white border border-purple-300 rounded-2xl shadow-sm overflow-hidden">
                
                {/* HEADER */}
                <div className="px-4 pt-4 pb-3 border-b border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{dept.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{dept.members} Members</p>
                    </div>
                    <button 
                      onClick={() => navigate("/team-detail", { state: { department: dept } })}
                      className="text-[#9C6ADE] text-xs font-medium flex items-center gap-1 hover:underline">
                      View All <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* MEMBERS */}
                <div className="p-3">
                  <div className="space-y-3">
                    {dept.people.slice(0, 5).map((person, idx) => (
                      <div 
                        key={idx}
                        onClick={() => handleMemberClick(dept, person)}
                        className="flex items-center justify-between group rounded-lg hover:bg-purple-50/80 transition cursor-pointer p-2"
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={dept.teamPhoto} 
                            alt={person.name}
                            className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-100" 
                          />
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 text-sm leading-none truncate">{person.name}</p>
                            <p className="text-xs text-gray-500 leading-tight truncate">{person.role}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#9C6ADE] opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;