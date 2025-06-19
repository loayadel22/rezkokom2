# Contributing to Rezkokom E-commerce Platform

Thank you for your interest in contributing to Rezkokom! We welcome contributions from the community and are pleased to have you join us.

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager
- Git

### Setting Up Your Development Environment

1. **Fork the repository**
   - Click the "Fork" button on the GitHub repository page
   - Clone your fork locally:
   ```bash
   git clone https://github.com/yourusername/rezkokom-ecommerce.git
   cd rezkokom-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 📋 How to Contribute

### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Environment details** (browser, OS, etc.)

### 💡 Suggesting Features

Feature suggestions are welcome! Please:

- **Check existing feature requests** first
- **Provide a clear description** of the feature
- **Explain the use case** and benefits
- **Consider the scope** and complexity

### 🔧 Code Contributions

#### Code Style Guidelines

We use ESLint and Prettier for code formatting. Please ensure your code follows these guidelines:

- **TypeScript**: Use TypeScript for all new code
- **Components**: Use functional components with hooks
- **Naming**: Use PascalCase for components, camelCase for functions/variables
- **Imports**: Group imports (React, third-party, local)
- **Comments**: Add JSDoc comments for complex functions

#### Component Guidelines

```typescript
// ✅ Good component structure
import React, { useState, useEffect } from 'react';
import { SomeIcon } from 'lucide-react';
import { SomeType } from '../types';

interface ComponentProps {
  title: string;
  onAction?: () => void;
}

const MyComponent: React.FC<ComponentProps> = ({ title, onAction }) => {
  const [state, setState] = useState<string>('');

  useEffect(() => {
    // Effect logic
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      {/* Component content */}
    </div>
  );
};

export default MyComponent;
```

#### CSS/Styling Guidelines

- **Use Tailwind CSS** utility classes
- **Responsive design**: Mobile-first approach
- **Consistent spacing**: Use Tailwind's spacing scale
- **Color scheme**: Follow the existing color palette
- **Accessibility**: Ensure proper contrast and focus states

```tsx
// ✅ Good styling example
<button className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors">
  Click me
</button>
```

### 🧪 Testing

Before submitting your contribution:

1. **Test your changes** thoroughly
2. **Check responsive design** on different screen sizes
3. **Verify accessibility** with keyboard navigation
4. **Test cross-browser compatibility**
5. **Run the linter**: `npm run lint`

### 📝 Commit Guidelines

Use clear, descriptive commit messages:

```bash
# ✅ Good commit messages
git commit -m "feat: add product filtering functionality"
git commit -m "fix: resolve cart total calculation issue"
git commit -m "docs: update API documentation"
git commit -m "style: improve mobile navigation design"

# ❌ Avoid vague messages
git commit -m "fix stuff"
git commit -m "update"
```

#### Commit Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 🔄 Pull Request Process

1. **Update your branch** with the latest main branch:
   ```bash
   git checkout main
   git pull upstream main
   git checkout your-feature-branch
   git rebase main
   ```

2. **Create a pull request** with:
   - **Clear title** describing the change
   - **Detailed description** of what was changed and why
   - **Screenshots** for UI changes
   - **Link to related issues**

3. **Pull request template**:
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Style/UI improvement

   ## Testing
   - [ ] Tested on desktop
   - [ ] Tested on mobile
   - [ ] Cross-browser tested
   - [ ] Accessibility tested

   ## Screenshots
   (If applicable)

   ## Related Issues
   Closes #123
   ```

## 🏗️ Project Structure

Understanding the project structure will help you contribute effectively:

```
src/
├── components/     # Reusable UI components
├── pages/         # Page-level components
├── hooks/         # Custom React hooks
├── data/          # Static data and mock APIs
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

### Adding New Components

1. **Create component file** in appropriate directory
2. **Export from index** if creating a new directory
3. **Add TypeScript interfaces** for props
4. **Include JSDoc comments** for complex logic
5. **Follow naming conventions**

### Adding New Pages

1. **Create page component** in `src/pages/`
2. **Add route** in `src/App.tsx`
3. **Update navigation** if needed
4. **Add to sitemap** considerations

## 🎨 Design Guidelines

### UI/UX Principles
- **Consistency**: Follow existing design patterns
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Optimize for fast loading
- **Mobile-first**: Responsive design approach

### Color Palette
- Primary: Red (#EF4444)
- Secondary: Gray (#6B7280)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)

### Typography
- Headings: Font weights 600-800
- Body text: Font weight 400
- Line height: 1.5 for body, 1.2 for headings

## 🚫 What Not to Contribute

- **Breaking changes** without discussion
- **Large refactors** without prior approval
- **Dependencies** without justification
- **Unrelated features** outside project scope
- **Code without tests** for critical functionality

## 📞 Getting Help

If you need help or have questions:

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For general questions
- **Email**: rezkokom@gmail.com

## 🏆 Recognition

Contributors will be recognized in:
- **README.md** contributors section
- **Release notes** for significant contributions
- **GitHub contributors** page

## 📜 Code of Conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project, you agree to abide by its terms.

### Our Standards

- **Be respectful** and inclusive
- **Provide constructive feedback**
- **Focus on the code**, not the person
- **Help others learn** and grow

Thank you for contributing to Rezkokom! 🎉