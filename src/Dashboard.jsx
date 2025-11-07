import React from 'react';
import { Activity, Calendar, Bell, TrendingUp, Settings } from 'lucide-react';

const Dashboard = ({ handleLogout, onGoToToDo, onGoToDashboard, onGoToWelcome }) => {

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-inter">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
                .font-inter { font-family: 'Inter', sans-serif; }
                .fade-in { animation: fadeIn 0.8s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
            
            {/* Header */}
            <header className="w-full bg-slate-800 p-4 shadow-xl fixed top-0 left-0 z-10">
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
                            onClick={onGoToWelcome}
                            className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md transition-colors text-xs"
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
                            onClick={() => {
                                if (window.confirm('Are you sure you want to go to the login page? You will be logged out.')) {
                                    handleLogout();
                                }
                            }}
                            className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md transition-colors text-xs"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center p-4 pt-24 pb-20 fade-in">
                
                {/* Logo Section */}
                <div className="mt-8 mb-8 text-center">
                    <div className="relative inline-block">
                        <div className="w-40 h-40 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300 border-4 border-white">
                            <span className="text-white font-bold text-4xl tracking-wider">CDS</span>
                        </div>
                        <div className="absolute inset-0 rounded-full border-2 border-amber-400 opacity-20 animate-ping"></div>
                    </div>
                </div>
                
                {/* Welcome and Status Area */}
                <div className="w-full max-w-4xl text-center mb-10">
                    <h2 className="text-4xl font-extrabold text-slate-800 mb-2">
                        Dashboard!
                    </h2>
                </div>

                {/* Application Access Grid */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-4xl border border-gray-200">
                    
                    <h3 className="text-2xl font-bold text-slate-700 mb-6 border-b pb-3">
                        <Activity className="inline w-6 h-6 mr-2 text-slate-500" /> Feature Access Portal
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        
                        {/* 1. ToDo App */}
                        <button
                            onClick={onGoToToDo}
                            className="flex flex-col items-start p-5 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.03] text-left border-2 border-transparent bg-purple-600 hover:bg-purple-700 focus:ring-purple-300 focus:outline-none focus:ring-4"
                        >
                            <TrendingUp className="w-6 h-6 text-white mb-2" />
                            <span className="text-xl font-extrabold text-white">To-Do Task Manager</span>
                            <span className="text-sm font-medium text-white opacity-80">Manage your daily objectives efficiently.</span>
                        </button>
                        
                        {/* 2. Settings */}
                        <button
                            onClick={() => alert('Settings feature coming soon!')}
                            className="flex flex-col items-start p-5 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.03] text-left border-2 border-transparent bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 focus:outline-none focus:ring-4"
                        >
                            <Settings className="w-6 h-6 text-white mb-2" />
                            <span className="text-xl font-extrabold text-white">Account Settings</span>
                            <span className="text-sm font-medium text-white opacity-80">View and manage your user profile.</span>
                        </button>

                        {/* 3. Calendar */}
                        <button
                            onClick={() => alert('Calendar feature coming soon!')}
                            className="flex flex-col items-start p-5 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.03] text-left border-2 border-transparent bg-amber-500 hover:bg-amber-600 focus:ring-amber-300 focus:outline-none focus:ring-4"
                        >
                            <Calendar className="w-6 h-6 text-white mb-2" />
                            <span className="text-xl font-extrabold text-white">Calendar</span>
                            <span className="text-sm font-medium text-white opacity-80">Schedule and track your appointments.</span>
                        </button>
                        
                        {/* 4. Notifications */}
                        <button
                            onClick={() => alert('Notifications feature coming soon!')}
                            className="flex flex-col items-start p-5 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.03] text-left border-2 border-transparent bg-gray-600 hover:bg-gray-700 focus:ring-gray-300 focus:outline-none focus:ring-4"
                        >
                            <Bell className="w-6 h-6 text-white mb-2" />
                            <span className="text-xl font-extrabold text-white">Notifications</span>
                            <span className="text-sm font-medium text-white opacity-80">Stay updated with important alerts.</span>
                        </button>
                        
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full bg-slate-800 p-4 shadow-xl fixed bottom-0 left-0 z-10">
                <p className="text-gray-300 text-center text-sm font-medium font-sans">
                    &copy; 2025 Cassandra's Digital Solutions. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default Dashboard;