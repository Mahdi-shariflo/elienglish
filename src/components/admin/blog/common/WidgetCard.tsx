import cn from '@/lib/classnames';
import { ForwardedRef, forwardRef } from 'react';

const widgetCardClasses = {
  base: 'border border-gray-200 bg-gray-0 p-5 dark:bg-gray-50 lg:p-2',
  rounded: {
    sm: 'rounded-sm',
    DEFAULT: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
  },
};

type WidgetCardTypes = {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  rounded?: keyof typeof widgetCardClasses.rounded;
  headerClassName?: string;
  titleClassName?: string;
  actionClassSName?: string;
  descriptionClassName?: string;
  className?: string;
};

function WidgetCard(
  {
    title,
    action,
    description,
    rounded = 'DEFAULT',
    className,
    headerClassName,
    actionClassSName,
    titleClassName,
    descriptionClassName,
    children,
  }: React.PropsWithChildren<WidgetCardTypes>,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      className={cn(widgetCardClasses.base, widgetCardClasses.rounded[rounded], className)}
      ref={ref}
    >
      <div className={cn(action && 'flex items-start justify-between', headerClassName)}>
        <div>
          <h3 className={cn('font-semibold text-base sm:text-lg', titleClassName)}>{title}</h3>
          {description && <div className={descriptionClassName}>{description}</div>}
        </div>
        {action && <div className={cn('ps-2', actionClassSName)}>{action}</div>}
      </div>
      {children}
    </div>
  );
}

export default forwardRef(WidgetCard);
WidgetCard.displayName = 'WidgetCard';
