import React from 'react';
import { User, Activity, CheckCircle, Clock, Calendar, Bell, TrendingUp, Settings } from 'lucide-react';

const Dashboard = ({ onBackToWelcome }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <header className="w-full bg-slate-800 p-4 shadow-xl fixed top-0 left-0">
                <div className="flex items-center justify-between">
                    {/* Spacer to balance the layout */}
                    <div className="flex space-x-2 opacity-0 pointer-events-none">
                        <button className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg text-xs">Dashboard</button>
                        <button className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg text-xs">Logout</button>
                        <button className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg text-xs">Login</button>
                    </div>
                    
                    <h1 className="text-3xl font-extrabold text-white text-center tracking-wider">
                        Welcome to Cassandra's Digital Solutions
                    </h1>
                    
                    {/* Header Navigation Buttons */}
                    <div className="flex space-x-2">
                        <button
                            onClick={onBackToWelcome}
                            className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md transition-colors text-xs"
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => {
                                if (window.confirm('Are you sure you want to logout?')) {
                                    window.location.href = '/';
                                }
                            }}
                            className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md transition-colors text-xs"
                        >
                            Logout
                        </button>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md transition-colors text-xs"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </header>

            <div className="mt-20 mb-8 text-center">
                <div className="relative inline-block">
                    <div className="w-28 h-28 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300 border-4 border-white">
                        <span className="text-white font-bold text-3xl tracking-wider">CDS</span>
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-amber-400 opacity-20 animate-ping"></div>
                </div>
            </div>

            <div className="mt-4 mb-20 flex-1 w-full max-w-7xl px-4">
                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    
                    {/* Welcome Card */}
                    <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl shadow-xl p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Welcome back!</h3>
                                <p className="text-amber-100">Ready to tackle your day?</p>
                                <p className="text-sm text-amber-200 mt-2">Last login: Today at 9:30 AM</p>
                            </div>
                            <User className="w-16 h-16 text-amber-200" />
                        </div>
                    </div>

                    {/* Quick Stats Cards */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <CheckCircle className="w-8 h-8 text-green-500" />
                            <span className="text-2xl font-bold text-slate-800">12</span>
                        </div>
                        <h4 className="font-semibold text-slate-700">Tasks Completed</h4>
                        <p className="text-sm text-slate-500">This week</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <Clock className="w-8 h-8 text-blue-500" />
                            <span className="text-2xl font-bold text-slate-800">5</span>
                        </div>
                        <h4 className="font-semibold text-slate-700">Pending Tasks</h4>
                        <p className="text-sm text-slate-500">Due soon</p>
                    </div>

                    {/* Recent Activity Card */}
                    <div className="col-span-1 md:col-span-2 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-slate-800">Recent Activity</h4>
                            <Activity className="w-6 h-6 text-slate-500" />
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-slate-600">Completed: Level Capstone Review</span>
                                <span className="text-xs text-slate-400 ml-auto">2h ago</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-sm text-slate-600">Created: Meeting with Thomas</span>
                                <span className="text-xs text-slate-400 ml-auto">4h ago</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                <span className="text-sm text-slate-600">Updated: Codex Class Schedule</span>
                                <span className="text-xs text-slate-400 ml-auto">1d ago</span>
                            </div>
                        </div>
                    </div>

                    {/* Calendar Widget */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-slate-800">Today</h4>
                            <Calendar className="w-6 h-6 text-slate-500" />
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-slate-800">7</div>
                            <div className="text-sm text-slate-500">November 2025</div>
                            <div className="mt-4 text-sm text-slate-600">
                                <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs">
                                    Meeting at 2:00 PM
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notifications Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-slate-800">Notifications</h4>
                            <Bell className="w-6 h-6 text-slate-500" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                <span className="text-sm text-slate-600 flex-1 ml-3">3 new messages</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span className="text-sm text-slate-600 flex-1 ml-3">Task reminder</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-slate-600 flex-1 ml-3">System update</span>
                            </div>
                        </div>
                    </div>

                    {/* Performance Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-slate-800">Performance</h4>
                            <TrendingUp className="w-6 h-6 text-green-500" />
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">92%</div>
                            <div className="text-sm text-slate-500">Task completion rate</div>
                            <div className="mt-3 bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{width: '92%'}}></div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Card */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                        <h4 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <button 
                                onClick={() => window.location.href = '/todo'}
                                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
                            >
                                <CheckCircle className="w-6 h-6 mb-2 mx-auto" />
                                <span className="text-sm font-medium">View Tasks</span>
                            </button>
                            <button 
                                onClick={() => alert('Create new task feature coming soon!')}
                                className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
                            >
                                <Calendar className="w-6 h-6 mb-2 mx-auto" />
                                <span className="text-sm font-medium">New Task</span>
                            </button>
                            <button 
                                onClick={() => alert('Reports feature coming soon!')}
                                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105"
                            >
                                <TrendingUp className="w-6 h-6 mb-2 mx-auto" />
                                <span className="text-sm font-medium">Reports</span>
                            </button>
                            <button 
                                onClick={() => alert('Settings feature coming soon!')}
                                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-4 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all transform hover:scale-105"
                            >
                                <Settings className="w-6 h-6 mb-2 mx-auto" />
                                <span className="text-sm font-medium">Settings</span>
                            </button>
                        </div>
                    </div>

                </div>

                {/* Back to Welcome Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={onBackToWelcome}
                        className="bg-amber-500 text-slate-900 font-bold px-8 py-3 rounded-xl hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md transition-all transform hover:scale-105"
                    >
                        Back to Welcome
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

export default Dashboard;

Feature Access Portal Code

import React, { useState, useEffect, useContext, createContext } from 'react';
import { LucideLogIn, LucideListTodo, LucideLayoutDashboard, LucideStore, LucideCheckCircle, LucideLogOut } from 'lucide-react';

// ====================================================================
// SECTION 1: MOCK OIDC CONTEXT (To prevent TypeError and make the file runnable)
// In a real project, this would be replaced by 'react-oidc-context'
// ====================================================================

const AuthContext = createContext(null);
const AuthProviderMock = ({ children }) => {
    const [state, setState] = useState({
        isLoading: true,
        isAuthenticated: false,
        error: null,
        // Mock user object matching what OIDC provides (using email as profile key)
        user: { email: 'cassandras.user@example.com' }, 
    });

    useEffect(() => {
        // Simulate OIDC initialization check
        const timer = setTimeout(() => {
            // Set isAuthenticated to TRUE by default to show the dashboard view
            setState(s => ({ ...s, isLoading: false, isAuthenticated: true }));
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const signinRedirect = () => {
        setState(s => ({ ...s, isLoading: true, error: null }));
        setTimeout(() => {
            console.log("Mock Sign-in Redirect completed.");
            setState(s => ({ ...s, isLoading: false, isAuthenticated: true, user: { email: 'demo.user@cds.com' } })); 
        }, 500);
    };

    const signoutRedirect = () => {
        setState(s => ({ ...s, isLoading: true, error: null }));
        setTimeout(() => {
            console.log("Mock Sign-out Redirect completed.");
            setState(s => ({ ...s, isLoading: false, isAuthenticated: false, user: null })); 
        }, 500);
    };

    const value = { ...state, signinRedirect, signoutRedirect };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
const useAuth = () => useContext(AuthContext);

// ====================================================================
// SECTION 2: VIEWS (Components for different states/screens)
// ====================================================================

/**
 * 1. Unauthenticated Login View
 */
const UnauthenticatedView = () => {
    const auth = useAuth();
    
    if (auth.isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-gray-100">
                <div className="w-8 h-8 border-4 border-t-4 border-t-amber-500 border-gray-200 rounded-full animate-spin mb-3"></div>
                <p className="text-slate-600 font-medium">Initializing Security Session...</p>
            </div>
        );
    }

    // Unauthenticated State: Show the mock sign-in button
    return (
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-slate-800 text-center mb-6 border-b pb-3">
                <LucideLogIn className="inline w-6 h-6 mr-2 text-amber-500" /> Secure Sign-In
            </h2>
            
            <p className="text-center text-slate-600 mb-8">
                Access to the digital suite requires OIDC authentication.
            </p>

            <button
                onClick={() => auth.signinRedirect()}
                className="w-full bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg mt-4 transition-all duration-200"
            >
                Log In to Dashboard
            </button>
        </div>
    );
};

/**
 * 2. Authenticated Dashboard View (Refactored Welcome component)
 */
const MainDashboardView = ({ user, handleLogout, onGoToView }) => {
    const userName = user?.email?.split('@')[0] || 'User';

    const CardButton = ({ onClick, icon: Icon, color, title, subtitle }) => (
        <button
            onClick={onClick}
            className={`flex flex-col items-start p-5 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.03] text-left border-2 border-transparent 
                        ${color === 'purple' ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-300' : 
                          color === 'blue' ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-300' : 
                          color === 'amber' ? 'bg-amber-500 hover:bg-amber-600 focus:ring-amber-300' : 
                          'bg-gray-600 hover:bg-gray-700 focus:ring-gray-300'} 
                        focus:outline-none focus:ring-4`}
        >
            <Icon className="w-6 h-6 text-white mb-2" />
            <span className="text-xl font-extrabold text-white">{title}</span>
            <span className="text-sm font-medium text-white opacity-80">{subtitle}</span>
        </button>
    );

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 font-inter">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
                .font-inter { font-family: 'Inter', sans-serif; }
                .fade-in { animation: fadeIn 0.8s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
            
            {/* Header */}
            <header className="w-full bg-slate-800 p-4 shadow-2xl fixed top-0 left-0 z-10">
                <div className="flex justify-between items-center max-w-5xl mx-auto">
                    <h1 className="text-xl font-extrabold text-white tracking-wider md:text-2xl">
                        Cassandra's Digital Solutions
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="flex items-center text-sm font-medium text-red-300 hover:text-red-100 transition-colors duration-200"
                    >
                        <LucideLogOut className="w-4 h-4 mr-1"/> Log Out
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center p-4 pt-24 pb-20 fade-in">
                
                {/* Welcome and Status Area */}
                <div className="w-full max-w-4xl text-center mb-10">
                    <h2 className="text-4xl font-extrabold text-slate-800 mb-2">
                        Welcome, <span className="text-amber-600">{userName}</span>!
                    </h2>
                    <p className="text-lg text-slate-500 font-medium mb-6">Your personalized control panel is ready.</p>
                    
                    <div className="inline-flex items-center px-6 py-3 bg-green-100 text-green-800 rounded-full text-md font-bold border border-green-300 shadow-md">
                        <LucideCheckCircle className="w-5 h-5 mr-3 text-green-600 animate-pulse" />
                        Authentication Status: <span className="ml-1 font-extrabold">SECURE & ACTIVE</span>
                    </div>
                </div>

                {/* Application Access Grid */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-4xl border border-gray-200">
                    
                    <h3 className="text-2xl font-bold text-slate-700 mb-6 border-b pb-3">
                        <LucideLayoutDashboard className="inline w-6 h-6 mr-2 text-slate-500" /> Feature Access Portal
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        
                        {/* 1. Meme Marketplace (Main Project) */}
                        <CardButton
                            onClick={() => onGoToView('marketplace')}
                            icon={LucideStore}
                            color="blue"
                            title="Meme Marketplace"
                            subtitle="Your secure asset trading platform."
                        />
                        
                        {/* 2. ToDo App (Secondary Feature) */}
                        <CardButton
                            onClick={() => onGoToView('todo')}
                            icon={LucideListTodo}
                            color="purple"
                            title="To-Do Task Manager"
                            subtitle="Manage your daily objectives efficiently."
                        />

                        {/* 3. Return to Dashboard (Contextual Redundancy Removed) */}
                        <CardButton
                            onClick={() => onGoToView('dashboard')}
                            icon={LucideLayoutDashboard}
                            color="amber"
                            title="Primary Dashboard"
                            subtitle="Go to the main application control panel."
                        />
                        
                        {/* 4. Settings/Profile (Placeholder for future feature) */}
                         <CardButton
                            onClick={() => onGoToView('settings')}
                            icon={LucideLayoutDashboard} // Reusing Dashboard icon here, you can change it later
                            color="gray"
                            title="Account Settings"
                            subtitle="View and manage your user profile."
                        />
                        
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full bg-slate-800 p-4 shadow-xl fixed bottom-0 left-0 z-10">
                <p className="text-gray-400 text-center text-xs font-medium font-sans md:text-sm">
                    &copy; 2025 Cassandra's Digital Solutions. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

/**
 * 3. Placeholder View for ToDo App
 */
const TodoAppView = ({ onGoToView }) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-inter">
        <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md border-4 border-purple-300 text-center fade-in">
            <h2 className="text-3xl font-bold text-purple-700 mb-4">ToDo App</h2>
            <p className="text-slate-600 mb-8">
                This area is reserved for the ToDo application, protected by OIDC.
            </p>
            <button
                onClick={() => onGoToView('dashboard')}
                className="bg-purple-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors duration-200 shadow-md"
            >
                Back to Dashboard
            </button>
        </div>
    </div>
);

/**
 * 4. Placeholder View for Marketplace
 */
const MarketplaceView = ({ onGoToView }) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-inter">
        <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md border-4 border-blue-300 text-center fade-in">
            <h2 className="text-3xl font-bold text-blue-700 mb-4">Meme Marketplace</h2>
            <p className="text-slate-600 mb-8">
                This is the primary capstone application view.
            </p>
            <button
                onClick={() => onGoToView('dashboard')}
                className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-md"
            >
                Back to Dashboard
            </button>
        </div>
    </div>
);

/**
 * 5. Placeholder View for Settings
 */
const SettingsView = ({ onGoToView }) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-inter">
        <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md border-4 border-gray-300 text-center fade-in">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">Account Settings</h2>
            <p className="text-slate-600 mb-8">
                Manage your user profile and security settings here.
            </p>
            <button
                onClick={() => onGoToView('dashboard')}
                className="bg-gray-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors duration-200 shadow-md"
            >
                Back to Dashboard
            </button>
        </div>
    </div>
);

// ====================================================================
// SECTION 3: CORE APPLICATION LOGIC (Handles routing and auth check)
// ====================================================================

const AppContent = () => {
    // This call is now safe because AppContent is rendered inside AuthProviderMock
    const auth = useAuth();
    
    const [view, setView] = useState('dashboard');

    if (auth.isLoading) {
        // Use a centered loading screen during initialization
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-inter">
                <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');`}</style>
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-t-4 border-t-blue-500 border-gray-300 rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-slate-600 font-bold">Loading App...</p>
                </div>
            </div>
        );
    }
    
    // Unauthenticated state: Force user to login screen
    if (!auth.isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-inter">
                 <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');`}</style>
                <UnauthenticatedView />
            </div>
        );
    }
    
    // Authenticated state: Route to the correct view
    const handleLogout = auth.signoutRedirect;

    switch (view) {
        case 'todo':
            return <TodoAppView onGoToView={setView} />;
        case 'marketplace':
            return <MarketplaceView onGoToView={setView} />;
        case 'settings':
            return <SettingsView onGoToView={setView} />;
        case 'dashboard':
        default:
            return (
                <MainDashboardView 
                    user={auth.user} 
                    handleLogout={handleLogout} 
                    onGoToView={setView} 
                />
            );
    }
}


// ====================================================================
// SECTION 4: EXPORT - The required wrapper component
// The App component ensures the Auth Context is provided to everything inside.
// ====================================================================

export default function App() {
    return (
        <AuthProviderMock>
            <AppContent />
        </AuthProviderMock>
    )
}


Old Dashboard: 

import React from 'react';
import { User, Activity, CheckCircle, Clock, Calendar, Bell, TrendingUp, Settings } from 'lucide-react';

const Dashboard = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <header className="w-full bg-slate-800 p-4 shadow-xl fixed top-0 left-0">
                <div className="flex items-center justify-between">
                    {/* Spacer to balance the layout */}
                    <div className="flex space-x-2 opacity-0 pointer-events-none">
                        <button className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg text-xs">Dashboard</button>
                        <button className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg text-xs">Logout</button>
                        <button className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg text-xs">Login</button>
                    </div>
                    
                    <h1 className="text-3xl font-extrabold text-white text-center tracking-wider">
                        Welcome to Cassandra's Digital Solutions
                    </h1>
                    
                    {/* Header Navigation Buttons */}
                    <div className="flex space-x-2">
                        <button
                            onClick={() => window.location.href = '/dashboard'}
                            className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md transition-colors text-xs"
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => {
                                if (window.confirm('Are you sure you want to logout?')) {
                                    window.location.href = '/';
                                }
                            }}
                            className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md transition-colors text-xs"
                        >
                            Logout
                        </button>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md transition-colors text-xs"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </header>

            {/* Logo Section */}
            <div className="mt-20 mb-8 text-center">
                <div className="relative inline-block">
                    <div className="w-28 h-28 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300 border-4 border-white">
                        <span className="text-white font-bold text-3xl tracking-wider">CDS</span>
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-amber-400 opacity-20 animate-ping"></div>
                </div>
            </div>

            {/* Centered Welcome Card */}
            <div className="mb-20 flex justify-center w-full">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl shadow-xl p-12 text-white w-full max-w-2xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-3xl font-bold mb-3">🎉 Welcome to Your Digital World!</h3>
                            <p className="text-amber-100 text-lg mb-2">Great to see you again! We've missed you.</p>
                            <p className="text-amber-100">Your productivity journey continues here - let's make today amazing!</p>
                            <div className="flex items-center gap-2 mt-3">
                                <span className="text-sm text-amber-200">✨ You're all set and ready to go!</span>
                            </div>
                            <p className="text-xs text-amber-200 mt-2">Last login: Today at 9:30 AM</p>
                        </div>
                        <img 
                            src="/images/1.jpg" 
                            alt="User Profile" 
                            className="w-20 h-20 rounded-full object-cover border-3 border-amber-200 shadow-lg"
                        />
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

export default Dashboard;
