
import React from 'react';

interface StarIconProps extends React.SVGProps<SVGSVGElement> {
  fillPercentage?: number;
}

const StarIcon: React.FC<StarIconProps> = ({ fillPercentage = 100, ...props }) => {
  const gradientId = `grad-${React.useId()}`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient id={gradientId}>
          <stop offset={`${fillPercentage}%`} stopColor="var(--star-fill-color)" />
          <stop offset={`${fillPercentage}%`} stopColor="var(--star-empty-color)" />
        </linearGradient>
      </defs>
      <path
        d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 4.517 1.48-8.279-6.064-5.828 8.332-1.151z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
};

export default StarIcon;