'use client';

import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asLink?: boolean;
  href?: string;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ children, asLink, href, className = '', ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-md px-8 bg-red-600 hover:bg-red-700 text-white";

  if (asLink && href) {
    return (
      <Link href={href} {...props} className={`${baseClasses} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

export { Button };
