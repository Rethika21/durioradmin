import React, { useState } from 'react';

const statusOptions = ['All', 'Present', 'Absent', 'Late', 'Leave'];

const AttendanceTable = ({ data, onEdit, onDelete }) => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [date, setDate] = useState('');

  const filtered = data.filter((row) => {
    const matchesName = row.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === 'All' || row.status === status;
    const matchesDate = !date || row.date === date;
    return matchesName && matchesStatus && matchesDate;
  });

  return (
    <div>
      <div className="attendance-search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          {statusOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr><td colSpan="4" style={{ textAlign: 'center', color: '#888' }}>No records found.</td></tr>
          ) : (
            filtered.map(row => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.date}</td>
                <td className={`status-${row.status.toLowerCase()}`}>{row.status}</td>
                <td>
                  <button onClick={() => onEdit(row)}>Edit</button>
                  <button onClick={() => onDelete(row.id)} style={{ color: '#d32f2f' }}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable; 