import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = false }: CardProps) {
  return (
    <div className={cn(
      "bg-white rounded-lg shadow-md p-6",
      hover && "hover:shadow-lg transition-shadow duration-300 cursor-pointer",
      className
    )}>
      {children}
    </div>
  );
}
