import React from 'react';

/**
 * @param {object} props 
 * @param {React.ReactNode} props.children 
 * @param {Function} props.onSwitchToLogin - 
 */
const AuthLayout = ({ children, onSwitchToLogin }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            
            <header className="w-full bg-slate-800 p-4 shadow-xl fixed top-0 left-0">
                <div className="flex items-center justify-between w-full gap-4">
                    
                    <div style={{ width: '112px' }}></div>
                    
                    <h1 className="text-3xl font-extrabold text-white text-center tracking-wider flex-1">
                        Cassandra's Digital Solutions
                    </h1>
                    
                    <div className="flex space-x-2 text-xs sm:text-sm">
                        <button onClick={onSwitchToLogin} className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 transition-colors">Login</button>
                    </div>
                </div>
            </header>

            
            <div className="mt-24 mb-20 w-full flex justify-center">
                {children}
            </div>
            
            
            <footer className="w-full bg-slate-800 p-4 shadow-xl fixed bottom-0 left-0">
                <p className="text-gray-300 text-center text-sm font-medium font-sans">
                    &copy; 2025 Cassandra's Digital Solutions. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default AuthLayout;