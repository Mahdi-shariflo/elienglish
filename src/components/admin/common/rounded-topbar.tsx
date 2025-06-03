import cn from '@/lib/classnames';

// Define the props type for RoundedTopBar component
interface RoundedTopBarProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fillOpacity?: number;
  className?: string;
  cornerRadius?: number;
}

export function RoundedTopBar({
  x,
  y,
  width,
  height,
  fillOpacity,
  className,
  cornerRadius = 6,
}: RoundedTopBarProps) {
  const roundedHeight = Math.max(cornerRadius, height);
  const path = `
    M${x},${y + roundedHeight}
    L${x},${y + cornerRadius}
    Q${x},${y} ${x + cornerRadius},${y}
    L${x + width - cornerRadius},${y}
    Q${x + width},${y} ${x + width},${y + cornerRadius}
    L${x + width},${y + roundedHeight}
    Z
  `;

  return (
    <path
      d={path}
      fillOpacity={fillOpacity}
      className={cn('fill-[#d4dcfa] dark:fill-[#7c88b2]', className)}
    />
  );
}

// Define the props type for RoundedTopBarFill component
interface RoundedTopBarFillProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fillOpacity?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  cornerRadius?: number;
  className?: string;
}

export function RoundedTopBarFill({
  x,
  y,
  width,
  height,
  fillOpacity,
  fill,
  stroke,
  strokeWidth,
  cornerRadius = 6,
  className,
}: RoundedTopBarFillProps) {
  const roundedHeight = Math.max(cornerRadius, height!);
  const path = `
    M${x},${y! + roundedHeight}
    L${x},${y! + cornerRadius}
    Q${x},${y} ${x! + cornerRadius},${y}
    L${x! + width! - cornerRadius},${y}
    Q${x! + width!},${y} ${x! + width!},${y! + cornerRadius}
    L${x! + width!},${y! + roundedHeight}
    Z
  `;

  return (
    <path
      d={path}
      fill={fill}
      fillOpacity={fillOpacity}
      {...(stroke && { stroke })}
      {...(strokeWidth && { strokeWidth })}
      className={cn(className)}
    />
  );
}
