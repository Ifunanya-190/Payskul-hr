import React, { useState, useEffect } from "react";
import { Search, Bell, Home, User, FileText, Users, Settings, X, LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import profile from "../assets/Profile.jpg";
import managementImg from "../assets/Managment.jpg";
import techImg from "../assets/Tech.jpg";
import sales from "../assets/Sales.jpg";
import marketingImg from "../assets/Marketing.jpg";
import brandCommsImg from "../assets/Brand&Comms.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get user data from localStorage (from signup)
  const [userData, setUserData] = useState(() => {
    try {
      const storedUser = localStorage.getItem("currentUser");
      return storedUser ? JSON.parse(storedUser) : { fullName: "Aramide", role: "Admin" };
    } catch (error) {
      console.error("Error parsing user data:", error);
      return { fullName: "Aramide", role: "Admin" };
    }
  });
  
  // Progress states
  const [profileProgress, setProfileProgress] = useState(0);
  const [documentsProgress, setDocumentsProgress] = useState(0);
  const [leaveCount, setLeaveCount] = useState(0);
  
  // Notifications state with error handling
  const [notifications, setNotifications] = useState(() => {
    try {
      const savedNotifs = localStorage.getItem("notifications");
      if (savedNotifs) {
        const parsed = JSON.parse(savedNotifs);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
      return [
        { id: 1, text: "Welcome to PaySkul! Complete your profile to get started", date: getCurrentDate(), read: false, emoji: "👋", type: "system" },
        { id: 2, text: "Upload your documents to complete onboarding", date: getCurrentDate(), read: false, emoji: "📄", type: "system" },
      ];
    } catch (error) {
      console.error("Error loading notifications:", error);
      return [
        { id: 1, text: "Welcome to PaySkul! Complete your profile to get started", date: getCurrentDate(), read: false, emoji: "👋", type: "system" },
        { id: 2, text: "Upload your documents to complete onboarding", date: getCurrentDate(), read: false, emoji: "📄", type: "system" },
      ];
    }
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Navigation items with icons
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "teams", label: "Teams", icon: Users },
    { id: "guides", label: "Company Guides", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Teams data
  const teams = [
    { id: 1, name: "Management", members: 7, image: managementImg },
    { id: 2, name: "Tech", members: 7, image: techImg },
    { id: 3, name: "Design", members: 7, image: sales },
    { id: 4, name: "Marketing", members: 7, image: marketingImg },
    { id: 5, name: "Brand & Comms", members: 7, image: brandCommsImg },
  ];

  // Helper function to get current date
  function getCurrentDate() {
    const now = new Date();
    return now.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  }

 //Logout function
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userToken");
    addNotification("You have been logged out", "👋");
    navigate("/login");
  };

  
  useEffect(() => {
    try {
      if (Array.isArray(notifications)) {
        const unreadCount = notifications.filter(notif => !notif.read).length;
        setUnreadNotifications(unreadCount);
        localStorage.setItem("notifications", JSON.stringify(notifications));
      } else {
        console.error("Notifications is not an array:", notifications);
        setUnreadNotifications(0);
      }
    } catch (error) {
      console.error("Error saving notifications:", error);
    }
  }, [notifications]);

 // Load progress and user data on mount
  useEffect(() => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
      if (currentUser.fullName) {
        setUserData(currentUser);
      }

      const savedProfileProgress = parseInt(localStorage.getItem("profileProgress") || "0");
      const savedDocumentsProgress = parseInt(localStorage.getItem("documentsProgress") || "0");
      const savedLeaveCount = parseInt(localStorage.getItem("leaveCount") || "0");

      setProfileProgress(savedProfileProgress);
      setDocumentsProgress(savedDocumentsProgress);
      setLeaveCount(savedLeaveCount);
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }, []);

  //Search functionality
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }
    
    try {
      const teamResults = teams.filter(team =>
        team.name.toLowerCase().includes(query.toLowerCase())
      ).map(team => ({ type: "team", ...team }));
      
      let notificationResults = [];
      if (Array.isArray(notifications)) {
        notificationResults = notifications.filter(notif =>
          notif.text.toLowerCase().includes(query.toLowerCase())
        ).map(notif => ({ type: "notification", ...notif }));
      }
      
      setSearchResults([...teamResults, ...notificationResults]);
      setShowSearchResults(true);
    } catch (error) {
      console.error("Error in search:", error);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowSearchResults(false);
  };

  const handleSearchResultClick = (result) => {
    if (result.type === "team") {
      console.log("Opening team:", result.name);
    } else if (result.type === "notification") {
      handleNotificationClick(result.id);
    }
    clearSearch();
  };

  // Navigation
  const handleNavClick = (navId) => {
    setActiveNav(navId);
    const routes = {
      home: "/dashboard",
      profile: "/profile",
      documents: "/documents",
      teams: "/teams",
      guides: "/guides",
      settings: "/settings",
    };
    if (routes[navId]) navigate(routes[navId]);
    if (isMobile) setIsSidebarOpen(false);
  };

  // Handle individual notification click
  const handleNotificationClick = (notificationId) => {
    try {
      if (Array.isArray(notifications)) {
        setNotifications(notifications.map(notif => 
          notif.id === notificationId ? { ...notif, read: true } : notif
        ));
      }
    } catch (error) {
      console.error("Error handling notification click:", error);
    }
  };

  // Add a new notification
  const addNotification = (text, emoji = "🔔") => {
    try {
      const newNotification = {
        id: Date.now(),
        text,
        date: getCurrentDate(),
        read: false,
        emoji,
        type: "action"
      };
      
      const currentNotifications = Array.isArray(notifications) ? notifications : [];
      setNotifications([newNotification, ...currentNotifications]);
    } catch (error) {
      console.error("Error adding notification:", error);
    }
  };

  // Handle team click
  const handleTeamClick = (teamId) => {
    const team = teams.find(t => t.id === teamId);
    addNotification(`You viewed the ${team?.name} team`, "👥");
  };

  
  const markAllAsRead = () => {
    try {
      if (Array.isArray(notifications)) {
        setNotifications(notifications.map(notif => ({ ...notif, read: true })));
        addNotification("All notifications marked as read", "✓");
      }
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  // Handle profile completion
  const handleCompleteProfile = () => {
    addNotification("Navigating to profile page", "👤");
    navigate("/profile");
  };

  // Handle documents completion
  const handleCompleteDocuments = () => {
    addNotification("Navigating to documents page", "📄");
    navigate("/documents");
  };

  // Handle leave view
  const handleViewLeave = () => {
    addNotification("Viewing leave schedule", "🏖️");
    navigate("/leave");
  };

  // Refresh progress data
  const refreshProgress = () => {
    try {
      const savedProfileProgress = parseInt(localStorage.getItem("profileProgress") || "0");
      setProfileProgress(savedProfileProgress);

      const uploadedDocs = JSON.parse(localStorage.getItem("uploadedDocuments") || "[]");
      if (uploadedDocs.length > 0) {
        const docPercentage = Math.round((uploadedDocs.length / 3) * 100);
        setDocumentsProgress(docPercentage);
        localStorage.setItem("documentsProgress", docPercentage.toString());
      }
      
      addNotification("Progress data refreshed", "🔄");
    } catch (error) {
      console.error("Error refreshing progress:", error);
    }
  };

  
  const progressCards = [
    { 
      id: 1, 
      percentage: profileProgress, 
      title: profileProgress >= 100 ? "Profile complete!" : "Profile details not complete", 
      buttonText: profileProgress >= 100 ? "View Profile" : "Complete profile", 
      action: handleCompleteProfile 
    },
    { 
      id: 2, 
      percentage: documentsProgress, 
      title: documentsProgress >= 100 ? "All documents uploaded!" : "Documents upload not complete", 
      buttonText: documentsProgress >= 100 ? "View Documents" : "Complete documents", 
      action: handleCompleteDocuments 
    },
    { 
      id: 3, 
      value: leaveCount, 
      title: `${leaveCount} person${leaveCount !== 1 ? 's' : ''} currently on leave`, 
      buttonText: "See who is on leave", 
      action: handleViewLeave 
    },
  ];

  const safeNotifications = Array.isArray(notifications) ? notifications : [];

  return (
    <div className="min-h-screen w-full flex bg-white">
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
        'w-64 hidden md:block'} bg-[#9B6ADE] flex flex-col text-white py-10 px-7 rounded-lg shadow-lg mr-10 mt-4 ml-4`}>
        
       
        {isMobile && (
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-4 right-4 text-white"
          >
            <X className="w-6 h-6" />
          </button>
        )}
        
        <div className="flex items-center mb-16">
          <img src={logo} alt="PaySkul Logo" className="w-32" />
        </div>

        <nav className="space-y-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex items-center pl-5 py-3 rounded-full w-full transition-all ${
                activeNav === item.id
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

      {/* Overlay for mobile sidebar */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

   
      <main className={`flex-1 bg-white ${isMobile ? 'ml-0' : ''}`}>
        <header className="bg-[#BFA4E9] px-4 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between rounded-lg mt-4 mr-4">
          <div className={`w-full ${isMobile ? 'mb-4' : 'md:w-[40%]'} relative`}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              className="w-full py-3 pl-12 pr-10 rounded-full bg-white text-gray-700 border-none outline-none"
              placeholder="Search teams, notifications..."
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => searchQuery && setShowSearchResults(true)}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            
            {/* SEARCH RESULTS DROPDOWN */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-purple-200 max-h-80 overflow-y-auto z-50">
                <div className="p-2">
                  <div className="text-xs text-gray-500 px-3 py-2">Search Results</div>
                  {searchResults.map((result) => (
                    <button
                      key={`${result.type}-${result.id}`}
                      onClick={() => handleSearchResultClick(result)}
                      className="w-full text-left px-3 py-3 hover:bg-purple-50 rounded-lg flex items-center space-x-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                        <span>{result.type === "team" ? "👥" : result.emoji || "🔔"}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {result.type === "team" ? result.name : result.text || "Notification"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {result.type === "team" ? "Team" : "Notification"} • {result.date || getCurrentDate()}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE: BELL + LOGOUT + PROFILE */}
          <div className="flex items-center space-x-4 md:space-x-8">
            {/* Bell Icon with Notification Badge */}
            <div className="relative">
              <Bell className="w-6 h-6 text-white cursor-pointer" onClick={() => addNotification("You checked notifications", "🔔")} />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </div>

            {/* Logout Button with Red Icon */}
            <button
              onClick={handleLogout}
              className="relative p-2 rounded-full hover:bg-white/20 transition-colors group"
              title="Logout"
            >
              <div className="relative">
                <LogOut className="w-5 h-5 text-red-300 hover:text-red-500 transition-colors" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </div>
              {/* Tooltip on hover */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Logout
              </div>
            </button>

            {/* Profile section */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick("profile")}>
              <div className="w-10 h-10 md:w-12 md:h-12">
                <img 
                  src={profile} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              {!isMobile && (
                <div className="text-white">
                  <p className="font-semibold text-sm">{userData.fullName || "User"}</p>
                  <p className="text-xs opacity-80">{userData.role || "Developer"}</p>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ================= BODY ================= */}
        <div className="px-4 md:px-12 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-0">
              Hello {userData.fullName || "Aramide"},
            </h1>
            <button
              onClick={refreshProgress}
              className="text-sm text-purple-600 hover:text-purple-800 font-medium"
            >
              ↻ Refresh Progress
            </button>
          </div>

          {/* ================= MAIN ROW ================= */}
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {progressCards.map((card) => (
                  <div
                    key={card.id}
                    className="border border-purple-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center justify-center h-48"
                    onClick={card.action}
                  >
                    <div className="flex flex-col items-center text-center">
                      {card.percentage !== undefined ? (
                        <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-xl font-bold mb-3 ${
                          card.percentage >= 100 
                            ? "border-green-400 text-green-600" 
                            : "border-purple-400 text-purple-600"
                        }`}>
                          {card.percentage}%
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-purple-200 text-purple-900 rounded-full flex items-center justify-center text-xl font-bold mb-3">
                          {card.value}
                        </div>
                      )}
                      <p className="font-semibold text-gray-900 text-sm mb-3">
                        {card.title}
                      </p>
                      <button 
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          card.percentage >= 100 
                            ? "bg-green-100 text-green-700 hover:bg-green-200" 
                            : "bg-purple-900 text-white hover:bg-purple-800"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          card.action();
                        }}
                      >
                        {card.buttonText}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* MEDIUM PROFILE CARD */}
              <div className="mt-4">
                <div 
                  className="border border-purple-300 rounded-xl p-4 md:p-8 h-48 flex items-center justify-center bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer"
                  onClick={() => handleNavClick("profile")}
                >
                  <div className="text-center">
                    <p className="text-lg md:text-xl font-bold text-gray-400 mb-3">
                      {profileProgress >= 100 ? "Profile Complete! ✓" : "Profile details not complete"}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      {profileProgress}% completed
                    </p>
                    <div className="w-48 h-2.5 bg-gray-200 rounded-full mx-auto">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          profileProgress >= 100 ? "bg-green-500" : "bg-purple-500"
                        }`}
                        style={{ width: `${profileProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: NOTIFICATIONS */}
            <div className="w-full lg:w-96 border border-purple-300 rounded-2xl p-4 md:p-6 h-auto lg:h-[calc(100%-2rem)] mt-8 lg:mt-0">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <h3 className="font-bold text-gray-900 text-lg">NOTIFICATIONS</h3>
                  {unreadNotifications > 0 && (
                    <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                      {unreadNotifications} new
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  {unreadNotifications > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => addNotification("Test notification added", "🔔")}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    + Add test
                  </button>
                </div>
              </div>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {safeNotifications.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No notifications yet
                  </div>
                ) : (
                  safeNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification.id)}
                      className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-colors ${
                        notification.read ? 'opacity-70' : 'bg-purple-50 hover:bg-purple-100'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center">
                        <span className="text-lg">{notification.emoji || "🔔"}</span>
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                          {notification.text || "Notification"}
                          {!notification.read && <span className="ml-2 w-2 h-2 bg-purple-500 rounded-full inline-block"></span>}
                        </p>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-xs text-gray-400">{notification.date || getCurrentDate()}</p>
                          {notification.type === "action" && (
                            <span className="text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded">Action</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* ================= TEAMS SECTION ================= */}
          <h2 className="text-xl font-bold mb-5 text-gray-900">TEAMS</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            {teams.map((team) => (
              <div
                key={team.id}
                onClick={() => handleTeamClick(team.id)}
                className="rounded-3xl border border-purple-300 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="h-40 bg-gray-200 relative overflow-hidden">
                  <img 
                    src={team.image} 
                    alt={team.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <p className="font-semibold group-hover:text-purple-600 transition-colors">{team.name}</p>
                  <p className="text-sm text-gray-500">{team.members} members</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;