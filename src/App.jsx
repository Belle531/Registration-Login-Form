import React, { useState } from 'react';
import LoginView from './LoginView.jsx';
import RegisterView from './RegisterView.jsx';
import Welcome from './Welcome.jsx';
import Dashboard from './Dashboard.jsx';
import ToDoApp from './ToDoApp.jsx';

export default function App() {
    const [currentView, setCurrentView] = useState('register'); // 'register', 'login', 'welcome', 'dashboard', 'todo'
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const handleLoginSuccess = (userData = null) => {
        setIsAuthenticated(true);
        
        // Try to get user data from multiple sources
        let userInfo = userData;
        
        // If no userData provided, check sessionStorage for registered user
        if (!userInfo) {
            const storedUser = sessionStorage.getItem('registeredUser');
            if (storedUser) {
                try {
                    userInfo = JSON.parse(storedUser);
                } catch (e) {
                    console.error('Error parsing stored user data:', e);
                }
            }
        }
        
        // Fallback to mock data if no user info available
        if (!userInfo) {
            userInfo = { 
                email: 'user@example.com', 
                uid: 'mock-user-id',
                firstName: 'John',
                lastName: 'Doe'
            };
        }
        
        setUser(userInfo);
        setCurrentView('welcome');
    };

    const handleRegisterSuccess = (userData = null) => {
        if (userData) {
            // Store user data for future login
            sessionStorage.setItem('registeredUser', JSON.stringify(userData));
        }
        setCurrentView('login');
        alert("Registration successful! Please log in with your new account.");
    };

    const handleSwitchToRegister = () => {
        setCurrentView('register');
    };

    const handleSwitchToLogin = () => {
        setCurrentView('login'); // OIDC login only
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setCurrentView('login'); // Back to OIDC login
    };

    const handleGoToToDo = () => {
        setCurrentView('todo');
    };

    const handleGoToDashboard = () => {
        setCurrentView('dashboard');
    };

    const handleGoToWelcome = () => {
        setCurrentView('welcome');
    };

    const handleBackToDashboard = () => {
        setCurrentView('welcome'); // ToDo goes back to Welcome, not Dashboard
    };

    // Show ToDo App
    if (currentView === 'todo') {
        return <ToDoApp onBackToDashboard={handleBackToDashboard} />;
    }

    // Show Dashboard
    if (isAuthenticated && currentView === 'dashboard') {
        return <Dashboard handleLogout={handleLogout} onGoToToDo={handleGoToToDo} onGoToDashboard={handleGoToDashboard} onGoToWelcome={handleGoToWelcome} />;
    }

    // Show Welcome (main dashboard after login)
    if (isAuthenticated && currentView === 'welcome') {
        return <Welcome user={user} handleLogout={handleLogout} onGoToToDo={handleGoToToDo} onGoToDashboard={handleGoToDashboard} onSwitchToLogin={handleSwitchToLogin} />;
    }

    // Show OIDC Login View (only login form)
    if (currentView === 'login') {
        return (
            <LoginView 
                onLoginSuccess={handleLoginSuccess}
                onSwitchToRegister={handleSwitchToRegister}
            />
        );
    }

    // Show Register View (default)
    return (
        <RegisterView 
            onRegisterSuccess={handleRegisterSuccess}
            onSwitchToLogin={handleSwitchToLogin}
        />
    );
}
