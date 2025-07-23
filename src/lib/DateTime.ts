export function getPrevDateTime(prevDays: number) {
  const prevDate = new Date();
  prevDate.setDate(prevDate.getDate() - prevDays);
  //   const prevDateString = prevDate.toISOString().split('T')[0];
  //   const prevDateString = prevDate.toISOString().split('.')[0] + 'Z';
  const prevDateString = prevDate.toISOString();
  return prevDateString;
}
