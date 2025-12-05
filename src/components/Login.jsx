import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import logo from '../assets/logo.png';
import lockkey from '../assets/lockKey.png';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Load remembered email on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData(prev => ({
        ...prev,
        email: rememberedEmail,
        rememberMe: true
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Find user
      const user = users.find(user => 
        user.email === formData.email && user.password === formData.password
      );

      if (user) {
        // If remember me is checked, store email
        if (formData.rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        // Store current user session
        localStorage.setItem('currentUser', JSON.stringify({
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          team: user.team
        }));

        // Store login timestamp
        localStorage.setItem('lastLogin', new Date().toISOString());

        console.log('Login successful:', user);
        setIsLoading(false);
        
        // Redirect to dashboard
        navigate('/dashboard'); // Change this to your desired redirect path
        
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
      }
    }, 1500);
  };

  // Check if user is already logged in
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      // Optional: You can redirect to dashboard if user is already logged in
      // navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="h-screen bg-white flex overflow-hidden">
      {/* Image Section */}
      <div className="hidden lg:flex lg:w-2/5 h-full items-center justify-end">
        <div className="w-full h-5/6 overflow-hidden rounded-r-3xl mr-[-25px]">
          <img 
            src={lockkey} 
            alt="PaySkul Background" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Login Form Section */}
      <div className="w-full lg:w-3/5 h-full flex flex-col justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex flex-col items-start">
              <div className="relative mb-3">
                <img 
                  src={logo} 
                  alt="PaySkul" 
                  className="h-12 w-auto filter grayscale brightness-50"
                />
              </div>
              <div>
                <h1 className="text-lg font-medium text-gray-800">Welcome back! 👋</h1>
                <p className="text-sm text-gray-600">Please login here</p>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition-all duration-200 outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute -top-2 left-3 bg-white px-1">
                <label className="text-[10px] font-medium text-gray-500">
                  Password
                </label>
              </div>
              <div className="relative mt-1">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-4 h-4 text-purple-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-10 py-2.5 text-sm border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition-all duration-200 outline-none"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 text-purple-600 border-purple-300 rounded focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition-all duration-200 outline-none"
                />
                <span className="ml-2 text-gray-700">Remember Me</span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-purple-600 hover:text-purple-800 transition-colors font-medium"
              >
                Forget Password
              </Link>
            </div>

            {/* Login Button */}
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
                  Signing in...
                </>
              ) : (
                'Login'
              )}
            </button>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white text-xs text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login Links */}
            <div className="flex justify-center space-x-4">
              {/* Google Link */}
              <a 
                href="https://accounts.google.com/signin" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </a>
              
              {/* Apple Link */}
              <a 
                href="https://appleid.apple.com/sign-in" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-black rounded-full hover:bg-gray-900 transition-colors outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.666-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.787-.94 1.324-2.245 1.171-3.54-1.133.052-2.518.754-3.334 1.701-.735.85-1.389 2.207-1.208 3.514 1.26.091 2.544-.638 3.371-1.675z"/>
                </svg>
              </a>
            </div>

            {/* Sign Up Link */}
            <div className="text-center pt-3">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link 
                  to="/" 
                  className="text-purple-600 font-medium hover:text-purple-800 transition-colors outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 rounded"
                >
                  Click here to Sign-Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;