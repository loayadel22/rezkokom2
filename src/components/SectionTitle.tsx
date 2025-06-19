import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionUrl?: string;
  icon?: React.ReactNode;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle, 
  actionLabel,
  actionUrl,
  icon,
  className = ''
}) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 ${className}`}>
      <div className="flex items-center">
        {icon && <div className="mr-2 p-2 rounded-md bg-red-500 text-white">{icon}</div>}
        <div>
          {subtitle && <p className="text-red-500 font-medium text-sm mb-1">{subtitle}</p>}
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
      </div>
      
      {actionLabel && actionUrl && (
        <a 
          href={actionUrl} 
          className="mt-2 sm:mt-0 inline-flex items-center text-sm text-gray-600 hover:text-red-500 transition-colors"
        >
          {actionLabel}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      )}
    </div>
  );
};

export default SectionTitle;