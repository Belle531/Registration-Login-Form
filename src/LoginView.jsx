import React, { useState, useEffect } from 'react';
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
    const [showMFA, setShowMFA] = useState(false);
    const [mfaCode, setMfaCode] = useState('');
    const [showToast, setShowToast] = useState(false);


    // Helper functions
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    
    const handleSocialLogin = (provider) => {
        setMessage(`Redirecting to ${provider} login...`);
        console.log(`Initiating ${provider} social login`);
        // In real implementation, redirect to social provider
    };

    const handleMFAVerification = (e) => {
        e.preventDefault();
        if (!mfaCode || mfaCode.length !== 6) {
            setMessage('Error: Please enter a valid 6-digit code');
            return;
        }
        
        setIsLoading(true);
        console.log('Verifying MFA code:', mfaCode);
        
        // Mock MFA verification
        setTimeout(() => {
            setIsLoading(false);
            setMessage('Login successful! Redirecting to dashboard...');
            
            // Show styled toast notification
            setShowToast(true);
            
            // Auto-hide toast and redirect (extended to 6 seconds)
            setTimeout(() => {
                setShowToast(false);
                setTimeout(() => {
                    onLoginSuccess();
                }, 500);
            }, 6000);
        }, 2000);
    };

    // Handle OIDC login success
    useEffect(() => {
        const handleOIDCSuccess = () => {
            onLoginSuccess();
        };
        window.addEventListener('oidc-login-success', handleOIDCSuccess);
        return () => window.removeEventListener('oidc-login-success', handleOIDCSuccess);
    }, [onLoginSuccess]);

    const handleCognitoLogin = (e) => {
        e.preventDefault();
        setMessage('');

        // Basic validation
        if (!email || !password) {
            setMessage('Error: Please fill in all fields');
            return;
        }

        setIsLoading(true);
        console.log('Attempting Cognito OIDC login:', { email, password, rememberMe });
        setMessage('Authenticating with Cognito...');

        // Mock Cognito authentication with MFA simulation
        setTimeout(() => {
            // Always require MFA verification
            setIsLoading(false);
            setShowMFA(true);
            setMessage('MFA verification required. Check your authenticator app.');
        }, 2000);
    };

    const handleStandardLogin = async () => {
        setMessage('');

        // Basic validation
        if (!email || !password) {
            setMessage('Error: Please fill in all fields');
            return;
        }

        setIsLoading(true);
        console.log('Attempting standard login:', { email, password, rememberMe });
        setMessage('Authenticating with backend API...');

        // Standard API login call to your backend
        try {
            const response = await fetch('http://localhost:3001/login', {
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
    };

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

    // Inline Success Alert Component (appears in MFA form)
    const MFASuccessAlert = () => (
        <div className={`transform transition-all duration-700 ${
            showToast ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-4'
        }`}>
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl border-2 border-green-400 mb-4 relative overflow-hidden">
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
                
                <div className="relative flex items-center space-x-3">
                    <div className="flex-shrink-0">
                        <CheckCircle className="w-7 h-7 text-white animate-bounce" />
                    </div>
                    <div className="flex-grow">
                        <p className="font-bold text-lg">🎉 Cognito Login Success!</p>
                        <p className="text-sm opacity-90 mt-1">MFA authentication completed successfully</p>
                        <p className="text-xs opacity-75 mt-1">Redirecting to dashboard in a moment...</p>
                    </div>
                    <button 
                        onClick={() => setShowToast(false)}
                        className="flex-shrink-0 ml-2 text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white hover:bg-opacity-20"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <AuthLayout onSwitchToLogin={() => {}}>
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100">


                {showMFA ? (
                    // MFA Verification Form
                    <form onSubmit={handleMFAVerification} className="space-y-4">
                        <div className="text-center mb-6">
                            <div className="mb-4">
                                <div className="relative inline-block">
                                    <div className="w-16 h-16 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-300 border-2 border-white">
                                        <Smartphone className="text-white w-8 h-8" />
                                    </div>
                                    <div className="absolute inset-0 rounded-full border-2 border-amber-400 opacity-20 animate-ping"></div>
                                </div>
                            </div>
                            <h2 className="text-2xl font-semibold text-slate-800">Enter Verification Code</h2>
                            <p className="text-sm text-gray-600 mt-2">We've sent a code to your device</p>
                        </div>

                        {message && (
                            <p className={`p-3 rounded-lg text-center font-medium ${message.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                {message}
                            </p>
                        )}

                        <div>
                            <label htmlFor="mfa-code" className="block text-sm font-medium text-slate-700 mb-1">Verification Code</label>
                            <input 
                                id="mfa-code" 
                                type="text" 
                                required 
                                maxLength="6"
                                value={mfaCode} 
                                onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500 text-center text-lg tracking-widest"
                                placeholder="000000"
                            />
                        </div>

                        {/* Success Alert - appears right after code input */}
                        {showToast && <MFASuccessAlert />}

                        <button type="submit" disabled={isLoading}
                                className="w-full bg-amber-500 text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                            {isLoading ? 'Verifying...' : 'Verify'}
                        </button>

                        <div className="text-center">
                            <button type="button" onClick={() => setShowMFA(false)}
                                    className="text-sm text-amber-600 hover:text-amber-700 hover:underline">
                                Back to Login
                            </button>
                        </div>
                    </form>
                ) : (
                    // Main Login Form
                    <form onSubmit={handleCognitoLogin} className="space-y-4">
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
                                Cognito OIDC Login
                            </h2>
                        </div>

                        {message && (
                            <p className={`p-3 rounded-lg text-center font-medium ${message.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                {message}
                            </p>
                        )}
                        
                        <div>
                            <label htmlFor="cognito-email" className="block text-sm font-medium text-slate-700 mb-1">Email or Username</label>
                            <input 
                                id="cognito-email" 
                                type="text" 
                                required 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500"
                                placeholder="Enter your email or username"
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="cognito-password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <input 
                                id="cognito-password" 
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

                        {/* Two Login Options */}
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <button type="submit" disabled={isLoading}
                                    className="bg-amber-500 text-slate-900 font-bold px-4 py-3 rounded-xl hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : null}
                                {isLoading ? 'Authenticating...' : 'Cognito OIDC'}
                            </button>
                            
                            <button type="button" onClick={() => handleStandardLogin()}
                                    className="bg-slate-700 text-white font-bold px-4 py-3 rounded-xl hover:bg-slate-800 active:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-300 shadow-md flex items-center justify-center">
                                Standard Login
                            </button>
                        </div>

                        {/* Social Login Options */}
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or sign in with:</span>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-3 gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleSocialLogin('Google')}
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleSocialLogin('Microsoft')}
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#f25022" d="M1 1h10v10H1z"/>
                                        <path fill="#00a4ef" d="M13 1h10v10H13z"/>
                                        <path fill="#7fba00" d="M1 13h10v10H1z"/>
                                        <path fill="#ffb900" d="M13 13h10v10H13z"/>
                                    </svg>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleSocialLogin('Apple')}
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12.017 0C8.396 0 8.006.333 8.006 4.297c0 3.381.623 4.628 4.011 4.628s4.011-1.247 4.011-4.628C16.028.333 15.638 0 12.017 0zm-.017 23.989c-3.75 0-6.001-1.24-6.001-4.989 0-3.75 2.251-4.989 6.001-4.989s6.001 1.239 6.001 4.989c0 3.749-2.251 4.989-6.001 4.989z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        
                        <p className="text-center text-sm text-slate-600 pt-4">
                            Don't have an account?
                            <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }}
                               className="font-medium text-amber-600 hover:text-amber-700 ml-1">
                                Register
                            </a>
                        </p>
                    </form>
                )}
            </div>
        </AuthLayout>
    );
};

export default LoginView;