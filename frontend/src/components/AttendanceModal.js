import React, { useState, useEffect } from "react";
import "../pages/Attendance.css";

const defaultData = { name: "", date: "", status: "Present", checkIn: "", checkOut: "" };

const AttendanceModal = ({ open, onClose, onSave, initialData }) => {
  const [form, setForm] = useState(defaultData);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(initialData || defaultData);
    setError("");
  }, [initialData, open]);

  if (!open) return null;

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name.trim() || !form.date) {
      setError("Name and Date are required.");
      return;
    }
    setError("");
    onSave(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{initialData && initialData.id ? "Edit Attendance" : "Add Attendance"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input name="name" type="text" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input name="date" type="date" value={form.date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
              <option value="Leave">Leave</option>
            </select>
          </div>
          <div className="form-group">
            <label>Check In</label>
            <input name="checkIn" type="time" value={form.checkIn} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Check Out</label>
            <input name="checkOut" type="time" value={form.checkOut} onChange={handleChange} />
          </div>
          {error && <div style={{ color: "#ef4444", marginBottom: 8 }}>{error}</div>}
          <div className="modal-actions">
            <button type="submit" className="submit-btn">Save</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttendanceModal; 