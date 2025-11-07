import React from 'react';

/**
 * Welcome Component
 * Shows the welcome screen after successful login
 */
const Welcome = ({ user, handleLogout, onGoToDashboard, onSwitchToLogin }) => {
    // Display full name if available, otherwise use email username, or fallback to 'User'
    const getDisplayName = () => {
        if (user?.firstName && user?.lastName) {
            return `${user.firstName} ${user.lastName}`;
        } else if (user?.firstName) {
            return user.firstName;
        } else if (user?.email) {
            return user.email.split('@')[0];
        }
        return 'User';
    };
    
    const userName = getDisplayName();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <header className="w-full bg-slate-800 p-4 shadow-xl fixed top-0 left-0">
                <div className="flex items-center justify-between">
                    {/* Spacer to balance the layout */}
                    <div className="flex space-x-2 opacity-0 pointer-events-none">
                        <button className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg text-xs">Welcome</button>
                        <button className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg text-xs">Dashboard</button>
                        <button className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg text-xs">Logout</button>
                        <button className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg text-xs">Login</button>
                    </div>
                    
                    <h1 className="text-3xl font-extrabold text-white text-center tracking-wider">
                        Cassandra's Digital Solutions
                    </h1>
                    
                    {/* Header Navigation Buttons */}
                    <div className="flex space-x-2">
                        <button
                            onClick={() => {/* Already on Welcome page */}}
                            className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md transition-colors text-xs opacity-75 cursor-default"
                        >
                            Welcome
                        </button>
                        <button
                            onClick={onGoToDashboard}
                            className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md transition-colors text-xs"
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => {
                                if (window.confirm('Are you sure you want to logout? You will need to login again to access your account.')) {
                                    handleLogout();
                                }
                            }}
                            className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md transition-colors text-xs"
                        >
                            Logout
                        </button>
                        <button
                            onClick={onSwitchToLogin}
                            className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md transition-colors text-xs"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </header>

            {/* Logo Section */}
            <div className="mt-8 mb-8 text-center">
                <div className="relative inline-block">
                    <div className="w-40 h-40 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300 border-4 border-white">
                        <span className="text-white font-bold text-4xl tracking-wider">CDS</span>
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-amber-400 opacity-20 animate-ping"></div>
                </div>
            </div>

            {/* Welcome Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-xl text-center border-b-8 border-amber-500 mb-20">
                
                {/* Main Title */}
                <div className="flex flex-col items-center justify-center mb-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                        Welcome!
                    </h1>
                </div>

                {/* Personalized Greeting */}
                <p className="text-xl text-slate-600 mb-8">
                    <span className="font-extrabold text-indigo-600 capitalize">{userName}</span>
                </p>

                {/* Navigation Buttons */}
                <div className="grid grid-cols-1 gap-4">
                    {/* Primary Call to Action */}
                    <button
                        onClick={onGoToDashboard}
                        className="w-full bg-amber-500 text-white font-bold text-lg px-6 py-3 rounded-xl hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-lg transition-all duration-200 transform hover:scale-[1.01]"
                    >
                        Proceed to Dashboard
                    </button>
                </div>
            </div>

            <footer className="w-full bg-slate-800 p-4 shadow-xl fixed bottom-0 left-0">
                <p className="text-gray-300 text-center text-sm font-medium font-sans">
                    &copy; 2025 Cassandra's Digital Solutions. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default Welcome;
