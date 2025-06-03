export function CustomYAxisTick({
  x,
  y,
  payload,
  prefix,
  postfix,
}: {
  x?: number;
  y?: number;
  payload?: { value: string };
  prefix?: number;
  postfix?: number;
}) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" className="fill-gray-500">
        {prefix && prefix}
        {payload?.value.toLocaleString()}
        {postfix && postfix}
      </text>
    </g>
  );
}
