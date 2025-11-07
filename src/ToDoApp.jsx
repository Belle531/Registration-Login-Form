import React from 'react';

const ToDoApp = ({ onBackToDashboard }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <header className="w-full bg-slate-800 p-4 shadow-xl fixed top-0 left-0">
                <h1 className="text-3xl font-extrabold text-white text-center tracking-wider">
                    Cassandra's Digital Solutions - ToDo App
                </h1>
            </header>

            {/* Logo Section - Enhanced */}
            <div className="mt-20 mb-8 text-center">
                {/* Logo Container with Animation */}
                <div className="relative inline-block">
                    <div className="w-28 h-28 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300 border-4 border-white">
                        <span className="text-white font-bold text-3xl tracking-wider">CDS</span>
                    </div>
                    {/* Animated Ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-amber-400 opacity-20 animate-ping"></div>
                </div>
            </div>

            {/* 
                PLACEHOLDER FOR YOUR TODO APP CODE
                Add your own ToDo app implementation here
                Available props: onBackToDashboard
            */}
            <div className="mt-4 mb-20 flex-1 w-full max-w-4xl">
                <div className="bg-white rounded-2xl shadow-2xl p-8 w-full border border-gray-100 text-center">
                    <h2 className="text-2xl font-semibold text-slate-800 mb-6">ToDo App Placeholder</h2>
                    <p className="text-slate-600 mb-6">Your ToDo app implementation will go here</p>
                    
                    <div className="flex justify-center">
                        <button
                            onClick={onBackToDashboard}
                            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            ← Back to Dashboard
                        </button>
                    </div>
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

export default ToDoApp;