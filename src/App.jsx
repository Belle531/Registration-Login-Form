import React, { useState } from 'react';
import Dashboard from './Dashboard.jsx';
import LoginView from './LoginView.jsx';
import ContactForm from './ContactForm.jsx';
import RegisterView from './RegisterView.jsx';
import ToDoApp from './ToDoApp.jsx';
import WeatherApp from './WeatherApp.jsx';
import SpiceRack from './SpiceRack.jsx';
export default function App() {
    const [view, setView] = useState('dashboard'); 

    // Navigation handlers
    const handleGoToDashboard = () => setView('dashboard');
    const handleGoToLogin = () => setView('login');
    const handleGoToContactForm = () => setView('contactform');
    const handleGoToRegister = () => setView('register');
    const handleGoToToDo = () => setView('todo');
    const handleGoToWeather = () => setView('weather');
    const handleGoToSpiceRack = () => setView('spicerack');

    
    const handleLoginSuccess = () => setView('contactform');
   
    const handleRegisterSuccess = () => setView('dashboard');

    if (view === 'login') {
        return (
            <LoginView
                onLoginSuccess={handleLoginSuccess}
                onSwitchToRegister={handleGoToRegister}
                onGoToDashboard={handleGoToDashboard}
                onGoToRegister={handleGoToRegister}
                onGoToLogin={handleGoToLogin}
                onGoToToDo={handleGoToToDo}
                onGoToWeather={handleGoToWeather}
                onGoToContactForm={handleGoToContactForm}
                handleLogout={handleGoToLogin}
            />
        );
    }
    if (view === 'contactform') {
        return <ContactForm onGoToDashboard={handleGoToDashboard} />;
    }
    if (view === 'register') {
        return <RegisterView onRegisterSuccess={handleRegisterSuccess} onSwitchToLogin={handleGoToLogin} onGoToDashboard={handleGoToDashboard} onGoToLogin={handleGoToLogin} handleLogout={handleGoToLogin} />;
    }
    if (view === 'todo') {
        return <ToDoApp 
            onGoToDashboard={handleGoToDashboard}
            handleLogout={handleGoToLogin}
            onGoToRegister={handleGoToRegister}
        />;
    }
    if (view === 'weather') {
        return <WeatherApp onBackToDashboard={handleGoToDashboard} />;
    }
    if (view === 'spicerack') {
        return <SpiceRack 
            onGoToDashboard={() => setView('dashboard')}
            handleLogout={handleGoToLogin}
            onGoToRegister={handleGoToRegister}
        />;
    }
    
    return (
        <Dashboard
            handleLogout={handleGoToLogin}
            onGoToToDo={handleGoToToDo}
            onGoToDashboard={handleGoToDashboard}
            onGoToWeather={handleGoToWeather}
            onGoToRegister={handleGoToRegister}
            onGoToLogin={handleGoToLogin}
            onGoToContactForm={handleGoToContactForm}
            onGoToSpiceRack={handleGoToSpiceRack}
        />
    );
}