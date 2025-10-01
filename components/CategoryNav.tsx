import React from 'react';
import { NavLink } from 'react-router-dom';
import { CATEGORIES } from '../constants';

const CategoryNav: React.FC = () => {
  return (
    <div className="w-full bg-[var(--surface-color)]/50 backdrop-blur-lg border-b border-[var(--glass-border)]">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-4 md:space-x-8 h-12 overflow-x-auto custom-scrollbar-horizontal">
          {CATEGORIES.map((category) => (
            <NavLink
              key={category}
              to={`/shop/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
              className={({ isActive }) =>
                `whitespace-nowrap text-sm font-medium transition-colors duration-200 ${
                  isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`
              }
            >
              {category}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CategoryNav;