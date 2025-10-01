import React from 'react';
import { Link } from 'react-router-dom';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface Crumb {
  name: string;
  path?: string;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ crumbs }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 animation-fade-in-up">
      <ol className="flex items-center space-x-2 text-sm flex-wrap">
        {crumbs.map((crumb, index) => (
          <li key={index} className="flex items-center">
            {crumb.path ? (
              <Link to={crumb.path} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200">
                {crumb.name}
              </Link>
            ) : (
              <span className="font-medium text-[var(--text-primary)]">{crumb.name}</span>
            )}
            {index < crumbs.length - 1 && (
              <ChevronRightIcon className="w-4 h-4 text-[var(--text-secondary)] ml-2 flex-shrink-0" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
