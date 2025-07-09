import React from 'react';

const ExportButton = ({ data }) => {
  const handleExport = () => {
    if (!data || data.length === 0) return;
    const header = Object.keys(data[0]);
    const csvRows = [header.join(',')];
    data.forEach(row => {
      csvRows.push(header.map(field => JSON.stringify(row[field] || '')).join(','));
    });
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendance.csv';
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <button onClick={handleExport}>
      Export CSV
    </button>
  );
};

export default ExportButton; 