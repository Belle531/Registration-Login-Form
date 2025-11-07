import React, { useState } from 'react';
import LoginView from './LoginView.jsx';
import RegisterView from './RegisterView.jsx';

function App() {
    const [currentView, setCurrentView] = useState('register'); // 'login', 'register', 'dashboard'
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        setCurrentView('dashboard');
    };

    const handleRegisterSuccess = () => {
        setCurrentView('login');
        alert("Registration successful! Please log in with your new account.");
    };

    const handleSwitchToRegister = () => {
        setCurrentView('register');
    };

    const handleSwitchToLogin = () => {
        setCurrentView('login');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setCurrentView('login');
    };

    // If authenticated, show a simple dashboard
    if (isAuthenticated && currentView === 'dashboard') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
                {/* Header (Slate 800) */}
                <header className="w-full bg-slate-800 p-4 shadow-xl fixed top-0 left-0">
                    <h1 className="text-3xl font-extrabold text-white text-center tracking-wider">
                        Cassandra's Digital Solutions
                    </h1>
                </header>

                {/* Dashboard Content */}
                <div className="mt-20 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
                    <h2 className="text-2xl font-semibold text-slate-800 text-center mb-6">
                        Welcome to Your Dashboard! 🎉
                    </h2>
                    <p className="text-slate-600 text-center mb-6">
                        You have successfully logged in to Cassandra's Digital Solutions.
                    </p>
                    <div className="space-y-4">
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <h3 className="font-semibold text-amber-800 mb-2">Quick Stats</h3>
                            <p className="text-amber-700 text-sm">✓ Profile Complete</p>
                            <p className="text-amber-700 text-sm">✓ Account Verified</p>
                            <p className="text-amber-700 text-sm">✓ Ready to go!</p>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="w-full bg-slate-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-slate-700 active:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 shadow-md">
                            Logout
                        </button>
                    </div>
                </div>

                {/* Footer (Slate 800) */}
                <footer className="w-full bg-slate-800 p-4 shadow-xl fixed bottom-0 left-0">
                    <p className="text-gray-300 text-center text-sm font-medium">
                        &copy; 2025 Cassandra's Digital Solutions. All rights reserved.
                    </p>
                </footer>
            </div>
        );
    }

    // Show Login View
    if (currentView === 'login') {
        return (
            <LoginView 
                onLoginSuccess={handleLoginSuccess}
                onSwitchToRegister={handleSwitchToRegister}
            />
        );
    }

    // Show Register View
    if (currentView === 'register') {
        return (
            <RegisterView 
                onRegisterSuccess={handleRegisterSuccess}
                onSwitchToLogin={handleSwitchToLogin}
            />
        );
    }

    return null;
}

export default App;