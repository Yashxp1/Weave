import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

interface SidebarButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
  iconSize?: number;
  href?: string;
}

const SidebarButton: React.FC<SidebarButtonProp> = ({
  children,
  className,
  icon,
  onClick,
  href,
}) => {
  const content = (
    <span
      className={clsx(
        'flex px-5 m-1 py-4 dark:hover:bg-iconBg hover:bg-gray-200  transition-all  rounded-lg',
        className
      )}
    >
      {icon && <span className="text-iconTxt">{icon}</span>}
      <span>{children}</span>
    </span>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return (
    <button onClick={onClick} className={className}>
      {content}
    </button>
  );
};

export default SidebarButton;
