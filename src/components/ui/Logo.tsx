import Image from 'next/image';
import { cn } from '@/lib/utils';
import LogoSVG from '@/assets/svg/logo.svg';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export default function Logo({ 
  className, 
  width = 160, 
  height = 40,
  priority = false 
}: LogoProps) {
  return (
    <div className={cn("relative flex items-center", className)}>
      <Image
        src={LogoSVG}
        alt="UziAgency - Agencia Digital"
        width={width}
        height={height}
        priority={priority}
        className="w-auto h-auto"
        style={{ maxWidth: width, maxHeight: height }}
      />
    </div>
  );
}

