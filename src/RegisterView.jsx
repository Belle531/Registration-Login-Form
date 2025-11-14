import React, { useState } from 'react';
import { Globe, Eye, EyeOff } from 'lucide-react';
import AuthLayout from './assets/AuthLayout.jsx';

// ====================================================================
// LANGUAGE TRANSLATIONS
// ====================================================================
const translations = {
    en: {
        title: "Create Account",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email Address",
        password: "Password",
        confirmPassword: "Confirm Password",
        createAccount: "Create Account",
        selectLanguage: "Language",
        alreadyHaveAccount: "Already have an account?",
        signIn: "Sign In",
        errorFillFields: "Error: Please fill in all fields",
        errorPasswordMismatch: "Passwords do not match",
        errorPasswordTooShort: "Password must be at least 6 characters long",
        errorGeneral: "Registration failed. Please try again.",
        errorNetwork: "Unable to connect to server",
        successMessage: "Registration successful!",
        showPassword: "Show password",
        hidePassword: "Hide password",
        registrationSuccess: "Registration successful! Please check your email for verification."
    },
    es: {
        title: "Crear Cuenta",
        firstName: "Nombre",
        lastName: "Apellido",
        email: "Dirección de Email",
        password: "Contraseña",
        confirmPassword: "Confirmar Contraseña",
        createAccount: "Crear Cuenta",
        selectLanguage: "Idioma",
        alreadyHaveAccount: "¿Ya tienes una cuenta?",
        signIn: "Iniciar Sesión",
        errorFillFields: "Error: Por favor completa todos los campos",
        errorPasswordMismatch: "Las contraseñas no coinciden",
        errorPasswordTooShort: "La contraseña debe tener al menos 6 caracteres",
        errorGeneral: "Error en el registro. Inténtalo de nuevo.",
        errorNetwork: "No se puede conectar al servidor",
        successMessage: "¡Registro exitoso!",
        showPassword: "Mostrar contraseña",
        hidePassword: "Ocultar contraseña",
        registrationSuccess: "¡Registro exitoso! Por favor revisa tu email para la verificación."
    },
    fr: {
        title: "Créer un Compte",
        firstName: "Prénom",
        lastName: "Nom de famille",
        email: "Adresse Email",
        password: "Mot de passe",
        confirmPassword: "Confirmer le mot de passe",
        createAccount: "Créer un Compte",
        selectLanguage: "Langue",
        alreadyHaveAccount: "Vous avez déjà un compte?",
        signIn: "Se connecter",
        errorFillFields: "Erreur: Veuillez remplir tous les champs",
        errorPasswordMismatch: "Les mots de passe ne correspondent pas",
        errorPasswordTooShort: "Le mot de passe doit contenir au moins 6 caractères",
        errorGeneral: "Échec de l'inscription. Veuillez réessayer.",
        errorNetwork: "Impossible de se connecter au serveur",
        successMessage: "Inscription réussie!",
        showPassword: "Afficher le mot de passe",
        hidePassword: "Masquer le mot de passe",
        registrationSuccess: "Inscription réussie! Veuillez vérifier votre email pour la vérification."
    }
};

const RegisterView = ({ onRegisterSuccess, onSwitchToLogin, handleLogout, onGoToDashboard, onGoToLogin }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Get current language translations
    const t = translations[selectedLanguage];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage('');

        // Basic validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
            setMessage(t.errorFillFields);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setMessage(t.errorPasswordMismatch);
            return;
        }

        if (formData.password.length < 6) {
            setMessage(t.errorPasswordTooShort);
            return;
        }

        // CAPSTONE PROJECT: AWS Lambda /register API call
        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,  // add this for server validation
                    selectedLanguage: selectedLanguage  // <- consistent field name
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setMessage(data.message || t.successMessage);
                // Store the JWT token if provided
                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                }
                // Call success handler with user data
                onRegisterSuccess(data.user || { 
                    firstName: formData.firstName, 
                    lastName: formData.lastName, 
                    email: formData.email 
                });
            } else {
                setMessage(data.error || t.errorGeneral);
            }
        } catch (error) {
            console.error('Registration error:', error);
            setMessage(t.errorNetwork || 'Unable to connect to server');
        }
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
                <div className="flex items-center w-full gap-4">
                    {/* Centered Title */}
                    <div className="flex-1 flex justify-center">
                        <h1 className="text-3xl font-extrabold text-white text-center tracking-wider mx-auto">
                            Cassandra's Digital Solutions
                        </h1>
                    </div>
                    {/* Header Navigation Buttons (far right) */}
                    <div className="flex space-x-2 text-xs sm:text-sm">
                        <button onClick={onGoToDashboard} className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 transition-colors">Dashboard</button>
                        <button onClick={handleLogout} className="bg-red-500 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors">Logout</button>
                        <button onClick={onGoToLogin} className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 transition-colors">Login</button>
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
                {/* Registration Form Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-semibold text-slate-800">
                                {t.title}
                            </h2>
                        </div>
                        {message && (
                            <p className={`p-3 rounded-lg text-center font-medium ${message.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                {message}
                            </p>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">{t.firstName}</label>
                                <input 
                                    id="firstName" 
                                    name="firstName"
                                    type="text" 
                                    required 
                                    value={formData.firstName} 
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500"
                                    placeholder={t.firstName}
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">{t.lastName}</label>
                                <input 
                                    id="lastName" 
                                    name="lastName"
                                    type="text" 
                                    required 
                                    value={formData.lastName} 
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500"
                                    placeholder={t.lastName}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">{t.email}</label>
                            <input 
                                id="email" 
                                name="email"
                                type="email" 
                                required 
                                value={formData.email} 
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500"
                                placeholder={t.email}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">{t.password}</label>
                            <div className="relative">
                                <input 
                                    id="password" 
                                    name="password"
                                    type={showPassword ? "text" : "password"} 
                                    required 
                                    value={formData.password} 
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500"
                                    placeholder={t.password}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                    title={showPassword ? t.hidePassword : t.showPassword}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1">{t.confirmPassword}</label>
                            <div className="relative">
                                <input 
                                    id="confirmPassword" 
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"} 
                                    required 
                                    value={formData.confirmPassword} 
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500"
                                    placeholder={t.confirmPassword}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                    title={showConfirmPassword ? t.hidePassword : t.showPassword}
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        {/* Button Row - Create Account and Language Selector */}
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <button type="submit"
                                    className="bg-amber-500 text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md">
                                {t.createAccount}
                            </button>
                            <div className="relative">
                                <Globe className="absolute left-3 top-3.5 w-5 h-5 text-slate-900" />
                                <select
                                    value={selectedLanguage}
                                    onChange={(e) => setSelectedLanguage(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-amber-500 text-slate-900 font-bold border border-amber-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md hover:bg-amber-600 active:bg-amber-700 transition-colors"
                                >
                                    <option value="en">English</option>
                                    <option value="es">Español</option>
                                    <option value="fr">Français</option>
                                </select>
                            </div>
                        </div>
                        <p className="text-center text-sm text-slate-600 pt-4">
                            {t.alreadyHaveAccount}
                            <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}
                               className="font-medium text-amber-600 hover:text-amber-700 ml-1">
                                {t.signIn}
                            </a>
                        </p>
                    </form>
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

export default RegisterView;