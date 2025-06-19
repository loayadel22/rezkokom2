import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Mail, ArrowLeft, RefreshCw } from 'lucide-react';

const ActivationPage: React.FC = () => {
  const [activationStatus, setActivationStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [email, setEmail] = useState('');
  const [isResending, setIsResending] = useState(false);

  // Get token from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const emailParam = urlParams.get('email');

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }

    // Simulate activation process
    const activateAccount = async () => {
      if (!token) {
        setActivationStatus('error');
        return;
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate different outcomes based on token
      if (token === 'expired') {
        setActivationStatus('expired');
      } else if (token === 'invalid') {
        setActivationStatus('error');
      } else {
        setActivationStatus('success');
      }
    };

    activateAccount();
  }, [token, emailParam]);

  const handleResendActivation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsResending(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsResending(false);
    // Show success message or handle response
    alert('Activation email sent! Please check your inbox.');
  };

  const renderContent = () => {
    switch (activationStatus) {
      case 'loading':
        return (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Activating Your Account</h2>
            <p className="text-gray-600">
              Please wait while we verify your account...
            </p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <div className="inline-block p-4 bg-green-100 rounded-full text-green-500 mb-6">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Activated Successfully!</h2>
            <p className="text-gray-600 mb-8">
              Your account has been successfully activated. You can now log in and start shopping.
            </p>
            <div className="space-y-4">
              <a
                href="/login"
                className="block w-full px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Continue to Login
              </a>
              <a
                href="/"
                className="block w-full px-6 py-3 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors"
              >
                Go to Homepage
              </a>
            </div>
          </div>
        );

      case 'expired':
        return (
          <div className="text-center">
            <div className="inline-block p-4 bg-yellow-100 rounded-full text-yellow-500 mb-6">
              <XCircle size={48} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Activation Link Expired</h2>
            <p className="text-gray-600 mb-8">
              Your activation link has expired. Please request a new activation email to complete your account setup.
            </p>
            
            <form onSubmit={handleResendActivation} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <button
                type="submit"
                disabled={isResending}
                className="w-full flex items-center justify-center px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {isResending ? (
                  <>
                    <RefreshCw size={20} className="mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail size={20} className="mr-2" />
                    Resend Activation Email
                  </>
                )}
              </button>
            </form>
          </div>
        );

      case 'error':
      default:
        return (
          <div className="text-center">
            <div className="inline-block p-4 bg-red-100 rounded-full text-red-500 mb-6">
              <XCircle size={48} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Activation Failed</h2>
            <p className="text-gray-600 mb-8">
              We couldn't activate your account. The activation link may be invalid or has already been used.
            </p>
            
            <form onSubmit={handleResendActivation} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <button
                type="submit"
                disabled={isResending}
                className="w-full flex items-center justify-center px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {isResending ? (
                  <>
                    <RefreshCw size={20} className="mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail size={20} className="mr-2" />
                    Resend Activation Email
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">
                Need help? Contact our support team.
              </p>
              <a
                href="/contact"
                className="text-red-500 hover:text-red-600 font-medium"
              >
                Contact Support
              </a>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm">
        {renderContent()}
        
        <div className="text-center pt-6 border-t border-gray-200">
          <a
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-red-500 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Return to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default ActivationPage;