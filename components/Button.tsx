import React, { useState } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', onClick, ...props }) => {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCoords({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    onClick?.(event);
  };

  React.useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 600); // Match animation duration
    }
  }, [coords]);

  React.useEffect(() => {
    if (!isRippling) {
      setCoords({ x: -1, y: -1 });
    }
  }, [isRippling]);

  return (
    <button
      className={`
        relative overflow-hidden group px-6 py-3 rounded-2xl 
        bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.08)] 
        border border-[var(--glass-border)]
        backdrop-blur-xl 
        text-[var(--text-primary)] font-semibold 
        transition-all duration-300 
        shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_2px_4px_-2px_rgba(0,0,0,0.1),_inset_0_1px_1px_rgba(255,255,255,0.4)]
        dark:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3),_0_2px_4px_-2px_rgba(0,0,0,0.3),_inset_0_1px_1px_rgba(255,255,255,0.1)]
        
        hover:bg-[rgba(255,255,255,0.2)] dark:hover:bg-[rgba(255,255,255,0.15)]
        
        hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),_0_4px_6px_-4px_rgba(0,0,0,0.1),_inset_0_2px_4px_rgba(0,0,0,0.15),_0_0_20px_2px_var(--focus-ring-color)]
        dark:hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.4),_0_4px_6px_-4px_rgba(0,0,0,0.4),_inset_0_2px_4px_rgba(0,0,0,0.4),_0_0_20px_2px_var(--focus-ring-color)]
        
        focus-visible:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),_0_4px_6px_-4px_rgba(0,0,0,0.1),_inset_0_2px_4px_rgba(0,0,0,0.15),_0_0_20px_2px_var(--focus-ring-color)]
        dark:focus-visible:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.4),_0_4px_6px_-4px_rgba(0,0,0,0.4),_inset_0_2px_4px_rgba(0,0,0,0.4),_0_0_20px_2px_var(--focus-ring-color)]

        focus:outline-none 
        
        disabled:bg-white/5 disabled:dark:bg-black/10 disabled:text-[var(--text-secondary)] disabled:shadow-none disabled:cursor-not-allowed
        ${className}
      `}
      onClick={handleOnClick}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 dark:from-white/10"></div>
      <span className="relative z-10">{children}</span>
      {isRippling && (
        <span
          className="absolute block w-1 h-1 bg-[var(--ripple-color)] rounded-full animate-ripple"
          style={{
            left: coords.x,
            top: coords.y,
          }}
        />
      )}
    </button>
  );
};

export default Button;