import cn from '@/lib/classnames';
import { addSpacesToCamelCase } from '@/lib/fun';

function isValidHexColor(colorCode: string) {
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexColorRegex.test(colorCode);
}

interface PayloadItem {
  dataKey: string;
  fill?: string;
  stroke: string;
  value: string | number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: PayloadItem[];
  label?: string;
  className?: string;
  persianTexts?: Record<string, string>;
}

export function CustomTooltip({
  active,
  payload,
  label,
  className,
  persianTexts,
}: CustomTooltipProps) {
  if (!active) return null;
  return (
    <div
      className={cn(
        'bg-gray-0 overflow-hidden rounded-md border border-gray-300 shadow-2xl dark:bg-gray-100',
        className
      )}
    >
      <p className="label font-iransans mb-0.5 block bg-gray-100 p-2 px-2.5 text-center font-semibold text-xs capitalize text-gray-600 dark:bg-gray-200/60 dark:text-gray-700">
        {label}
      </p>
      <div className="px-3 py-1.5 text-xs">
        {payload?.map((item, index: number) => (
          <div key={item.dataKey + index} className="chart-tooltip-item flex items-center py-1.5">
            <span
              className="me-1.5 h-2 w-2 rounded-full"
              style={{
                backgroundColor: isValidHexColor(item.fill || '') // Use empty string as fallback
                  ? item.fill === '#fff'
                    ? item.stroke
                    : item.fill
                  : item.stroke,
              }}
            />
            <div>
              <span className="capitalize">
                {persianTexts && persianTexts[item.dataKey]}:
                {!persianTexts && addSpacesToCamelCase(item.dataKey)}
              </span>{' '}
              <span className="font-medium text-gray-900 dark:text-gray-700">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
