import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductPage from './pages/ProductPage';
import ProductsPage from './pages/ProductsPage';
import WishlistPage from './pages/WishlistPage';
import CategoryPage from './pages/CategoryPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import GamingPage from './pages/GamingPage';
import AutomotivePage from './pages/AutomotivePage';
import SportsPage from './pages/SportsPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ActivationPage from './pages/ActivationPage';
import ProfilePage from './pages/ProfilePage';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const path = window.location.pathname;
  const productMatch = path.match(/^\/product\/(\d+)/);
  const categoryMatch = path.match(/^\/category\/(\d+)/);

  const renderPage = () => {
    if (productMatch) {
      return (
        <>
          <Header />
          <main className="flex-grow">
            <ProductPage productId={productMatch[1]} />
          </main>
          <Footer />
        </>
      );
    }

    if (categoryMatch) {
      return (
        <>
          <Header />
          <main className="flex-grow">
            <CategoryPage categoryId={categoryMatch[1]} />
          </main>
          <Footer />
        </>
      );
    }

    switch (path) {
      case '/profile':
        return (
          <>
            <Header />
            <main className="flex-grow">
              <ProfilePage />
            </main>
            <Footer />
          </>
        );
      case '/contact':
        return (
          <>
            <Header />
            <main className="flex-grow">
              <ContactPage />
            </main>
            <Footer />
          </>
        );
      case '/about':
        return (
          <>
            <Header />
            <main className="flex-grow">
              <AboutPage />
            </main>
            <Footer />
          </>
        );
      case '/login':
        return (
          <>
            <Header />
            <main className="flex-grow">
              <LoginPage />
            </main>
            <Footer />
          </>
        );
      case '/signup':
        return (
          <>
            <Header />
            <main className="flex-grow">
              <SignupPage />
            </main>
            <Footer />
          </>
        );
      case '/forgot-password':
        return (
          <>
            <Header />
            <main className="flex-grow">
              <ForgotPasswordPage />
            </main>
            <Footer />
          </>
        );
      case '/activation':
        return (
          <>
            <Header />
            <main className="flex-grow">
              <ActivationPage />
            </main>
            <Footer />
          </>
        );
      case '/cart':
        return (
          <>
            <Header />
            <main className="flex-grow">
              <CartPage />
            </main>
            <Footer />
          </>
        );
      case '/checkout':
        return (
          <>
            <Header />
            <main className="flex-grow">
              <CheckoutPage />
            </main>
            <Footer />
          </>
        );
      case '/wishlist':
        return (
          <>
            <Header />
            <main className="flex-grow">
              <WishlistPage />
            </main>
            <Footer />
          </>
        );
      case '/products':
        return (
          <>
            <Header />
            <main className="flex-grow">
              <ProductsPage />
            </main>
            <Footer />
          </>
        );
      case '/gaming':
        return (
          <>
            <Header />
            <main className="flex-grow">
              <GamingPage />
            </main>
            <Footer />
          </>
        );
      case '/automotive':
        return (
          <>
            <Header />
            <main className="flex-grow">
              <AutomotivePage />
            </main>
            <Footer />
          </>
        );
      case '/sports':
        return (
          <>
            <Header />
            <main className="flex-grow">
              <SportsPage />
            </main>
            <Footer />
          </>
        );
      default:
        return (
          <>
            <Header />
            <main className="flex-grow">
              <HomePage />
            </main>
            <Footer />
          </>
        );
    }
  };

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen">
        {renderPage()}
      </div>
    </ErrorBoundary>
  );
}

export default App;