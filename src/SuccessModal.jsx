import React from 'react';
import { CheckCircle, X } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={onClose}
            ></div>
            
            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 mx-4 max-w-md w-full transform animate-bounce">
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X className="w-5 h-5" />
                </button>
                
                {/* Content */}
                <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        🎉 Success!
                    </h3>
                    
                    <p className="text-gray-600 mb-6">
                        You have successfully logged into Cognito with multi-factor authentication.
                    </p>
                    
                    <button
                        onClick={onClose}
                        className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Continue to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;