import React, { useState } from 'react';
import Dashboard from './Dashboard.jsx';
import LoginView from './LoginView.jsx';
import ContactForm from './ContactForm.jsx';
import RegisterView from './RegisterView.jsx';
import ToDoApp from './ToDoApp.jsx';
import WeatherApp from './WeatherApp.jsx';
export default function App() {
    const [view, setView] = useState('dashboard'); // 'dashboard', 'login', 'contactform', 'register', 'todo', 'weather'

    // Navigation handlers
    const handleGoToDashboard = () => setView('dashboard');
    const handleGoToLogin = () => setView('login');
    const handleGoToContactForm = () => setView('contactform');
    const handleGoToRegister = () => setView('register');
    const handleGoToToDo = () => setView('todo');
    const handleGoToWeather = () => setView('weather');

    // After login, go to contact form
    const handleLoginSuccess = () => setView('contactform');
    // After registration, go to dashboard
    const handleRegisterSuccess = () => setView('dashboard');

    if (view === 'login') {
        return <LoginView onLoginSuccess={handleLoginSuccess} onSwitchToRegister={handleGoToRegister} />;
    }
    if (view === 'contactform') {
        return <ContactForm onGoToDashboard={handleGoToDashboard} />;
    }
    if (view === 'register') {
        return <RegisterView onRegisterSuccess={handleRegisterSuccess} onSwitchToLogin={handleGoToLogin} onGoToDashboard={handleGoToDashboard} onGoToLogin={handleGoToLogin} handleLogout={handleGoToLogin} />;
    }
    if (view === 'todo') {
        return <ToDoApp onBackToDashboard={handleGoToDashboard} />;
    }
    if (view === 'weather') {
        return <WeatherApp onBackToDashboard={handleGoToDashboard} />;
    }
    // Default: dashboard
    return (
        <Dashboard
            handleLogout={handleGoToLogin}
            onGoToToDo={handleGoToToDo}
            onGoToDashboard={handleGoToDashboard}
            onGoToWeather={handleGoToWeather}
            onGoToRegister={handleGoToRegister}
            onGoToLogin={handleGoToLogin}
            onGoToContactForm={handleGoToContactForm}
        />
    );
}