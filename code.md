import React from 'react';
import { Settings, Calendar, ChefHat, TrendingUp, Cloud, LogOut, Briefcase } from 'lucide-react';

const Dashboard = ({ handleLogout, onGoToToDo, onGoToDashboard, onGoToWelcome, onGoToWeather, onGoToRegister }) => {

    // Helper component for the professional-looking card/tile
    const AppTile = ({ title, description, icon: Icon, onClick, color }) => {
        // Define base colors based on the main color prop
        const colorClass = {
            purple: { text: 'text-purple-600', ring: 'focus:ring-purple-300', bg: 'bg-purple-100' },
            sky: { text: 'text-sky-600', ring: 'focus:ring-sky-300', bg: 'bg-sky-100' },
            amber: { text: 'text-amber-600', ring: 'focus:ring-amber-300', bg: 'bg-amber-100' },
            orange: { text: 'text-orange-600', ring: 'focus:ring-orange-300', bg: 'bg-orange-100' },
            slate: { text: 'text-slate-600', ring: 'focus:ring-slate-300', bg: 'bg-slate-100' },
        }[color] || colorClass.slate; // Default to slate if color is undefined

        return (
            <button
                onClick={onClick}
                className={`flex items-center p-5 rounded-xl shadow-lg transition-all duration-300 
                            transform hover:scale-[1.02] text-left border border-gray-200 bg-white 
                            focus:outline-none focus:ring-4 ${colorClass.ring}`}
            >
                {/* Icon Circle/Badge */}
                <div className={`p-3 rounded-full mr-4 ${colorClass.bg} flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${colorClass.text}`} />
                </div>
                
                <div className="flex flex-col items-start">
                    <span className="text-xl font-bold text-slate-800 transition-colors duration-200">{title}</span>
                    <span className="text-sm font-medium text-gray-500">{description}</span>
                </div>
            </button>
        );
    };

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
                    {/* Left side: Simplified Company Name */}
                    <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-wider truncate">
                        Cassandra's Digital Solutions
                    </h1>
                    
                    {/* Header Navigation Buttons */}
                    <div className="flex space-x-2 text-xs sm:text-sm">
                        <button onClick={onGoToWelcome} className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 transition-colors">Welcome</button>
                        <button onClick={onGoToDashboard} className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 transition-colors">Dashboard</button>
                        <button onClick={handleLogout} className="bg-red-500 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-1">
                            <LogOut size={16} className="hidden sm:inline" />
                            <span>Logout</span>
                        </button>
                        {/* Assuming login action also initiates logout for security */}
                        <button onClick={handleLogout} className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 transition-colors">Login</button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center p-4 pt-24 pb-20 fade-in">
                
                {/* Logo Section - Smaller and more refined */}
                <div className="mt-8 mb-8 text-center">
                    <div className="relative inline-block">
                        <div className="w-32 h-32 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300 border-4 border-white">
                            <span className="text-white font-bold text-3xl tracking-wider">CDS</span>
                        </div>
                        <div className="absolute inset-0 rounded-full border-2 border-amber-400 opacity-20 animate-ping"></div>
                    </div>
                </div>
                
                {/* Welcome and Status Area */}
                <div className="w-full max-w-5xl text-center mb-10">
                    <h2 className="text-4xl font-extrabold text-slate-800 mb-2">
                        Welcome to the Dashboard
                    </h2>
                    <p className="text-lg text-gray-600 font-medium">Your personalized access portal to all application features.</p>
                </div>

                {/* Application Access Grid - The main card area */}
                <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-5xl border border-gray-100">
                    
                    <h3 className="text-2xl font-bold text-slate-700 mb-6 border-b pb-3 flex items-center">
                        <Briefcase className="w-6 h-6 mr-2 text-slate-500" /> Application Access Portal
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* 1. ToDo App */}
                        <AppTile 
                            title="To-Do Task Manager"
                            description="Manage your daily objectives efficiently and stay organized."
                            icon={TrendingUp}
                            onClick={onGoToToDo}
                            color="purple"
                        />

                        {/* 2. Weather App */}
                        <AppTile 
                            title="Weather Forecast"
                            description="Plan your day with real-time weather insights."
                            icon={Cloud}
                            onClick={onGoToWeather}
                            color="sky"
                        />

                        {/* 3. Registration Form */}
                        <AppTile 
                            title="Account Registration"
                            description="Create a new account or update your access details."
                            icon={Calendar}
                            onClick={onGoToRegister}
                            color="amber"
                        />

                        {/* 4. The Spice Rack - Recipe Community App (using a placeholder action) */}
                        <AppTile 
                            title="The Spice Rack"
                            description="Search, save, and share recipes with the community."
                            icon={ChefHat}
                            onClick={() => console.log('The Spice Rack coming soon!')} // Replaced alert()
                            color="orange"
                        />

                        {/* 5. Placeholder Tile - Analytics */}
                        <AppTile 
                            title="System Analytics"
                            description="View performance metrics and user activity reports."
                            icon={Settings}
                            onClick={() => console.log('Analytics coming soon!')}
                            color="slate"
                        />
                         {/* 6. Placeholder Tile - Documents */}
                        <AppTile 
                            title="Document Storage"
                            description="Securely access and manage all your documents."
                            icon={Briefcase}
                            onClick={() => console.log('Documents coming soon!')}
                            color="sky"
                        />
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full bg-slate-800 p-4 shadow-xl mt-auto">
                <p className="text-gray-300 text-center text-sm font-medium font-sans">
                    &copy; 2025 Cassandra's Digital Solutions. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default Dashboard;