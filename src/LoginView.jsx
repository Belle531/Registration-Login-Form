import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, Smartphone, CheckCircle, X } from 'lucide-react';
import AuthLayout from './assets/AuthLayout.jsx';

// ====================================================================
// OIDC CONFIGURATION FOR COGNITO
// Replace placeholder values with your actual Cognito settings
// ====================================================================
// eslint-disable-next-line no-unused-vars
const cognitoAuthConfig = {
  authority: "https://cognito-idp.<REGION>.amazonaws.com/<USER_POOL_ID>",
  client_id: "<APP_CLIENT_ID>",
  redirect_uri: "http://localhost:5176",
  post_logout_redirect_uri: "http://localhost:5176",
  response_type: "code",
  scope: "openid email profile",
  onSigninCallback() {
    window.history.replaceState({}, document.title, "/");
  },
};

// ====================================================================
// SIMPLIFIED LOGIN - Language selected at registration
// ====================================================================

// ====================================================================
// COGNITO OIDC AUTHENTICATION (Enhanced with new features)
// ====================================================================

const LoginView = ({ onLoginSuccess, onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    // Helper functions

    const handleStandardLogin = async () => {
        setIsLoading(true);
        console.log('Attempting standard login:', { email, password, rememberMe });
        setMessage('Authenticating with backend API...');

        // Standard API login call to your backend
        try {
            const response = await fetch('https://cdsback-backend.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    rememberMe: rememberMe
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setMessage(data.message || 'Login successful!');
                // Store the JWT token if provided
                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                }
                // Call success handler with user data
                setTimeout(() => {
                    onLoginSuccess(data.user || { email: email });
                }, 1000);
            } else {
                setMessage(data.error || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Standard login error:', error);
            setMessage('Unable to connect to server');
        } finally {
            setIsLoading(false);
        }
    }    

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleForgotCredentials = () => {
        setMessage('');
        
        if (!email) {
            setMessage('Please enter your email address first, then click "Forgot Username or Password?" to receive recovery instructions.');
            return;
        }

        console.log('Initiating forgot password flow for:', email);
        setMessage('Recovery instructions have been sent to your email address. Please check your inbox and follow the instructions to reset your credentials.');
        
        // In real Cognito implementation, you would call:
        // await Auth.forgotPassword(email);
    };


    return (
        <React.Fragment>
            <div className="w-full bg-slate-800 p-4 shadow-xl fixed top-0 left-0 z-10">
                <div className="flex items-center justify-between w-full gap-4">
                    {/* Spacer to help center title with card */}
                    <div style={{ width: '112px' }}></div>
                    {/* Centered Title */}
                    <div className="flex-1 flex justify-start pl-56">
                        <h1 className="text-3xl font-extrabold text-white text-center tracking-wider mx-auto">
                            Cassandra's Digital Solutions
                        </h1>
                    </div>
                    {/* Header Navigation Buttons (far right) */}
                    <div className="flex space-x-2 text-xs sm:text-sm">
                        <button onClick={() => window.location.href = '/dashboard'} className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 transition-colors">Dashboard</button>
                        <button onClick={() => { localStorage.removeItem('authToken'); window.location.href = '/'; }} className="bg-red-500 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors">Logout</button>
                        <button onClick={() => window.location.href = '/login'} className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 transition-colors">Login</button>
                    </div>
                </div>
            </div>
            <AuthLayout onSwitchToLogin={() => {}}>
                <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
                    <form onSubmit={e => { e.preventDefault(); handleStandardLogin(); }} className="space-y-4">
                        <div className="text-center mb-6">
                            {/* Logo Section - Enhanced */}
                            <div className="mb-4">
                                {/* Logo Container with Animation */}
                                <div className="relative inline-block">
                                    <div className="w-40 h-40 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-300 border-2 border-white">
                                        <span className="text-white font-bold text-4xl tracking-wider">CDS</span>
                                    </div>
                                    {/* Animated Ring */}
                                    <div className="absolute inset-0 rounded-full border-2 border-amber-400 opacity-20 animate-ping"></div>
                                </div>
                            </div>
                            <h2 className="text-2xl font-semibold text-slate-800">
                                Login
                            </h2>
                        </div>
                        {message && (
                            <p className={`p-3 rounded-lg text-center font-medium ${message.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                {message}
                            </p>
                        )}
                        <div>
                            <label htmlFor="login-email" className="block text-sm font-medium text-slate-700 mb-1">Email or Username</label>
                            <input 
                                id="login-email" 
                                type="text" 
                                required 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500"
                                placeholder="Enter your email or username"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="login-password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <input 
                                id="login-password" 
                                type={showPassword ? "text" : "password"}
                                required 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 focus:ring-2"
                                />
                                <span className="ml-2 text-sm text-slate-600">Remember Me</span>
                            </label>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleForgotCredentials(); }}
                               className="text-sm text-amber-600 hover:text-amber-700 hover:underline font-medium">
                                Forgot Username or Password?
                            </a>
                        </div>
                        {/* Standard Login Button Only */}
                        <div className="mt-6">
                            <button type="submit" disabled={isLoading}
                                    className="bg-slate-700 text-white font-bold px-4 py-3 rounded-xl hover:bg-slate-800 active:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-300 shadow-md flex items-center justify-center w-full">
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : null}
                                {isLoading ? 'Authenticating...' : 'Login'}
                            </button>
                        </div>
                        {/* Social Login Options Removed */}
                        <p className="text-center text-sm text-slate-600 pt-4">
                            Don't have an account?
                            <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }}
                               className="font-medium text-amber-600 hover:text-amber-700 ml-1">
                                Register
                            </a>
                        </p>
                    </form>
                </div>
            </AuthLayout>
        </React.Fragment>
    );
}

export default LoginView;