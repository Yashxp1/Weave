import clsx from 'clsx';
import { Heart, MessageSquare, Send } from 'lucide-react';
import React, { ReactNode } from 'react';

interface CardProp {
  chidren?: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProp> = ({ chidren, className, onClick }) => {
  return (
    <div
      className={clsx(
        'bg-white top-0 sticky transition-all border-[#D5D5D5] dark:bg-[#181818]  w-[90%] lg:w-[60%] rounded-4xl border dark:border-[#2D2D2D] overflow-y-auto ',
        className
      )}
    >
      {chidren}
    </div>
  );
};

export default Card;
