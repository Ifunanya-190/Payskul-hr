import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import fPassword from '../assets/FPassword.jpg';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError('');
    
    // Check if email exists in localStorage
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!storedUser.email || storedUser.email !== email) {
      setEmailError('Email not found in our system');
      return;
    }
    
    setIsLoading(true);
    
    // Generate OTP
    const otp = Math.floor(10000 + Math.random() * 90000).toString(); // 5-digit OTP
    localStorage.setItem('otp', otp);
    localStorage.setItem('otpEmail', email);
    localStorage.setItem('otpExpiry', Date.now() + 10 * 60 * 1000); // 10 minutes expiry
    
    console.log('OTP generated:', otp); // For testing
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to Verify OTP page with email
      navigate('/verify-otp', { state: { email } });
    }, 1500);
  };

  return (
    <div className="h-screen bg-white flex overflow-hidden">
      {/* Image Section */}
      <div className="hidden lg:flex lg:w-2/5 h-full items-center justify-end">
        <div className="w-full h-5/6 overflow-hidden rounded-r-3xl mr-[-25px]">
          <img 
            src={fPassword} 
            alt="PaySkul Background" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Forgot Password Form Section */}
      <div className="w-full lg:w-3/5 h-full flex flex-col justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md mx-auto">
          {/* Back Link */}
          <div className="mb-10">
            <Link 
              to="/login" 
              className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors font-medium text-sm"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Forgot Password</h1>
            <p className="text-sm text-gray-600 mt-2">
              Enter your email address and we'll send you an OTP to reset your password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <div className="absolute -top-2 left-3 bg-white px-1">
                <label className="text-[10px] font-medium text-gray-500">
                  Email Address
                </label>
              </div>
              <div className="relative mt-1">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Mail className="w-4 h-4 text-purple-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition-all duration-200 outline-none"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Error Message */}
            {emailError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {emailError}
              </div>
            )}

            {/* Send OTP Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-500 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-purple-600 disabled:bg-purple-400 transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Send OTP'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;