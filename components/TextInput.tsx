import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, id, ...props }) => {
  return (
    <div className="relative group">
      <input
        id={id}
        className="w-full px-4 py-3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl backdrop-blur-lg text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)] transition-all duration-300 peer"
        {...props}
      />
      <label
        htmlFor={id}
        className="absolute left-4 -top-2.5 text-[var(--text-secondary)] text-sm bg-[var(--bg-primary)] px-1 transition-all duration-300
                   peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-[var(--text-secondary)]
                   peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[var(--text-primary)]"
      >
        {label}
      </label>
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-focus-within:border-[var(--focus-ring-color)] group-focus-within:shadow-[0_0_15px_var(--glass-border)] transition-all duration-300 pointer-events-none"></div>
    </div>
  );
};

export default TextInput;