import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface SidebarButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
  iconSize?: number;
}

const SidebarButton: React.FC<SidebarButtonProp> = ({
  children,
  className,
  icon,
  onClick,
}) => {
  
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex px-5 m-1 py-4 dark:hover:bg-iconBg hover:bg-gray-200  transition-all  rounded-lg',
        className
      )}
    >
      {icon && <span className="text-iconTxt">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default SidebarButton;
