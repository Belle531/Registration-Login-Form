import React, { useState } from 'react';
import { Globe } from 'lucide-react';
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
        errorPasswordMismatch: "Error: Passwords do not match",
        errorPasswordTooShort: "Error: Password must be at least 6 characters long",
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
        errorPasswordMismatch: "Error: Las contraseñas no coinciden",
        errorPasswordTooShort: "Error: La contraseña debe tener al menos 6 caracteres",
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
        errorPasswordMismatch: "Erreur: Les mots de passe ne correspondent pas",
        errorPasswordTooShort: "Erreur: Le mot de passe doit contenir au moins 6 caractères",
        registrationSuccess: "Inscription réussie! Veuillez vérifier votre email pour la vérification."
    }
};

const RegisterView = ({ onRegisterSuccess, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    // Get current language translations
    const t = translations[selectedLanguage];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRegister = (e) => {
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

        // CAPSTONE PROJECT: Replace this with your AWS Lambda /register API call
        console.log('Attempting to register user:', formData, 'Language:', selectedLanguage);
        setMessage(t.registrationSuccess);

        // Mock success action
        setTimeout(() => {
            // Pass user data to registration success handler
            const userData = {
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
                uid: `user-${Date.now()}` // Mock user ID
            };
            onRegisterSuccess(userData);
        }, 1500);
    };

    return (
        <AuthLayout onSwitchToLogin={onSwitchToLogin}>
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="text-center mb-6">
                        {/* Logo Section - Enhanced */}
                        <div className="mb-4">
                            {/* Logo Container with Animation */}
                            <div className="relative inline-block">
                                <div className="w-40 h-40 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-300 border-2 border-white">
                                    <span className="text-white font-bold text-4xl tracking-wider">CDS</span>
                                </div>
                                {/* Animated Ring */}
                                <div className="absolute inset-0 rounded-full border-2 border-amber-400 opacity-20 animate-ping"></div>
                            </div>
                        </div>
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
                        <input 
                            id="password" 
                            name="password"
                            type="password" 
                            required 
                            value={formData.password} 
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500"
                            placeholder={t.password}
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1">{t.confirmPassword}</label>
                        <input 
                            id="confirmPassword" 
                            name="confirmPassword"
                            type="password" 
                            required 
                            value={formData.confirmPassword} 
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500"
                            placeholder={t.confirmPassword}
                        />
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
        </AuthLayout>
    );
};

export default RegisterView;