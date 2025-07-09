import React from 'react';

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const AttendanceCalendar = ({ data, onEdit }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = getDaysInMonth(year, month);

  // Group attendance by date
  const attendanceByDate = {};
  data.forEach((record) => {
    if (!attendanceByDate[record.date]) attendanceByDate[record.date] = [];
    attendanceByDate[record.date].push(record);
  });

  const renderDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const records = attendanceByDate[dateStr] || [];
    const status = records.length === 0 ? 'No Data' : records.some(r => r.status === 'Absent') ? 'Absent' : 'Present';
    return (
      <div
        key={day}
        className={`calendar-day ${status.toLowerCase().replace(' ', '-')}`}
        onClick={() => records.length > 0 && onEdit(records[0])}
        style={{ cursor: records.length > 0 ? 'pointer' : 'default' }}
      >
        <div>{day}</div>
        <div style={{ fontSize: '0.8em', color: status === 'Absent' ? 'red' : 'green' }}>{status}</div>
      </div>
    );
  };

  return (
    <div className="attendance-calendar">
      <div className="calendar-header">
        <h4>{today.toLocaleString('default', { month: 'long' })} {year}</h4>
      </div>
      <div className="calendar-grid">
        {[...Array(daysInMonth)].map((_, i) => renderDay(i + 1))}
      </div>
    </div>
  );
};

export default AttendanceCalendar; 