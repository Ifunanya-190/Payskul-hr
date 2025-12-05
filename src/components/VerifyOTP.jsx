import React, { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import verifyOTP from '../assets/VerifyOTP.png';

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || 'johndoe@gmail.com';

  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState(''); // Will hold "12345"
  
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join('');

    if (otpCode.length !== 5) {
      setError('Please enter all 5 digits');
      const emptyIndex = otp.findIndex(digit => digit === '');
      if (emptyIndex !== -1) {
        inputRefs.current[emptyIndex]?.focus();
      } else {
        inputRefs.current[0]?.focus();
      }
      return;
    }

    const storedOTP = localStorage.getItem('otp');
    const storedEmail = localStorage.getItem('otpEmail');
    const otpExpiry = localStorage.getItem('otpExpiry');

    if (Date.now() > parseInt(otpExpiry || '0')) {
      setError('OTP has expired. Please request a new one.');
      return;
    }

    if (otpCode !== storedOTP || email !== storedEmail) {
      setError('Invalid OTP. Please try again.');
      return;
    }

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessModal(true);

      // Clean up OTP after success
      localStorage.removeItem('otp');
      localStorage.removeItem('otpEmail');
      localStorage.removeItem('otpExpiry');
    }, 1500);
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleResendOTP = () => {
    const newOTP = Math.floor(10000 + Math.random() * 90000).toString();

    // Store new OTP
    localStorage.setItem('otp', newOTP);
    localStorage.setItem('otpEmail', email);
    localStorage.setItem('otpExpiry', Date.now() + 10 * 60 * 1000); // 10 min

    // Show OTP in toast for 15 seconds
    setNotificationMessage(newOTP);
    setShowNotification(true);

    // Auto-hide after 15 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 15000);
  };

  return (
    <>
      {/* Main Layout */}
      <div className="h-screen bg-white flex overflow-hidden">
        {/* Image Section */}
        <div className="hidden lg:flex lg:w-2/5 h-full items-center justify-end">
          <div className="w-full h-5/6 overflow-hidden rounded-r-3xl mr-[-25px]">
            <img
              src={verifyOTP}
              alt="PaySkul Background"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-3/5 h-full flex flex-col justify-center p-4 sm:p-6 md:p-8">
          <div className="w-full max-w-md mx-auto">
            {/* Back Link */}
            <div className="mb-10">
              <Link
                to="/forgot-password"
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
              <h1 className="text-2xl font-bold text-gray-800">Verify OTP</h1>
              <p className="text-sm text-gray-600 mt-2">
                We have shared a code to your registered email address
              </p>
              <p className="text-sm font-medium text-purple-600 mt-1">{email}</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* OTP Inputs */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Enter the 5-digit code
                </label>
                <div className="flex justify-between space-x-2">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength="1"
                      value={otp[index]}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`w-16 h-16 text-center text-2xl font-bold border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition-all duration-200 ${
                        error ? 'border-red-300 focus:border-red-500' : 'border-purple-300'
                      }`}
                      disabled={showSuccessModal}
                    />
                  ))}
                </div>
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                disabled={isLoading || showSuccessModal}
                className="w-full bg-purple-500 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-purple-600 disabled:bg-purple-400 transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </>
                ) : showSuccessModal ? (
                  'Verified'
                ) : (
                  'Verify OTP'
                )}
              </button>

              {/* Resend OTP */}
              <div className="text-center pt-2">
                <p className="text-sm text-gray-600">
                  Didn't receive the code?{' '}
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    className="text-purple-600 font-medium hover:text-purple-800 transition-colors bg-transparent border-none cursor-pointer underline"
                  >
                    Resend OTP
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* OTP Toast Notification - Shows OTP for 15 seconds */}
      {showNotification && (
        <div className="fixed inset-0 flex items-start justify-center pt-8 z-50 pointer-events-none">
          <div className="animate-bounce-in bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-2xl p-6 max-w-sm w-full pointer-events-auto border border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">Lock Open</div>
                <div>
                  <p className="text-lg font-bold">Your OTP Code</p>
                  <p className="text-4xl font-mono tracking-widest mt-2">{notificationMessage}</p>
                  <p className="text-xs opacity-90 mt-2">Valid for 10 minutes • Auto-hides in 15s</p>
                </div>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Password Updated Successfully
              </h2>
              <p className="text-gray-600 mb-6">
                Your password has been updated successfully
              </p>
              <button
                onClick={handleBackToLogin}
                className="w-full bg-purple-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-600 transition-all duration-200 shadow-sm hover:shadow"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bounce-in Animation Styles */}
      <style jsx>{`
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(-20px);
          }
          60% {
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </>
  );
};

export default VerifyOTP;