import { format } from 'date-fns';

export const exportToCSV = (expenses) => {
  if (!expenses || expenses.length === 0) return;

  const headers = ['Title', 'Amount', 'Category', 'Date', 'Notes'];
  const csvData = expenses.map(exp => [
    exp.title,
    exp.amount,
    exp.category,
    format(new Date(exp.date), 'yyyy-MM-dd'),
    exp.notes || ''
  ]);

  const csvContent = [
    headers.join(','),
    ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `expenses_${format(new Date(), 'yyyy-MM-dd')}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
