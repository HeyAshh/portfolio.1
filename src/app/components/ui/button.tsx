import { ButtonHTMLAttributes, AnchorHTMLAttributes, FC, ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asLink?: boolean;
  href?: string;
  children: ReactNode;
  className?: string;
}

const Button: FC<ButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>> = ({ children, asLink, href, className = '', ...props }) => {
  const baseClasses = "px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded";

  if (asLink && href) {
    return (
      <Link href={href} className={`${baseClasses} ${className}`} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
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
