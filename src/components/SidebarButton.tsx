import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface SidebarButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
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
      className={clsx('flex  justify-center  text-iconTxt hover:bg-iconBg transition-all items-center rounded-lg', className)} 
    >
      {icon && <span className='text-5xl'>{icon }</span>}
      <span>{children}</span>
    </button>
  );
};

export default SidebarButton;
