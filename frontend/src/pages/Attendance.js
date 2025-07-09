import React, { useState } from 'react';
import AttendanceTable from '../components/AttendanceTable';
import AttendanceModal from '../components/AttendanceModal';
import AttendanceCalendar from '../components/AttendanceCalendar';
import ExportButton from '../components/ExportButton';
import "./Attendance.css";

const Attendance = () => {
  const [view, setView] = useState('table');
  const [modalOpen, setModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  // Sample data
  const [attendance, setAttendance] = useState([
    { id: 1, name: 'John Doe', date: '2024-06-01', status: 'Present' },
    { id: 2, name: 'Jane Smith', date: '2024-06-01', status: 'Absent' },
    { id: 3, name: 'Alice Brown', date: '2024-06-02', status: 'Present' },
  ]);

  const handleAdd = (record) => {
    setAttendance([...attendance, { ...record, id: Date.now() }]);
  };
  const handleEdit = (record) => {
    setAttendance(attendance.map((r) => (r.id === record.id ? record : r)));
  };
  const handleDelete = (id) => {
    setAttendance(attendance.filter((r) => r.id !== id));
  };
  const openAddModal = () => {
    setEditRecord(null);
    setModalOpen(true);
  };
  const openEditModal = (record) => {
    setEditRecord(record);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditRecord(null);
  };

  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <h2>Attendance</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={openAddModal}>Add Attendance</button>
          <ExportButton data={attendance} />
          <button onClick={() => setView('table')} disabled={view==='table'}>Table View</button>
          <button onClick={() => setView('calendar')} disabled={view==='calendar'}>Calendar View</button>
        </div>
      </div>
      <div className="attendance-content">
        {view === 'table' ? (
          <AttendanceTable
            data={attendance}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        ) : (
          <AttendanceCalendar
            data={attendance}
            onEdit={openEditModal}
          />
        )}
      </div>
      {modalOpen && (
        <AttendanceModal
          isOpen={modalOpen}
          onClose={closeModal}
          onSubmit={editRecord ? handleEdit : handleAdd}
          initialData={editRecord}
        />
      )}
    </div>
  );
};

export default Attendance; 