import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, User, FileText, Users, Settings, Bell, Mail, Shield, Eye, X, Check, Menu, LogOut } from "lucide-react";
import logo from "../assets/logo.png";
import settingsBanner from "../assets/ProfileHeader.jpg";

const SettingsPage = () => {
  const navigate = useNavigate();
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

  // Toggle states
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    privacyMode: false,
    showOnlineStatus: true,
    autoSave: true,
  });

  // Toast state
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success" // success, error, info
  });

  const navItems = [
    { id: "home", label: "Home", icon: Home, path: "/dashboard" },
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
    { id: "documents", label: "Documents", icon: FileText, path: "/documents" },
    { id: "teams", label: "Teams", icon: Users, path: "/teams" },
    { id: "guides", label: "Company Guides", icon: FileText, path: "/guides" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ];

  const toggleItems = [
    { id: "notifications", label: "Push Notifications", description: "Receive push notifications", icon: Bell },
    { id: "emailAlerts", label: "Email Alerts", description: "Get email alerts for updates", icon: Mail },
    { id: "privacyMode", label: "Privacy Mode", description: "Hide your activity from others", icon: Shield },
    { id: "showOnlineStatus", label: "Show Online Status", description: "Let others see when you're online", icon: Eye },
    { id: "autoSave", label: "Auto Save", description: "Automatically save your work", icon: null },
  ];

  // Show toast function
  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type
    });

    // Auto hide after 3 seconds
    setTimeout(() => {
      hideToast();
    }, 3000);
  };

  // Hide toast function
  const hideToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  const handleToggle = (settingId) => {
    setSettings(prev => ({
      ...prev,
      [settingId]: !prev[settingId]
    }));
    
    // Save to localStorage
    localStorage.setItem(settingId, (!settings[settingId]).toString());
    
    
    const settingName = toggleItems.find(item => item.id === settingId)?.label;
    showToast(
      `${settingName} turned ${!settings[settingId] ? 'ON' : 'OFF'}`,
      "info"
    );
  };

  const saveAllSettings = () => {
    // Save all settings to localStorage
    Object.keys(settings).forEach(key => {
      localStorage.setItem(key, settings[key].toString());
    });
    
    showToast("All settings saved successfully!", "success");
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

  // Toast styles based on type
  const getToastStyles = () => {
    switch (toast.type) {
      case "success":
        return "bg-green-500 border-green-600 text-white";
      case "error":
        return "bg-red-500 border-red-600 text-white";
      case "info":
        return "bg-blue-500 border-blue-600 text-white";
      default:
        return "bg-purple-500 border-purple-600 text-white";
    }
  };

  // Toast icon based on type
  const getToastIcon = () => {
    switch (toast.type) {
      case "success":
        return <Check className="w-5 h-5" />;
      case "error":
        return <X className="w-5 h-5" />;
      case "info":
        return <Bell className="w-5 h-5" />;
      default:
        return <Check className="w-5 h-5" />;
    }
  };

  // Toast position and animation
  const toastPosition = "top-6 right-6";

  return (
    <div className="min-h-screen w-full bg-white relative">
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
          <img src={logo} alt="Payskul" className="w-full max-w-[120px]" />
        </div>
        <nav className="space-y-4 px-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex items-center pl-4 py-3 rounded-full w-full transition-all ${
                item.id === "settings"
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

      {/* MOBILE SIDEBAR */}
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
          <img src={logo} alt="Payskul" className="w-32" />
        </div>

        <nav className="space-y-6 px-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                handleNavigation(item.path);
              }}
              className={`flex items-center pl-5 py-3 rounded-full w-full transition-all ${
                item.id === "settings"
                  ? "bg-white text-purple-700 font-semibold shadow-sm"
                  : "text-white hover:bg-white/20"
              }`}
            >
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

      {/* Toast Notification */}
      {toast.show && (
        <div 
          className={`fixed ${toastPosition} z-50 flex items-center justify-between p-4 rounded-xl shadow-lg border transform transition-all duration-300 animate-slideIn ${getToastStyles()}`}
          style={{ minWidth: "300px", maxWidth: "400px" }}
        >
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              {getToastIcon()}
            </div>
            <p className="font-medium">{toast.message}</p>
          </div>
          <button
            onClick={hideToast}
            className="ml-4 text-white hover:text-gray-200 transition-colors"
            aria-label="Close toast"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* DESKTOP BANNER */}
      <div className="hidden md:block absolute rounded-xl overflow-hidden"
        style={{ width: "1128px", height: "106px", top: "24px", left: "272px" }}>
        <img 
          src={settingsBanner} 
          className="w-full h-full object-cover" 
          alt="Settings Banner"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center pl-8">
          <h1 className="text-white text-4xl font-bold">SETTINGS</h1>
        </div>
      </div>

      {/* MOBILE BANNER */}
      <div className="md:hidden relative rounded-xl overflow-hidden h-32 mt-16 mb-6 mx-4">
        <img 
          src={settingsBanner} 
          className="w-full h-full object-cover" 
          alt="Settings Banner"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center pl-6">
          <h1 className="text-white text-2xl font-bold">SETTINGS</h1>
        </div>
      </div>

      {/* DESKTOP SETTINGS CONTAINER */}
      <div className="hidden md:block absolute bg-white border border-purple-300 rounded-2xl"
        style={{
          width: "1128px",
          height: "934px",
          top: "162px",
          left: "272px",
          borderRadius: "14px",
        }}
      >
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Settings</h2>
          <p className="text-gray-600 mb-8">Toggle your preferences on/off</p>
          
          {/* TOGGLE SETTINGS LIST */}
          <div className="space-y-6 max-w-3xl">
            {toggleItems.map((item) => (
              <div 
                key={item.id}
                className="flex items-center justify-between p-6 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  {item.icon && (
                    <div className="p-3 rounded-lg bg-purple-100">
                      <item.icon className="w-5 h-5 text-purple-600" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{item.label}</h3>
                    <p className="text-gray-500">{item.description}</p>
                  </div>
                </div>
                
                {/* TOGGLE BUTTON */}
                <button
                  onClick={() => handleToggle(item.id)}
                  className={`relative w-16 h-8 rounded-full transition-all duration-300 ${settings[item.id] ? "bg-purple-600" : "bg-gray-300"}`}
                  aria-label={`Toggle ${item.label}`}
                >
                  <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${settings[item.id] ? "translate-x-8" : ""}`} />
                </button>
              </div>
            ))}
          </div>

          {/* SAVE BUTTON */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <button
              onClick={saveAllSettings}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center space-x-2"
            >
              <Settings className="w-5 h-5" />
              <span className="font-semibold">Save All Settings</span>
            </button>
            
            {/* Status display */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Active toggles: {Object.values(settings).filter(Boolean).length} / {Object.keys(settings).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE SETTINGS CONTAINER */}
      <div className="md:hidden bg-white border border-purple-300 rounded-2xl mx-4 mb-8"
        style={{
          borderRadius: "14px",
        }}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Settings</h2>
          <p className="text-gray-600 mb-6">Toggle your preferences on/off</p>
          
          {/* TOGGLE SETTINGS LIST */}
          <div className="space-y-4">
            {toggleItems.map((item) => (
              <div 
                key={item.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4 flex-1">
                  {item.icon && (
                    <div className="p-2 rounded-lg bg-purple-100 flex-shrink-0">
                      <item.icon className="w-5 h-5 text-purple-600" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm">{item.label}</h3>
                    <p className="text-gray-500 text-xs">{item.description}</p>
                  </div>
                </div>
                
                {/* TOGGLE BUTTON */}
                <button
                  onClick={() => handleToggle(item.id)}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0 ml-2 ${settings[item.id] ? "bg-purple-600" : "bg-gray-300"}`}
                  aria-label={`Toggle ${item.label}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${settings[item.id] ? "translate-x-6" : ""}`} />
                </button>
              </div>
            ))}
          </div>

          {/* SAVE BUTTON */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={saveAllSettings}
              className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center justify-center space-x-2"
            >
              <Settings className="w-5 h-5" />
              <span className="font-semibold">Save All Settings</span>
            </button>
            
            {/* Status display */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">
                Active toggles: {Object.values(settings).filter(Boolean).length} / {Object.keys(settings).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for toast animation */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;