import React from 'react';

/**
 * AuthLayout Component
 * Provides a consistent header and footer for the Login and Register views.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content (Login or Register form) to display inside the layout.
 */
const AuthLayout = ({ children }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            {/* Header (Slate 800) */}
            <header className="w-full bg-slate-800 p-4 shadow-xl fixed top-0 left-0">
                <h1 className="text-3xl font-extrabold text-white text-center tracking-wider font-sans">
                    Cassandra's Digital Solutions
                </h1>
            </header>

            {/* Content Card Container (Login/Register Forms go here) */}
            <div className="mt-24 mb-20">
                {children}
            </div>
            
            {/* Footer (Slate 800) */}
            <footer className="w-full bg-slate-800 p-4 shadow-xl fixed bottom-0 left-0">
                <p className="text-gray-300 text-center text-sm font-medium font-sans">
                    &copy; 2025 Cassandra's Digital Solutions. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default AuthLayout;