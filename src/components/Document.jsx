import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Home, User, FileText, Users, Settings, Plus, X, Check, Menu, LogOut, AlertCircle } from "lucide-react";
import profileHeader from "../assets/ProfileHeader.jpg";
import logo from "../assets/logo.png";

const Document = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

 
  const [documents, setDocuments] = useState(() => {
    const savedDocs = localStorage.getItem("userDocuments");
    return savedDocs ? JSON.parse(savedDocs) : [
      { id: 1, name: "School Certificate", file: null, date: "---", required: true },
      { id: 2, name: "NYSC Certificate", file: null, date: "---", required: true },
      { id: 3, name: "NIN Document", file: null, date: "---", required: true },
    ];
  });
  
  const [newDocumentName, setNewDocumentName] = useState("");
  const [showAddDocument, setShowAddDocument] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ text: "", type: "" });

  const navItems = [
    { id: "home", label: "Home", icon: Home, path: "/dashboard" },
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
    { id: "documents", label: "Documents", icon: FileText, path: "/documents" },
    { id: "teams", label: "Teams", icon: Users, path: "/teams" },
    { id: "guides", label: "Company Guides", icon: FileText, path: "/guides" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ];

  // Calculate progress
  const uploadProgress = Math.round(
    (documents.filter((d) => d.file).length / documents.length) * 100
  );

  // Save documents to localStorage
  const saveToLocalStorage = (docs) => {
    localStorage.setItem("userDocuments", JSON.stringify(docs));
    
    const uploadedCount = docs.filter(d => d.file).length;
    const totalCount = docs.length;
    const progress = Math.round((uploadedCount / totalCount) * 100);
    localStorage.setItem("documentsProgress", progress.toString());
    
    const uploadedDocs = docs.filter(d => d.file).map(d => d.name);
    localStorage.setItem("uploadedDocuments", JSON.stringify(uploadedDocs));
    
    const notifications = JSON.parse(localStorage.getItem("notifications") || "[]");
    const lastUpload = docs.find(d => d.file && !notifications.some(n => n.text.includes(d.name)));
    
    if (lastUpload) {
      notifications.unshift({
        id: Date.now(),
        text: `Uploaded ${lastUpload.name}: ${lastUpload.file}`,
        date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
        read: false,
        emoji: "📄",
        type: "document"
      });
      localStorage.setItem("notifications", JSON.stringify(notifications));
    }
  };

  const handleFileUpload = (e, id) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setSaveMessage({ 
        text: "File is too large. Maximum size is 5MB.", 
        type: "error" 
      });
      setTimeout(() => setSaveMessage({ text: "", type: "" }), 3000);
      return;
    }

    const updatedDocs = documents.map((doc) =>
      doc.id === id
        ? { 
            ...doc, 
            file: file.name, 
            date: new Date().toLocaleDateString(),
            fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`
          }
        : doc
    );

    setDocuments(updatedDocs);
    saveToLocalStorage(updatedDocs);
    
    setSaveMessage({ 
      text: `✅ ${file.name} uploaded successfully!`, 
      type: "success" 
    });
    setTimeout(() => setSaveMessage({ text: "", type: "" }), 3000);
  };

  const handleAddDocument = () => {
    if (!newDocumentName.trim()) {
      setSaveMessage({ 
        text: "Please enter a document name", 
        type: "error" 
      });
      setTimeout(() => setSaveMessage({ text: "", type: "" }), 3000);
      return;
    }

    const newDoc = {
      id: Date.now(),
      name: newDocumentName.trim(),
      file: null,
      date: "---",
      required: false,
    };

    const updatedDocs = [...documents, newDoc];
    setDocuments(updatedDocs);
    saveToLocalStorage(updatedDocs);
    
    setNewDocumentName("");
    setShowAddDocument(false);
    
    setSaveMessage({ 
      text: `✅ Added "${newDocumentName}" to documents list`, 
      type: "success" 
    });
    setTimeout(() => setSaveMessage({ text: "", type: "" }), 3000);
  };

  const handleRemoveDocument = (id) => {
    const documentToRemove = documents.find(doc => doc.id === id);
    
    if (documentToRemove?.required) {
      setSaveMessage({ 
        text: "Cannot remove required documents", 
        type: "error" 
      });
      setTimeout(() => setSaveMessage({ text: "", type: "" }), 3000);
      return;
    }

    const updatedDocs = documents.filter(doc => doc.id !== id);
    setDocuments(updatedDocs);
    saveToLocalStorage(updatedDocs);
    
    setSaveMessage({ 
      text: `✅ Removed "${documentToRemove?.name}" from list`, 
      type: "success" 
    });
    setTimeout(() => setSaveMessage({ text: "", type: "" }), 3000);
  };

  const handleSaveAll = () => {
    saveToLocalStorage(documents);
    
    setSaveMessage({ 
      text: "✅ All documents saved successfully!", 
      type: "success" 
    });
    setTimeout(() => setSaveMessage({ text: "", type: "" }), 3000);
  };

  const handleClearAll = () => {
    setShowClearModal(true);
  };

  const confirmClearAll = () => {
    const clearedDocs = documents.map(doc => ({
      ...doc,
      file: null,
      date: "---",
      fileSize: null
    }));
    setDocuments(clearedDocs);
    saveToLocalStorage(clearedDocs);
    setShowClearModal(false);
    
    setSaveMessage({ 
      text: "✅ All uploads cleared", 
      type: "success" 
    });
    setTimeout(() => setSaveMessage({ text: "", type: "" }), 3000);
  };

  const cancelClearAll = () => {
    setShowClearModal(false);
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

  const isImageFile = (fileName) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    return imageExtensions.some(ext => fileName.toLowerCase().endsWith(ext));
  };

  const isPDFFile = (fileName) => {
    return fileName.toLowerCase().endsWith('.pdf');
  };

  const getFileIcon = (fileName) => {
    if (!fileName) return "📄";
    if (isImageFile(fileName)) return "🖼️";
    if (isPDFFile(fileName)) return "📕";
    if (fileName.toLowerCase().endsWith('.doc') || fileName.toLowerCase().endsWith('.docx')) return "📝";
    return "📄";
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

     
      <aside className="hidden md:block absolute bg-[#9B6ADE] flex flex-col text-white rounded-xl border border-purple-300"
        style={{
          width: "201px",
          height: "964px",
          top: "24px",
          left: "40px",
          borderRadius: "20px",
        }}>
        
        <div className="flex items-center justify-center mt-10 mb-16 px-4">
          <img src={logo} alt="Logo" className="w-full max-w-[140px]" />
        </div>

        <nav className="space-y-4 px-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center pl-4 py-3 rounded-full w-full transition-all ${
                item.id === "documents"
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
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center pl-5 py-3 rounded-full w-full transition-all ${
                item.id === "documents"
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

      {/* Clear All Confirmation Modal */}
      {showClearModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Clear All Uploads</h3>
                  <p className="text-gray-600 mt-1">Are you sure you want to continue?</p>
                </div>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700 text-sm">
                  <span className="font-semibold">Warning:</span> This action cannot be undone. All uploaded files will be removed from all documents.
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={cancelClearAll}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmClearAll}
                  className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Yes, Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className={`${isMobile ? 'ml-0' : 'md:ml-[280px]'} p-4 md:p-8`}>
        
       {/* BANNER */}
        <div className="relative rounded-xl overflow-hidden h-24 md:h-32 mb-6">
          <img
            src={profileHeader}
            className="w-full h-full object-cover"
            alt="Banner"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent flex items-center pl-4 md:pl-8">
            <h1 className="text-white text-2xl md:text-3xl font-bold">DOCUMENTS</h1>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="bg-white border border-purple-300 rounded-xl p-4 md:p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-lg md:text-xl font-bold text-gray-900">ALL DOCUMENTS</h2>
                {/* Add Document Button */}
                <button
                  onClick={() => setShowAddDocument(true)}
                  className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  <Plus size={16} />
                  <span>Add Document</span>
                </button>
              </div>

              {/* Add Document Form */}
              {showAddDocument && (
                <div className="mb-6 p-4 border border-purple-200 rounded-lg bg-purple-50">
                  <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-3">
                    <input
                      type="text"
                      value={newDocumentName}
                      onChange={(e) => setNewDocumentName(e.target.value)}
                      placeholder="Enter document name"
                      className="flex-1 border border-purple-300 rounded-lg px-4 py-2 text-sm w-full"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddDocument()}
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleAddDocument}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => setShowAddDocument(false)}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">
                    Add custom documents beyond the required ones
                  </p>
                </div>
              )}

              {/* Save Message */}
              {saveMessage.text && (
                <div className={`mb-4 p-3 rounded-lg ${
                  saveMessage.type === "success" 
                    ? "bg-green-50 text-green-700 border border-green-200" 
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                  {saveMessage.text}
                </div>
              )}

              {/* Documents List - Scrollable */}
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className={`flex flex-col md:flex-row items-start md:items-center justify-between border rounded-lg px-4 py-3 gap-3 ${
                      doc.file ? "border-green-300 bg-green-50/50" : "border-purple-200"
                    }`}
                  >
                    {/* NAME & STATUS */}
                    <div className="w-full md:w-2/5">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getFileIcon(doc.file || doc.name)}</span>
                        <div>
                          <p className="font-semibold text-sm text-gray-900">{doc.name}</p>
                          {doc.required && (
                            <span className="text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                              Required
                            </span>
                          )}
                          {!doc.required && (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                              Optional
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* UPLOAD BUTTON */}
                    <div className="w-full md:w-2/5 flex justify-start md:justify-center">
                      {doc.file ? (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                          <span className="text-sm text-green-700 font-medium break-all">
                            {doc.file}
                          </span>
                          {doc.fileSize && (
                            <span className="text-xs text-gray-500">
                              ({doc.fileSize})
                            </span>
                          )}
                          <label className="flex items-center text-blue-600 cursor-pointer text-sm">
                            <Upload size={14} className="mr-1" />
                            Change
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, doc.id)}
                            />
                          </label>
                        </div>
                      ) : (
                        <label className="flex items-center text-purple-600 cursor-pointer space-x-2">
                          <Upload size={16} />
                          <span className="text-sm">Upload</span>
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, doc.id)}
                          />
                        </label>
                      )}
                    </div>

                    {/* DATE & ACTIONS */}
                    <div className="w-full md:w-1/5 flex justify-between md:justify-end items-center space-x-3">
                      <p className={`text-sm ${doc.file ? "text-green-600" : "text-gray-500"}`}>
                        {doc.date}
                      </p>
                      {!doc.required && (
                        <button
                          onClick={() => handleRemoveDocument(doc.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Remove document"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Document Count */}
              <div className="mt-4 text-sm text-gray-600">
                <p>
                  Showing {documents.length} document{documents.length !== 1 ? 's' : ''} • 
                  <span className="text-purple-600 font-medium"> {documents.filter(d => d.required).length} required</span> • 
                  <span className="text-green-600 font-medium"> {documents.filter(d => d.file).length} uploaded</span>
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: PROGRESS + CONTROLS */}
          <div className="w-full lg:w-96">
            <div className="bg-white border border-purple-300 rounded-xl p-5 mb-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
                <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-xl font-bold ${
                  uploadProgress >= 100 
                    ? "border-green-500 text-green-600" 
                    : "border-purple-500 text-purple-600"
                }`}>
                  {uploadProgress}%
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-center sm:text-left">Document Upload Progress</p>
                  <p className="text-xs text-gray-500 mt-1 text-center sm:text-left">
                    {documents.filter(d => d.file).length} of {documents.length} documents uploaded
                  </p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    uploadProgress >= 100 ? "bg-green-500" : "bg-purple-500"
                  }`}
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              
              {/* Requirements Status */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Required documents:</span>
                  <span className={`font-medium ${
                    documents.filter(d => d.required && d.file).length === documents.filter(d => d.required).length
                      ? "text-green-600"
                      : "text-red-600"
                  }`}>
                    {documents.filter(d => d.required && d.file).length}/{documents.filter(d => d.required).length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Optional documents:</span>
                  <span className="font-medium text-blue-600">
                    {documents.filter(d => !d.required && d.file).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white border border-purple-300 rounded-xl p-5 space-y-3">
              <button 
                onClick={handleSaveAll}
                className="w-full bg-purple-600 text-white py-3 rounded-xl text-base font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Check size={18} />
                <span>Save All Documents</span>
              </button>
              
              <button 
                onClick={handleClearAll}
                className="w-full border border-red-300 text-red-600 py-3 rounded-xl text-base font-semibold hover:bg-red-50 transition-colors"
              >
                Clear All Uploads
              </button>
              
              <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                <p>• Maximum file size: 5MB</p>
                <p>• Supported: PDF, Images, Word docs</p>
                <p>• Required documents must be uploaded</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Document;