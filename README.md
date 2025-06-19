# Rezkokom E-commerce Platform

A modern, full-featured e-commerce platform built with React, TypeScript, and Tailwind CSS. This project provides a complete online shopping experience with user authentication, product management, shopping cart, wishlist, and more.

## 🚀 Features

### 🛍️ **Shopping Experience**
- **Product Catalog**: Browse products by categories (Electronics, Automotive, Sports, Fashion, Home & Garden)
- **Product Search**: Real-time search with autocomplete suggestions
- **Product Details**: Detailed product pages with image galleries, reviews, and specifications
- **Shopping Cart**: Add/remove items, quantity management, and persistent cart storage
- **Wishlist**: Save favorite products for later purchase
- **Flash Sales**: Time-limited offers with countdown timers

### 👤 **User Management**
- **Authentication**: Secure login/signup with email verification
- **User Profiles**: Complete profile management with personal information, addresses, and preferences
- **Order History**: Track past orders and their status
- **Account Security**: Password management and security settings
- **Notification Preferences**: Customizable email and SMS notifications

### 🛒 **E-commerce Features**
- **Checkout Process**: Multi-step checkout with billing details and payment options
- **Payment Methods**: Support for credit/debit cards and cash on delivery
- **Coupon System**: Apply discount codes during checkout
- **Order Management**: Real-time order tracking and status updates
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🎨 **User Interface**
- **Modern Design**: Clean, professional interface with smooth animations
- **Dark/Light Themes**: Adaptive design elements
- **Interactive Components**: Hover effects, transitions, and micro-interactions
- **Accessibility**: WCAG compliant with keyboard navigation support
- **Mobile-First**: Responsive design that works on all screen sizes

## 🛠️ **Technology Stack**

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for utility-first styling
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and building
- **Code Quality**: ESLint for code linting and formatting
- **State Management**: React hooks for local state management
- **Routing**: Client-side routing with URL-based navigation
- **Storage**: LocalStorage for cart, wishlist, and user preferences

## 📦 **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/rezkokom-ecommerce.git
   cd rezkokom-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🏗️ **Build for Production**

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## 📁 **Project Structure**

```
src/
├── components/          # Reusable UI components
│   ├── Banner.tsx      # Hero banner with carousel
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── ProductCard.tsx # Product display component
│   └── ...
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page
│   ├── ProductPage.tsx # Product details
│   ├── CartPage.tsx    # Shopping cart
│   ├── ProfilePage.tsx # User profile
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useCart.tsx     # Cart management
│   └── useWishlist.tsx # Wishlist management
├── data/               # Static data and mock APIs
│   └── products.ts     # Product catalog
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared interfaces
└── App.tsx             # Main application component
```

## 🎯 **Key Components**

### **Product Management**
- **ProductCard**: Displays product information with add to cart/wishlist functionality
- **ProductPage**: Detailed product view with image gallery and purchase options
- **ProductsPage**: Product listing with filtering and sorting capabilities

### **Shopping Features**
- **CartPage**: Shopping cart management with quantity updates and total calculation
- **CheckoutPage**: Multi-step checkout process with form validation
- **WishlistPage**: Saved products with move to cart functionality

### **User Interface**
- **Header**: Navigation with search, cart, wishlist, and user account access
- **Banner**: Rotating promotional banners with call-to-action buttons
- **CategorySidebar**: Product category navigation

### **User Account**
- **LoginPage**: User authentication with form validation
- **SignupPage**: Account registration with password strength validation
- **ProfilePage**: Comprehensive user profile management

## 🔧 **Configuration**

### **Environment Variables**
Create a `.env` file in the root directory for environment-specific settings:

```env
VITE_API_BASE_URL=https://your-api-url.com
VITE_APP_NAME=Rezkokom
```

### **API Integration**
The application is configured to work with a REST API. Update the API endpoints in the relevant components:

- **Authentication**: `src/pages/LoginPage.tsx` and `src/pages/SignupPage.tsx`
- **Orders**: `src/pages/CheckoutPage.tsx`
- **Products**: `src/data/products.ts` (currently using mock data)

## 🚀 **Deployment**

### **Netlify**
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure redirects for client-side routing

### **Vercel**
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with zero configuration

### **GitHub Pages**
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add deploy script to package.json
3. Run: `npm run deploy`

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon set
- **Pexels** for the high-quality stock photos
- **Vite** for the fast build tool

## 📞 **Contact**

- **Email**: rezkokom@gmail.com
- **Phone**: +201023662778
- **Address**: 23 July Street, Cairo, Egypt

## 🔗 **Links**

- [Live Demo](https://your-demo-url.com)
- [API Documentation](https://your-api-docs.com)
- [Design System](https://your-design-system.com)

---

**Built with ❤️ by the Rezkokom Team**