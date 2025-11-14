import React, { useState } from 'react';
import LoginView from './LoginView.jsx';
import RegisterView from './RegisterView.jsx';
import ContactForm from './ContactForm.jsx';
import Dashboard from './Dashboard.jsx';
import ToDoApp from './ToDoApp.jsx';
import WeatherApp from './WeatherApp.jsx';

export default function App() {
    const [currentView, setCurrentView] = useState('login'); // 'login', 'dashboard', 'todo', 'weather', 'contactform', 'register'
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
        setCurrentView('dashboard');
    };

    const handleRegisterSuccess = (userData = null) => {
        if (userData) {
            // Store user data for future login
            sessionStorage.setItem('registeredUser', JSON.stringify(userData));
        }
        setCurrentView('dashboard');
        alert("Registration successful! You are now on the dashboard.");
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

    // Show ContactForm when System Analytics is clicked
    const handleGoToContactForm = () => {
        setCurrentView('contactform');
    };

    const handleGoToWeather = () => {
        setCurrentView('weather');
    };

    const handleBackToDashboard = () => {
        setCurrentView('dashboard'); // ToDo goes back to Dashboard
    };

    // Show Weather App
    if (currentView === 'weather') {
        return <WeatherApp onBackToDashboard={handleBackToDashboard} user={user} />;
    }

    // Show ToDo App
    if (currentView === 'todo') {
        return <ToDoApp onBackToDashboard={handleBackToDashboard} />;
    }

    // Show Dashboard
    if (isAuthenticated && currentView === 'dashboard') {
        return <Dashboard handleLogout={handleLogout} onGoToToDo={handleGoToToDo} onGoToDashboard={handleGoToDashboard} onGoToWeather={handleGoToWeather} onGoToRegister={() => setCurrentView('register')} onGoToContactForm={handleGoToContactForm} />;
    }

    // Show ContactForm (from System Analytics)
    if (isAuthenticated && currentView === 'contactform') {
        return <ContactForm />;
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

    // Show RegisterView only when requested from Dashboard
    if (isAuthenticated && currentView === 'register') {
        return (
            <RegisterView 
                onRegisterSuccess={handleRegisterSuccess}
                onSwitchToLogin={handleSwitchToLogin}
                onGoToDashboard={handleGoToDashboard}
                handleLogout={handleLogout}
                onGoToLogin={handleSwitchToLogin}
            />
        );
    }

    // Show OIDC Login View (only login form)
    return (
        <LoginView 
            onLoginSuccess={handleLoginSuccess}
            onSwitchToRegister={handleSwitchToRegister}
        />
    );
}